coachStatControllers.controller('GameStatsEditCtrl', ['$scope', '$http', '$log', '$routeParams', '$rootScope', '$location',
	function($scope, $http, $log, $routeParams, $rootScope, $location) {
	$scope.clubstats = [];
	$scope.club = new ModelClub({});
	$scope.baseHref = 'clubs/' + $routeParams.clubId + '/fixtures/' + $routeParams.fixtureId ;
	$scope.errors = '';
	
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
						clubname: clubname,
						id: data[i].id
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
                loadGameStats();
            }).error(function (data, status, headers, config) {
                $log.warn(data, status, headers, config);
            });
	}
	
	$scope.cancel = function() {
		$location.path($scope.baseHref);
	};
	
	$scope.save = function() {
		$scope.errors = '';
		var json = JSON.stringify($scope.clubstats);
        $http({
                url: '/gamestats/updategame/' + $routeParams.fixtureId,
                method: "PUT",
                data: { clubs: json },
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*', 
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}
            }).success(function (data, status, headers, config) {
                $location.path($scope.baseHref);
                
            }).error(function (data, status, headers, config) {
                $log.warn(data, status, headers, config);
                $scope.errors = data;
            });
	};
}]);
