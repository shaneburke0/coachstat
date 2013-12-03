coachStatControllers.controller('FixtureStatsCtrl', ['$scope', '$http', '$log', '$routeParams', '$rootScope', '$location', 'HighChartsFactory',
	function($scope, $http, $log, $routeParams, $rootScope, $location, HighChartsFactory) {
	$scope.baseHref = "clubs/" + $routeParams.clubId + "/fixtures/" + $routeParams.fixtureId;
	$scope.lineup = new ModelLineup({});
	var chartShotsStats = { players: [], goals: [], shotstarget: [], shotswide: [] };
	var chartTacklesStats = { players: [], tackleswon: [], tackleslost: [], percentage: [] };
	var chartPassesStats = { players: [], passsuccess: [], passmissed: [], percentage: [] };
	
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
					
					if(stats.goals > 0 || stats.shotstarget > 0 || stats.shotswide > 0) {
						chartShotsStats.players.push($scope.lineup.players[i].prototype.lastName);
						chartShotsStats.goals.push(stats.goals);
						chartShotsStats.shotstarget.push(stats.shotstarget);
						chartShotsStats.shotswide.push(stats.shotswide);
					}
					
					if(stats.tackleswon > 0 || stats.tackleswon > 0) {
						chartTacklesStats.players.push($scope.lineup.players[i].prototype.lastName);
						chartTacklesStats.tackleswon.push(stats.tackleswon);
						chartTacklesStats.tackleslost.push(stats.tackleslost);
						chartTacklesStats.percentage.push(((stats.tackleslost + stats.tackleswon) / stats.tackleswon) * 100);
					}
					
					if(stats.passsuccess > 0 || stats.passmissed > 0) {
						chartPassesStats.players.push($scope.lineup.players[i].prototype.lastName);
						chartPassesStats.passsuccess.push(stats.passsuccess);
						chartPassesStats.passmissed.push(stats.passmissed);
						chartPassesStats.percentage.push(((stats.passmissed + stats.passsuccess) / stats.passsuccess) * 100);
					}
				}
			}
			window.setTimeout(createCharts, 4000);
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
		
		
		
	}
	
	function createCharts() {
		createThreeBarhart(
			{
				text: 'Goals / Shots',
				players: chartShotsStats.players,
				series: [['Goals', chartShotsStats.goals],
						['Shots on target', chartShotsStats.shotstarget],
						['Shots off target', chartShotsStats.shotswide]]
			});

	}
	
	function createThreeBarhart(params) {
		Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color) {
		    return {
		        radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
		        stops: [
		            [0, color],
		            [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
		        ]
		    };
		});
		
		$('#container').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: params.text
            },
            subtitle: {
                text: ''
            },
            colors: [
		        '#8cc641',
		        '#f89422',
		        '#DE5E60'
		    ],
            xAxis: {
                categories: params.players,
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' '
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: '#FFFFFF',
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                name: params.series[0][0],
                data: params.series[0][1]
            }, {
                name: params.series[1][0],
                data: params.series[1][1]
            }, {
                name: params.series[2][0],
                data: params.series[2][1]
            }]
        });
	}
}]);
