coachStatControllers.controller('PlayerEditCtrl', ['$scope', '$http', '$log', '$routeParams', '$rootScope', '$location',
	function($scope, $http, $log, $routeParams, $rootScope, $location) {
	$scope.player = new ModelPlayer({});
	$scope.baseHref = '/clubs/' + $routeParams.clubId +'/players/' + $routeParams.playerId;
	$http({ method: 'GET', url: $scope.baseHref, headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			var player = new ModelPlayer({id: data.id, firstName: data.firstName, lastName: data.lastName, dob: data.dob, position: data.position, height: data.height, weight: data.weight, image: data.image, clubname: data.clubname});
			$scope.player = player;
			createBreadcrumb();
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
		
	function createBreadcrumb() {
		$rootScope.path = [{ label: 'Home', url: '#/'},
            		   { label: 'Clubs', url: '#/clubs'},
            		   { label: $scope.player.clubname, url: '#/clubs/' + $routeParams.clubId },
            		   { label: 'Players', url: '#/clubs/' + $routeParams.clubId + '/players' },
            		   { label: $scope.player.firstName + ' ' + $scope.player.lastName, url: '#' + $scope.baseHref, isActive: 'active' }];
	}
	$scope.save = function (_player) {
		
		var json = JSON.stringify(_player);
        $http({
                url: '/players/' + _player.id,
                method: "PUT",
                data: json,
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*', 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}
            }).success(function (data, status, headers, config) {
                $log.info(data, status, headers, config);
                $location.path($scope.baseHref);
            }).error(function (data, status, headers, config) {
                $log(data, status, headers, config);
            });
    };
    
    $scope.delPlayer = function() {
    	if(confirm("Are you sure?")) {
    		$http({
                url: '/players/' + $routeParams.playerId,
                method: "DELETE",
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*', 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}
            }).success(function (data, status, headers, config) {
                $log.info(data, status, headers, config);
                $location.path('/clubs/' + $routeParams.clubId);
            }).error(function (data, status, headers, config) {
                $log(data, status, headers, config);
            });
    	}
    };
    
    $scope.cancel = function() {
    	$location.path($scope.baseHref);
    };
}]);