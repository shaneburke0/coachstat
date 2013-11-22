coachStatControllers.controller('ClubsCtrl', ['$scope', '$http', '$log', '$rootScope', 'ClubsFactory', 
	function($scope, $http, $log, $rootScope, ClubsFactory) {
	$rootScope.path = [{ label: 'Home', url: '#/'},
            { label: 'Clubs', url: '#/clubs', isActive: true}];
	$scope.clubs = ClubsFactory.get();	

}]);
