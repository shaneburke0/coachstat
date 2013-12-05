coachStatControllers.controller('ClubCtrl', ['$scope', '$http', '$log', '$routeParams', '$rootScope',
	function($scope, $http, $log, $routeParams, $rootScope) {
	
	$scope.club = new ModelClub({});
	$scope.clubstats = { games: 0, clearances: 0, corners: 0, crossmissed: 0, crosssuccess: 0, fouls: 0, goals: 0, offsides: 0, passmissed: 0, passsuccess: 0, possession: 0, rc: 0, shotstarget: 0, shotswide: 0, tackleslost: 0, tackleswon: 0, yc: 0 };

	var baseHref = '/#/clubs/' + $routeParams.clubId;
	$scope.baseHref = baseHref;
	$scope.detailsHref = baseHref + '/details';
	$scope.playersHref = baseHref + '/players';
	$scope.statsHref = baseHref + '/stats';
	$scope.fixturesHref = baseHref + '/fixtures';
	$http({ method: 'GET', url: '/clubs/' + $routeParams.clubId, headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			var club = new ModelClub({id: data.id, name: data.name, club_type: data.club_type, location: data.location, image: data.image });
			$scope.club = club;
			loadPlayers(club.id);
			loadFixtures();
			createBreadcrumb();
			loadGameStats();
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	function loadPlayers(id) {
		$http({ method: 'GET', url: '/clubs/' +id +'/players', headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			for(var i = 0; i < data.length; i++) {
				var player = new ModelPlayer({id: data[i].id, firstName: data[i].firstName, lastName: data[i].lastName, dob: data[i].dob, position: data[i].position, height: data[i].height, weight: data[i].weight, image: data[i].image});
				
				$scope.club.players.push(player);	
			}
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	}
	function createBreadcrumb() {
		$rootScope.path = [{ label: 'Home', url: '#/'},
            		   { label: 'Clubs', url: '#/clubs'},
            		   { label: $scope.club.name, url: '#/clubs/' + $scope.club.id, isActive: 'active' }];
	}
	function loadFixtures() {
		$http({ method: 'GET', url: '/clubs/' + $routeParams.clubId + '/fixtures', headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
				
			for(var i=0; i<data.length; i++) {
				var fixture = new ModelFixture({ location: data[i].location, date: data[i].date, time: data[i].time, clubid: data[i].clubid, oppid: data[i].oppid, id: data[i].id });
				
				$scope.club.fixtures.push(fixture);
				loadOppClub(fixture.id, fixture.oppid);
				$log.log('called loadOppClub with: ' + fixture.id + ' & ' + fixture.oppid);
			}
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
					$log.log($scope.club.fixtures);
				}
			}
		
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	}
	
	function loadGameStats() {
		$http({ method: 'GET', url: '/gamestats/club/' + $routeParams.clubId, 
		headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			if(data.length < 1) {
				createGameStats();
			} else {
				
				for(var i = 0; i < data.length; i++) {	
					$scope.clubstats.games += 1; 
					$scope.clubstats.clearances += data[i].clearances; 
					$scope.clubstats.corners += data[i].corners;
					$scope.clubstats.crossmissed += data[i].crossmissed;
					$scope.clubstats.crosssuccess += data[i].crosssuccess; 
					$scope.clubstats.fouls += data[i].fouls; 
					$scope.clubstats.goals += data[i].goals;
					$scope.clubstats.offsides += data[i].offsides;
					$scope.clubstats.passmissed += data[i].passmissed;
					$scope.clubstats.passsuccess += data[i].passsuccess; 
					$scope.clubstats.possession += data[i].possession;
					$scope.clubstats.rc += data[i].rc;
					$scope.clubstats.shotstarget += data[i].shotstarget; 
					$scope.clubstats.shotswide += data[i].shotswide; 
					$scope.clubstats.tackleslost += data[i].tackleslost;
					$scope.clubstats.tackleswon += data[i].tackleswon; 
					$scope.clubstats.yc += data[i].yc;
				}
				
				$scope.clubstats.possession = ($scope.clubstats.possession / $scope.clubstats.games).toFixed(2);
			}
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	}
	
}]);
