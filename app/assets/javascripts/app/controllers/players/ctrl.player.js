coachStatControllers.controller('PlayerCtrl', ['$scope', '$http', '$log', '$routeParams', '$rootScope', 
	function($scope, $http, $log, $routeParams, $rootScope) {
	$scope.player = new ModelPlayer({});
	$http({ method: 'GET', url: '/clubs/' + $routeParams.clubId +'/player/' + $routeParams.playerId, headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
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
            		   { label: $scope.player.firstName + ' ' + $scope.player.lastName, url: '#/clubs/' + $routeParams.clubId + '/players/' + $scope.player.id, isActive: 'active' }];
	}
}]);