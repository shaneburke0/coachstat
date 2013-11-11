coachStatControllers.controller('PlayersCtrl', ['$scope', '$http', '$log', '$routeParams', '$rootScope', 
	function($scope, $http, $log, $routeParams, $rootScope) {

	$scope.club = new ModelClub({});
	$http({ method: 'GET', url: '/clubs/' + $routeParams.clubId, headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			var club = new ModelClub({id: data.id, name: data.name, club_type: data.club_type, location: data.location, image: data.image });
			$scope.club = club;
			loadPlayers(club.id);
			createBreadcrumb();
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	function loadPlayers(id) {
		$http({ method: 'GET', url: '/clubs/' +id +'/players', headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			for(var i = 0; i < data.length; i++) {
				var player = new ModelPlayer({id: data[i].id, firstName: data[i].firstName, lastName: data[i].lastName, dob: data[i].dob, position: data[i].position, height: data[i].height, weight: data[i].weight, image: data[i].image});
				$scope.club.players.push(player);
			}
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	}
	function createBreadcrumb() {
		$rootScope.path = [{ label: 'Home', url: '#/'},
            { label: 'Clubs', url: '#/clubs'},
            { label: $scope.club.name, url: '#/clubs/' + $scope.club.id},
            { label: 'Players', url: '#/clubs/' + $scope.club.id + '/players', isActive: true}];
	}
}]);