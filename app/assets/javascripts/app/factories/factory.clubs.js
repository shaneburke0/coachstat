coachStatControllers.factory('ClubsFactory',['$http', function($http) {
    return {
        get: function() {
        	var clubs = [];
            $http({ method: 'GET', url: '/clubs.json', headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
			.success(function(data, status, headers, config) {
				for(var i =0; i < data.length; i++) {
					var club = new ModelClub({id: data[i].id, name: data[i].name, club_type: data[i].club_type, location: data[i].location, image: data[i].image });
					clubs.push(club);
				}
			})
			.error(function(data, status, headers, config) { 
				$log.warn(data, status, headers, config);
			});
			return clubs;
        },
        getById: function(id) {
        	var club = new ModelClub({});
            $http({ method: 'GET', url: '/clubs/' + id, headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
				.success(function(data, status, headers, config) {
					return new ModelClub({id: data.id, name: data.name, club_type: data.club_type, location: data.location, image: data.image });
					//$scope.club = club;
					//loadPlayers(club.id);
					//loadFixtures();
					//createBreadcrumb();
				})
				.error(function(data, status, headers, config) { 
					$log.warn(data, status, headers, config);
				});
			//return club;
        },
        put: function(_club) {
            return "Hello, World!";
        },
        post: function(_club) {
            return "Hello, World!";
        },
        destroy: function(id) {
            return "Hello, World!";
        },
        
    };
}]);