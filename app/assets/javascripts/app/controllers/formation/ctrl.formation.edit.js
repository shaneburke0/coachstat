coachStatControllers.controller('FormationEditCtrl', ['$scope', '$http', '$log', '$routeParams', '$rootScope', '$location',
	function($scope, $http, $log, $routeParams, $rootScope, $location) {
	var _lineupid = 0;
	$scope.fixture = new ModelFixture({});
	$scope.baseHref = '/#/clubs/' + $routeParams.clubId + '/fixtures/' + $routeParams.fixtureId;
	$scope.lineup = new ModelLineup({});
	$scope.squad = [];
	$scope.squad.players = [];
	$rootScope.path = [{ label: 'Home', url: '#/'},
        		   { label: 'Clubs', url: '#/clubs'},
        		   { label: 'club name here', url: '#/clubs/' + $routeParams.clubId},
        		   { label: 'Fixtures', url: '#/clubs/' + $routeParams.clubId + '/fixtures',},
        		   { label: 'Formation', url: '#/clubs/' + $routeParams.clubId + '/fixtures/formation',},
        		   { label: 'Edit', url: '#/clubs/' + $routeParams.clubId + '/fixtures/formation/' + $routeParams.fixtureId + '/edit', isActive: 'active' }];

	$scope.cancel = function() {
		$location.path($scope.baseHref);
	};
	
	function loadSquad() {
		$http({ method: 'GET', url: '/clubs/' + $routeParams.clubId +'/players', headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
			.success(function(data, status, headers, config) {
				for(var i = 0; i < data.length; i++) {
					var filtered = $($scope.lineup.players).filter(function(){
				        return this.playerid == data[i].id;
				    });
				    if(filtered.length < 1){
					var player = new ModelPlayer({id: data[i].id, firstName: data[i].firstName, lastName: data[i].lastName, dob: data[i].dob, position: data[i].position, height: data[i].height, weight: data[i].weight, image: data[i].image});
					$scope.squad.push(player);
					}
				}
			})
			.error(function(data, status, headers, config) { 
				$log.warn(data, status, headers, config);
			});
	}
	
	$http({ method: 'GET', url: '/lineups/' + $routeParams.fixtureId, headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
	.success(function(data, status, headers, config) {
		$scope.lineup = new ModelLineup({id: data.id, clubid: data.clubid, fixtureid: data.fixtureid });
		loadLineupPlayers(data.id);
	})
	.error(function(data, status, headers, config) { 
		$log.warn(data, status, headers, config);
	});
	
	function loadLineupPlayers(id) {
		$http({ method: 'GET', url: '/lineupplayers/' + id + '/lineup', headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			for(var i = 0; i < data.length; i++) {
					var lineupPlayer = new ModelLineupPlayer({player: {}, captain: data[i].captain, position: data[i].position, playerid: data[i].playerid, id: data[i].id});
					$scope.lineup.players.push(lineupPlayer);
					loadPlayer(data[i].playerid);
			}
			_lineupid = data[0].lineupid;
			loadSquad();
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	}
	function loadPlayer(id) {
		$http({ method: 'GET', url: '/clubs/' + $routeParams.clubId +'/players/' + id, headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			for(var i=0; i<$scope.lineup.players.length; i++) {
				if(data.id == $scope.lineup.players[i].playerid) {
					$scope.lineup.players[i].prototype = new ModelPlayer({id: data.id, firstName: data.firstName, lastName: data.lastName, dob: data.dob, position: data.position, height: data.height, weight: data.weight, image: data.image, clubname: data.clubname});
				}
			}
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	}
	
	$scope.addPlayer = function(_player) {
		var lineupplayer = new ModelLineupPlayer({player: {}, captain: false, position: '', playerid: _player.id, lineupid: _lineupid});
		var json = JSON.stringify(lineupplayer);
        $http({
                url: '/lineupplayers.json',
                method: "POST",
                data: json,
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*', 
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}
            }).success(function (data, status, headers, config) {
                $log.info(data, status, headers, config);
                // remove player from squad
                var index = $scope.squad.indexOf(_player);
                $scope.squad.splice(index, 1);
                loadLineupPlayer(_player.id);
            }).error(function (data, status, headers, config) {
                $log.warn(data, status, headers, config);
            });
	};
	
	$scope.removePlayer = function(_player) {
		if(confirm("Are you sure?")) {
    		$http({
                url: '/lineupplayers/' + _player.id+".json",
                method: "DELETE",
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*', 
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}
            }).success(function (data, status, headers, config) {
                $log.info(data, status, headers, config);
                // remove player from lineup
                var index = $scope.lineup.players.indexOf(_player);
                $scope.lineup.players.splice(index, 1);
                loadSquadPlayer(_player.playerid);
                
            }).error(function (data, status, headers, config) {
                $log.warn(data, status, headers, config);
            });
    	}
	};
	
	
	function loadSquadPlayer(id) {
		$http({ method: 'GET', url: '/clubs/' + $routeParams.clubId +'/players/' + id + '.json', headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
			.success(function(data, status, headers, config) {
				var player = new ModelPlayer({id: data.id, firstName: data.firstName, lastName: data.lastName, dob: data.dob, position: data.position, height: data.height, weight: data.weight, image: data.image, clubname: data.clubname});
				$scope.squad.push(player);
			})
			.error(function(data, status, headers, config) { 
				$log.warn(data, status, headers, config);
			});
	}
	
	function loadLineupPlayer(id) {
		$http({ method: 'GET', url: '/lineupplayers/' + _lineupid + '/player/' + id + '.json', headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			var lineupPlayer = new ModelLineupPlayer({player: {}, captain: data[0].captain, position: data[0].position, playerid: data[0].playerid, id: data[0].id});
			$scope.lineup.players.push(lineupPlayer);
			loadPlayer(data[0].playerid);
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	}
}]);
