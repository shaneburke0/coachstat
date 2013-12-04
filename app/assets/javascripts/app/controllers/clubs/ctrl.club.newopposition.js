coachStatControllers.controller('ClubNewOppositionCtrl', ['$scope', '$http', '$log', '$routeParams', '$rootScope', '$location',
	function($scope, $http, $log, $routeParams, $rootScope, $location) {
	$scope.club = new ModelClub({});
	$scope.baseHref = '/clubs/';

		$rootScope.path = [{ label: 'Home', url: '#/'},
            		   { label: 'Clubs', url: '#/clubs'},
            		   { label: 'New Opposition Club', url: '#/clubs/add', isActive: 'active' }];
	
	$scope.create = function(_club) {
		_club.isOpposition = true;
		var json = JSON.stringify(_club);
        $http({
                url: '/clubs/',
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