coachStatControllers.controller('FixtureAddCtrl', ['$scope', '$http', '$log', '$routeParams', '$rootScope', '$location',
	function($scope, $http, $log, $routeParams, $rootScope, $location) {
	
	$scope.baseHref = '/#/clubs/' + $routeParams.clubId + '/fixtures/' + $routeParams.fixtureId;
	$scope.clubs = [];
	
	function createBreadcrumb() {
		$rootScope.path = [{ label: 'Home', url: '#/'},
            		   { label: 'Clubs', url: '#/clubs'},
            		   { label: 'club name here', url: '#/clubs/' + $routeParams.clubId},
            		   { label: 'Fixtures', url: '#/clubs/' + $routeParams.clubId + '/fixtures',},
            		   { label: 'Add', url: '#/clubs/' + $routeParams.clubId + '/fixtures/add', isActive: 'active' }];
	}
	

	loadClubs();
		
	function loadClubs() {
		$http({ method: 'GET', url: '/clubs.json', headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			for(var i =0; i < data.length; i++) {
				var club = new ModelClub({id: data[i].id, name: data[i].name, club_type: data[i].club_type, location: data[i].location, image: data[i].image });
				$scope.clubs.push(club);
			}
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	}
	
	$scope.save = function(_fixture) {
		_fixture.clubid = $routeParams.clubId;
		var json = JSON.stringify(_fixture);
        $http({
                url: '/fixtures/',
                method: "POST",
                data: json,
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*', 
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}
            }).success(function (data, status, headers, config) {
                $log.info(data, status, headers, config);
                $location.path($scope.baseHref);
            }).error(function (data, status, headers, config) {
                $log.warn(data, status, headers, config);
            });
	};
	
	$scope.cancel = function() {
		$location.path($scope.baseHref);
	};
}]);
