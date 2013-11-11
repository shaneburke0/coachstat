coachStatControllers.controller('FixturesCtrl', ['$scope', '$http', '$log', '$routeParams', '$rootScope',
	function($scope, $http, $log, $routeParams, $rootScope) {
	
	$scope.club = new ModelClub({});

	$http({ method: 'GET', url: '/clubs/' + $routeParams.clubId, headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			var club = new ModelClub({id: data.id, name: data.name, club_type: data.club_type, location: data.location, image: data.image });
			$scope.club = club;
			createBreadcrumb();
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	function createBreadcrumb() {
		$rootScope.path = [{ label: 'Home', url: '#/'},
            		   { label: 'Clubs', url: '#/clubs'},
            		   { label: $scope.club.name, url: '#/clubs/' + $scope.club.id},
            		   { label: 'Fixtures', url: '#/clubs/' + $scope.club.id + '/fixtures', isActive: 'active' }];
	}
	
	$http({ method: 'GET', url: '/clubs/' + $routeParams.clubId + '/fixtures', headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
				
			for(var i=0; i<data.length; i++) {
				var fixture = new ModelFixture({ location: data[i].location, date: data[i].date, time: data[i].time, clubid: data[i].clubid, oppid: data[i].oppid, id: data[i].id });
				fixture.href = '#/clubs/' + $routeParams.clubId + '/fixtures/' + fixture.id;
				$scope.club.fixtures.push(fixture);
				loadOppClub(fixture.id, fixture.oppid);
				$log.log('called loadOppClub with: ' + fixture.id + ' & ' + fixture.oppid);
			}
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
		
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
}]);
