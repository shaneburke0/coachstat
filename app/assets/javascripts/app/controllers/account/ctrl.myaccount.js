coachStatControllers.controller('MyAccountCtrl', ['$scope', '$http', '$log', '$routeParams', '$rootScope',
	function($scope, $http, $log, $routeParams, $rootScope) {
	$scope.profile = new ModelProfile({});
	$http({ method: 'GET', url: '/myprofile', headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			var profile = new ModelProfile({user_id: data.user_id, firstname: data.firstname, lastname: data.lastname, address: data.address, mobile: data.mobile, avatar_file_name: data.avatar_file_name });
			$scope.profile = profile;
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	$rootScope.path = [{
            label: 'Home', url: '#/' },
            { label: 'My Account', url: '#/myaccount', isActive: 'active' }];
}]);