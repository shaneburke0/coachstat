coachStatControllers.controller('ContactUsCtrl', ['$scope', '$http', '$log', '$routeParams', '$rootScope', '$location',
	function($scope, $http, $log, $routeParams, $rootScope, $location) {
		$scope.errors = '';
		$scope.send = function(_form) {
			$scope.errors = '';
			var json = JSON.stringify(_form);
	        $http({
	                url: '/contactus/',
	                method: "POST",
	                data: json,
	                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*', 
	                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}
	            }).success(function (data, status, headers, config) {
	                $log.info(data, status, headers, config);
	                $location.path('/#/contactus/confirm');
	            }).error(function (data, status, headers, config) {
	                $log.warn(data, status, headers, config);
	                $scope.errors = data;
	            });
		};
	
		$scope.cancel = function() {
			$location.path('/');
		};
	}
]);