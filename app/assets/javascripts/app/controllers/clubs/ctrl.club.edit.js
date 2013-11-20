coachStatControllers.controller('ClubEditCtrl', ['$scope', '$http', '$log', '$routeParams', '$rootScope', '$location',
	function($scope, $http, $log, $routeParams, $rootScope, $location) {
	$scope.club = new ModelClub({});
	$scope.baseHref = '/clubs/' + $routeParams.clubId + '/details';
	$http({ method: 'GET', url: '/clubs/' + $routeParams.clubId, headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			$log.log(data, status, headers, config);
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
            		   { label: 'Details', url: '#/clubs/' + $scope.club.id + '/details' },
            		   { label: 'Edit', url: '#/clubs/' + $scope.club.id + '/edit', isActive: 'active' }];
	}
	
	$scope.save = function(_club) {
		var json = JSON.stringify(_club);
        $http({
                url: '/clubs/' + _club.id,
                method: "PUT",
                data: json,
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*', 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}
            }).success(function (data, status, headers, config) {
                $log.info(data, status, headers, config);
                $location.path($scope.baseHref);
            }).error(function (data, status, headers, config) {
                $log.warn(data, status, headers, config);
            });
	};
	
	$scope.deleteClub = function() {
		if(confirm("Are you sure?")) {
    		$http({
                url: '/clubs/' + $routeParams.clubId,
                method: "DELETE",
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*', 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}
            }).success(function (data, status, headers, config) {
                $log.info(data, status, headers, config);
                $location.path('/clubs/');
            }).error(function (data, status, headers, config) {
                $log.warn(data, status, headers, config);
            });
    	}
	};
	
	$scope.cancel = function() {
		$location.path($scope.baseHref);
	};
	
}]);