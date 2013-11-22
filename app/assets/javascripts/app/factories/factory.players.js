coachStatControllers.factory('PlayersFactory',['$http', function($http) {
    return {
        get: function(id) {
        	var players = [];
        	$http({ method: 'GET', url: '/clubs/' +id +'/players', headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
				.success(function(data, status, headers, config) {
					for(var i = 0; i < data.length; i++) {
						var player = new ModelPlayer({id: data[i].id, firstName: data[i].firstName, lastName: data[i].lastName, dob: data[i].dob, position: data[i].position, height: data[i].height, weight: data[i].weight, image: data[i].image});
						
						players.push(player);	
					}
				})
				.error(function(data, status, headers, config) { 
					$log.warn(data, status, headers, config);
				});
			return players;
        },
        getById: function(id, callback) {
        	return;
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