coachStatControllers.controller('HomeCtrl', ['$scope', '$http', '$log', '$rootScope',
	function($scope, $http, $log, $rootScope) {
		$rootScope.path = [{
            label: 'Home',
            url: '#/', isActive: 'active' }];
}]);