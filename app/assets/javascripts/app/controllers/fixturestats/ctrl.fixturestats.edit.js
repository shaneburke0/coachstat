coachStatControllers.controller('FixtureStatsEditCtrl', ['$scope', '$http', '$log', '$routeParams', '$rootScope', '$location',
	function($scope, $http, $log, $routeParams, $rootScope, $location) {
	$scope.baseHref = "clubs/" + $routeParams.clubId + "/fixtures/" + $routeParams.fixtureId;
	$scope.lineup = new ModelLineup({});
	$scope.errors = '';
	
	var _lineupId = 0;
	
	$http({ method: 'GET', url: '/lineups/fixture/' + $routeParams.fixtureId, headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
	.success(function(data, status, headers, config) {
		var lineup = new ModelLineup({id: data.id, clubid: data.clubid, fixtureid: data.fixtureid });
		$scope.lineup = lineup;
		loadLineupPlayers(lineup.id);
		_lineupId = lineup.id;
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
					loadFixtureStats(id);
				}
			}
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	}
	
	function loadFixtureStats(id) {
		$http({ method: 'GET', url: '/fixturestats/fixture/' + $routeParams.fixtureId +'/player/' + id, headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			$log.warn(data, status, headers, config);
			
			var stats = new ModelFixtureStats({
				id: data.id,
				assists: data.assists, 
				fixtureid: data.fixtureid, 
				goals: data.goals,
				mins: data.mins,
				og: data.og,
				passmissed: data.passmissed,
				passsuccess: data.passsuccess,
				playerid: data.playerid,
				rc: data.rc,
				shotstarget: data.shotstarget,
				shotswide: data.shotswide,
				tackleslost: data.tackleslost,
				tackleswon: data.tackleswon,
				yc: data.yc
			});
			
			for(var i = 0; i<$scope.lineup.players.length; i++) {
				if ($scope.lineup.players[i].playerid == stats.playerid) {
					$scope.lineup.players[i].stats = stats;
				}
			}	
			
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	}
	
	$scope.cancel = function() {
		$location.path($scope.baseHref);
	};
	
	$scope.save = function(players) {
		$scope.errors = '';
		var statsArray = [];
		for(var i = 0; i <players.length; i++) {
			statsArray.push(players[i].stats);
		}
		
		var json = JSON.stringify(statsArray);
        $http({
                url: '/fixturestats/updateallplayers/' + $routeParams.fixtureId,
                method: "PUT",
                data: { players: json },
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*', 
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}
            }).success(function (data, status, headers, config) {
                $log.info(data, status, headers, config);
                $location.path($scope.baseHref);
                
            }).error(function (data, status, headers, config) {
                $log.warn(data, status, headers, config);
                $scope.errors = data;
            });
	};
}]);
