coachStatControllers.controller('ClubsCtrl', ['$scope', '$http', '$log', '$rootScope', 
	function($scope, $http, $log, $rootScope) {
	$rootScope.path = [{ label: 'Home', url: '#/'},
            { label: 'Clubs', url: '#/clubs', isActive: true}];
	$scope.clubs = [];
	$http({ method: 'GET', url: '/clubs.json', headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			for(var i =0; i < data.length; i++) {
				var club = new ModelClub({id: data[i].id, name: data[i].name, club_type: data[i].club_type, location: data[i].location, image: data[i].image });
				$scope.clubs.push(club);
				loadPlayers(club.id);
			}
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	function loadPlayers(id) {
		$http({ method: 'GET', url: '/clubs/' +id +'/players', headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			for(var i = 0; i < data.length; i++) {
				var player = new ModelPlayer({id: data[i].id, firstName: data[i].firstName, lastName: data[i].lastName, dob: data[i].dob, position: data[i].position, height: data[i].height, weight: data[i].weight, image: data[i].image});
				
				for(var j=0; j<$scope.clubs.length; j++) {
					if($scope.clubs[j].id == id) {
						$scope.clubs[j].players.push(player);
					}
				}	
			}
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	}
}]);
