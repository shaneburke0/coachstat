coachStatControllers.controller('PlayerNewCtrl', ['$scope', '$http', '$log', '$routeParams', '$rootScope', '$location',
	function($scope, $http, $log, $routeParams, $rootScope, $location) {
	$scope.player = new ModelPlayer({});
	$scope.baseHref = '/clubs/' + $routeParams.clubId +'/players/';
		
	function createBreadcrumb() {
		$rootScope.path = [{ label: 'Home', url: '#/'},
            		   { label: 'Clubs', url: '#/clubs'},
            		   { label: $scope.player.clubname, url: '#/clubs/' + $routeParams.clubId },
            		   { label: 'Players', url: '#/clubs/' + $routeParams.clubId + '/players' },
            		   { label: '/New', url: '#' + $scope.baseHref, isActive: 'active' }];
	}
	$scope.save = function (_player) {
		_player.clubid = $routeParams.clubId;
		_player.clubname = '';
		var json = JSON.stringify(_player);
        $http({
                url: '/players/',
                method: "POST",
                data: json,
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*', 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}
            }).success(function (data, status, headers, config) {
                $log.info(data, status, headers, config);
                $location.path($scope.baseHref + data.id);
            }).error(function (data, status, headers, config) {
                $log(data, status, headers, config);
            });
    };
    
    $scope.cancel = function() {
    	$location.path($scope.baseHref);
    };
}]);