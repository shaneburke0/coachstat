coachStatControllers.controller('FixtureCtrl', ['$scope', '$http', '$log', '$routeParams', '$rootScope',
	function($scope, $http, $log, $routeParams, $rootScope) {
	$scope.clubstats = [];
	$scope.club = new ModelClub({});
	$scope.editHref = '#/clubs/' + $routeParams.clubId + '/fixtures/' + $routeParams.fixtureId + '/edit';
	$scope.editFormationHref = '#/clubs/' + $routeParams.clubId + '/fixtures/' + $routeParams.fixtureId + '/formation/edit';
	$scope.editStatsHref = '#/clubs/' + $routeParams.clubId + '/fixtures/' + $routeParams.fixtureId + '/stats/edit';
	$scope.statsHref = '#/clubs/' + $routeParams.clubId + '/fixtures/' + $routeParams.fixtureId + '/stats';
	$scope.gamestatsHref = '#/clubs/' + $routeParams.clubId + '/fixtures/' + $routeParams.fixtureId + '/gamestats';
	var _lineupId = 0;
	$http({ method: 'GET', url: '/clubs/' + $routeParams.clubId, headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			var club = new ModelClub({id: data.id, name: data.name, club_type: data.club_type, location: data.location, image: data.image });
			$scope.club = club;
			loadFixture();
			
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	function createBreadcrumb() {
		$rootScope.path = [{ label: 'Home', url: '#/'},
            		   { label: 'Clubs', url: '#/clubs'},
            		   { label: $scope.club.name, url: '#/clubs/' + $scope.club.id},
            		   { label: 'Fixtures', url: '#/clubs/' + $scope.club.id + '/fixtures',},
            		   { label: $scope.club.fixtures[0].opp.name, url: '#/clubs/' + $scope.club.id + '/fixtures', isActive: 'active' }];
	}
	function loadFixture() {
		$http({ method: 'GET', url: '/clubs/' + $routeParams.clubId + '/fixture/' + $routeParams.fixtureId, headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
				
				var fixture = new ModelFixture({ location: data.location, date: data.date, time: data.time, clubid: data.clubid, oppid: data.oppid, id: data.id });
				
				$scope.club.fixtures.push(fixture);
				loadOppClub(fixture.id, fixture.oppid);
				
				loadLineup(fixture.id);
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	}
	
		
	function loadOppClub(id, oppid) {
		$http({ method: 'GET', url: '/clubs/' + oppid, headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
				
			var club = new ModelClub({id: data.id, name: data.name, club_type: data.club_type, location: data.location, image: data.image });
			$log.log($scope.club);
		
			for(var j=0; j<$scope.club.fixtures.length; j++) {
				if($scope.club.fixtures[j].id == id) {
					$scope.club.fixtures[j].opp = club;
				}
			}
			createBreadcrumb();
			loadGameStats();
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	}
	
	function loadLineup(id) {
		$http({ method: 'GET', url: '/lineups/fixture/' + id, headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			var lineup = new ModelLineup({id: data.id, clubid: data.clubid, fixtureid: data.fixtureid });
			$scope.club.fixtures[0].lineup = lineup;
			loadLineupPlayers(lineup.id);
			_lineupId = lineup.id;
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	}
	
	function loadLineupPlayers(id) {
		$http({ method: 'GET', url: '/lineupplayers/' + id + '/lineup', headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			for(var i = 0; i < data.length; i++) {
				var lineupPlayer = new ModelLineupPlayer({player: {}, captain: data[i].captain, position: data[i].position, playerid: data[i].playerid, id: data[i].id});
				$scope.club.fixtures[0].lineup.players.push(lineupPlayer);
				loadPlayer(data[i].playerid);
			}
			window.setTimeout(initDragFormation, 4000);
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	}
	function loadPlayer(id) {
		$http({ method: 'GET', url: '/clubs/' + $routeParams.clubId +'/players/' + id, headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			for(var i=0; i<$scope.club.fixtures[0].lineup.players.length; i++) {
				if(data.id == $scope.club.fixtures[0].lineup.players[i].playerid) {
					$scope.club.fixtures[0].lineup.players[i].prototype = new ModelPlayer({id: data.id, firstName: data.firstName, lastName: data.lastName, dob: data.dob, position: data.position, height: data.height, weight: data.weight, image: data.image, clubname: data.clubname});
					loadFixtureStats(id);
				}
			}
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	}
	function initDragFormation() {
		$(".draggable-player").draggable({ revert: "invalid", containment: ".formation"});
		$("#drop-pitch").droppable({
			accept: ".draggable-player",
			activeClass: "ui-state-hover",
			hoverClass: "ui-state-active",
			drop: function(event, ui) {
			}
		});
	}
	
	$scope.saveFormation = function() {
		var leanArray = [];
		for(var i=0; i<$scope.club.fixtures[0].lineup.players.length; i++) {
			var playerElm =  $("#" + $scope.club.fixtures[0].lineup.players[i].prototype.id);
			var left = "left:" + $(playerElm).css("left") + ";";
			var top = "top:" + $(playerElm).css("top") + ";";
			var position = "position: relavtive;";
			
			
			var leanPlayer = new ModelLeanLineupPlayer({
				id: $scope.club.fixtures[0].lineup.players[i].id,
				playerid: $scope.club.fixtures[0].lineup.players[i].playerid,
				captain: $scope.club.fixtures[0].lineup.players[i].captain,
				position: position + " " + left + " " + top,
				lineupid: $scope.club.fixtures[0].lineup.players[i].lineupid,
				positionid: $scope.club.fixtures[0].lineup.players[i].positionid
			});	
			
			leanArray.push(leanPlayer);
		}
		var json = JSON.stringify(leanArray);
        $http({
                url: '/lineupplayers/'+ _lineupId + '/updateFormation',
                method: "PUT",
                data: {formation: json},
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*', 
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}
            }).success(function (data, status, headers, config) {
                $log.info(data, status, headers, config);
                
            }).error(function (data, status, headers, config) {
                $log.warn(data, status, headers, config);
            });
	};
	
	function loadFixtureStats(id) {
		$http({ method: 'GET', url: '/fixturestats/fixture/' + $routeParams.fixtureId +'/player/' + id, headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			
			var stats = new ModelFixtureStats({
				assists: data.assists, 
				fixtureid: data.fixtureid, 
				goals: data.goals,
				mins: data.mins,
				og: data.og,
				passmissed: data.passmissed,
				passsuccess: data.passsuccess,
				playerid: data.playerid,
				rc: data.rc,
				shotstarget: data.shotstarget,
				shotswide: data.shotswide,
				tackleslost: data.tackleslost,
				tackleswon: data.tackleswon,
				yc: data.yc
			});
			
			for(var i = 0; i<$scope.club.fixtures[0].lineup.players.length; i++) {
				if ($scope.club.fixtures[0].lineup.players[i].playerid == stats.playerid) {
					$scope.club.fixtures[0].lineup.players[i].stats = stats;
				}
			}	
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	}
	
	function loadGameStats() {
		$http({ method: 'GET', url: '/gamestats/fixture/' + $routeParams.fixtureId +'/club/' + $routeParams.clubId + '/oppositionclub/' + $scope.club.fixtures[0].opp.id, 
		headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			if(data.length < 1) {
				createGameStats();
			} else {
				
				for(var i = 0; i < data.length; i++) {
					
					var clubname = '';
					if(data[i].clubid == $routeParams.clubId) {
						clubname = $scope.club.name;
					} else {
						clubname = $scope.club.fixtures[0].opp.name;
					}
					
					
					$scope.clubstats.push(new ModelGameStats({ 
						fixtureid: data[i].fixtureid, 
						clubid: data[i].clubid, 
						clearances: data[i].clearances, 
						corners: data[i].corners, 
						crossmissed: data[i].crossmissed, 
						crosssuccess: data[i].crosssuccess, 
						fouls: data[i].fouls, 
						goals: data[i].goals, 
						offsides: data[i].offsides, 
						passmissed: data[i].passmissed, 
						passsuccess: data[i].passsuccess, 
						possession: data[i].possession, 
						rc: data[i].rc, 
						shotstarget: data[i].shotstarget, 
						shotswide: data[i].shotswide, 
						tackleslost: data[i].tackleslost, 
						tackleswon: data[i].tackleswon, 
						yc: data[i].yc,
						clubname: clubname
					}));	
				}
				
			}
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	}
	
	function createGameStats() {
		var clubsArr = [];
		clubsArr.push(new ModelGameStats({ 
			fixtureid: $routeParams.fixtureId, 
			clubid: $routeParams.clubId, 
			clearances: 0, corners: 0, crossmissed: 0, crosssuccess: 0, 
			fouls: 0, goals: 0, offsides: 0, passmissed: 0, passsuccess: 0, 
			possession: 0, rc: 0, shotstarget: 0, shotswide: 0, tackleslost: 0, tackleswon: 0, yc: 0}));
			
		clubsArr.push(new ModelGameStats({ 
				fixtureid: $routeParams.fixtureId, 
				clubid: $scope.club.fixtures[0].opp.id, 
				clearances: 0, corners: 0, crossmissed: 0, crosssuccess: 0, 
				fouls: 0, goals: 0, offsides: 0, passmissed: 0, passsuccess: 0, 
				possession: 0, rc: 0, shotstarget: 0, shotswide: 0, tackleslost: 0, tackleswon: 0, yc: 0}));
		
		var json = JSON.stringify(clubsArr);
        $http({
                url: '/gamestats/clubs/',
                method: "POST",
                data: {clubs: json},
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*', 
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}
            }).success(function (data, status, headers, config) {
                $log.info(data, status, headers, config);
                loadGameStats();
            }).error(function (data, status, headers, config) {
                $log.warn(data, status, headers, config);
            });
	}
	
}]);
