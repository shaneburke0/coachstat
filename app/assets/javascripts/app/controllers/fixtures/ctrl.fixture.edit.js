coachStatControllers.controller('FixtureEditCtrl', ['$scope', '$http', '$log', '$routeParams', '$rootScope', '$location',
	function($scope, $http, $log, $routeParams, $rootScope, $location) {
	
	$scope.fixture = new ModelFixture({});
	$scope.baseHref = '/#/clubs/' + $routeParams.clubId + '/fixtures/' + $routeParams.fixtureId;
	$scope.clubs = [];
	$scope.errors = '';
	
	function createBreadcrumb() {
		$rootScope.path = [{ label: 'Home', url: '#/'},
            		   { label: 'Clubs', url: '#/clubs'},
            		   { label: 'club name here', url: '#/clubs/' + $routeParams.clubId},
            		   { label: 'Fixtures', url: '#/clubs/' + $routeParams.clubId + '/fixtures',},
            		   { label: 'Edit', url: '#/clubs/' + $routeParams.clubId + '/fixtures/' + $routeParams.fixtureId + '/edit', isActive: 'active' }];
	}
	
	$http({ method: 'GET', url: '/clubs/' + $routeParams.clubId + '/fixture/' + $routeParams.fixtureId, 
		headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
				
				var fixture = new ModelFixture({ location: data.location, date: data.datestr, time: data.timestr, clubid: data.clubid, oppid: data.oppid, id: data.id });
				
				$scope.fixture = fixture;
				loadClubs();
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
		
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
		$scope.errors = '';
		var json = JSON.stringify(_fixture);
        $http({
                url: '/fixtures/' + _fixture.id,
                method: "PUT",
                data: json,
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*', 
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}
            }).success(function (data, status, headers, config) {
                $log.info(data, status, headers, config);
                $location.path($scope.baseHref);
            }).error(function (data, status, headers, config) {
                $log.warn(data, status, headers, config);
                $scope.errors = data;
            });
	};
	
	$scope.deleteFixture = function() {
		if(confirm("Are you sure?")) {
    		$http({
                url: '/fixtures/' + $routeParams.fixtureId,
                method: "DELETE",
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*', 
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}
            }).success(function (data, status, headers, config) {
                $log.info(data, status, headers, config);
                $location.path('#/clubs/' + $routeParams.clubId + '/fixtures');
            }).error(function (data, status, headers, config) {
                $log.warn(data, status, headers, config);
            });
    	}
	};
	
	$scope.cancel = function() {
		$location.path($scope.baseHref);
	};
}]);
