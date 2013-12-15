coachStatControllers.controller('MyAccountEditCtrl', ['$scope', '$http', '$log', '$routeParams', '$rootScope','$location',
	function($scope, $http, $log, $routeParams, $rootScope, $location) {
	var baseHref = "/myaccount";
	$scope.profile = new ModelProfile({});
	$http({ method: 'GET', url: '/myprofile', headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			var profile = new ModelProfile({user_id: data.user_id, firstname: data.firstname, lastname: data.lastname, address: data.address, mobile: data.mobile, id: data.id, avatar_file_name: data.avatar_file_name });
			$scope.profile = profile;
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	$rootScope.path = [{
            label: 'Home', url: '#/' },
            { label: 'My Account', url: '#/myaccount', isActive: 'active' }];

	$scope.save = function(_profile) {
		$scope.errortext = '';
		
		var json = JSON.stringify(_profile);
        $http({
                url: '/profiles/' + $scope.profile.id,
                method: "PUT",
                data: json,
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*', 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}
            }).success(function (data, status, headers, config) {
                $log.info(data, status, headers, config);
                $location.path(baseHref);
            }).error(function (data, status, headers, config) {
                $log.warn(data, status, headers, config);
                $scope.errortext = data;
            });
	};
	
	$scope.cancel = function() {
		$location.path(baseHref);
	};
}]);