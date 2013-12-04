coachStatControllers.controller('ClubsCtrl', ['$scope', '$http', '$log', '$rootScope',
	function($scope, $http, $log, $rootScope) {
	$rootScope.path = [{ label: 'Home', url: '#/'},
            { label: 'Clubs', url: '#/clubs', isActive: true}];
	$scope.clubs = [];
	$scope.oppclubs = [];
		
	$http({ method: 'GET', url: '/clubs.json', headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			for(var i =0; i < data.length; i++) {
				var club = new ModelClub({id: data[i].id, name: data[i].name, club_type: data[i].club_type, location: data[i].location, image: data[i].image, isOpposition: data[i].isOpposition });
				if(club.isOpposition == true) {
			 		$scope.oppclubs.push(data[i]);
			 	} else {
			 		$scope.clubs.push(data[i]);
			 	}
			}
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	
}]);
