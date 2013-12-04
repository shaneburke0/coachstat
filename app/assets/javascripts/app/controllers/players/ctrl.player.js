coachStatControllers.controller('PlayerCtrl', ['$scope', '$http', '$log', '$routeParams', '$rootScope', 'HighChartsFactory',
	function($scope, $http, $log, $routeParams, $rootScope, HighChartsFactory) {
	$scope.player = new ModelPlayer({});
	$scope.stats = [];
	var chartShotsAssitsStats = { games: [], goals: [], assists: [], shotstarget: [] };
	
	$scope.baseHref = '/clubs/' + $routeParams.clubId +'/players/' + $routeParams.playerId;
	$http({ method: 'GET', url: $scope.baseHref, headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			var player = new ModelPlayer({id: data.id, firstName: data.firstName, lastName: data.lastName, dob: data.dob, position: data.position, height: data.height, weight: data.weight, image: data.image, clubname: data.clubname});
			$scope.player = player;
			createBreadcrumb();
			loadStats();
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
		
	function createBreadcrumb() {
		$rootScope.path = [{ label: 'Home', url: '#/'},
            		   { label: 'Clubs', url: '#/clubs'},
            		   { label: $scope.player.clubname, url: '#/clubs/' + $routeParams.clubId },
            		   { label: 'Players', url: '#/clubs/' + $routeParams.clubId + '/players' },
            		   { label: $scope.player.firstName + ' ' + $scope.player.lastName, url: '#/clubs/' + $routeParams.clubId + '/players/' + $scope.player.id, isActive: 'active' }];
	}
	
	function loadFixture(id) {
		$http({ method: 'GET', url: '/clubs/' + $routeParams.clubId + '/fixture/' + id, headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
				
			var fixture = new ModelFixture({ location: data.location, date: data.date, time: data.time, clubid: data.clubid, oppid: data.oppid, id: data.id });
			
			for(var i=0; i<$scope.stats.length; i++) {
				if($scope.stats[i].fixtureid == fixture.id) {
					$scope.stats[i].fixture = fixture;
					loadOppClub(fixture.oppid, id);
				}
			}
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	}
	
	function loadOppClub(id, fixtureid) {
		$http({ method: 'GET', url: '/clubs/' + id, headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			var club = new ModelClub({id: data.id, name: data.name, club_type: data.club_type, location: data.location, image: data.image });
			
			for(var i=0; i<$scope.stats.length; i++) {
				if($scope.stats[i].fixtureid == fixtureid) {
					$scope.stats[i].fixture.club = club;
				}
			}
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	}
	
	function loadStats() {
	$http({ method: 'GET', url: '/fixturestats/player/' + $routeParams.playerId, headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			$log.log(data, status, headers, config);
			
			for(var i=0; i<data.length; i++) {
				var stats = new ModelFixtureStats({
					id: data[i].id,
					assists: data[i].assists, 
					fixtureid: data[i].fixtureid, 
					goals: data[i].goals,
					mins: data[i].mins,
					og: data[i].og,
					passmissed: data[i].passmissed,
					passsuccess: data[i].passsuccess,
					playerid: data[i].playerid,
					rc: data[i].rc,
					shotstarget: data[i].shotstarget,
					shotswide: data[i].shotswide,
					tackleslost: data[i].tackleslost,
					tackleswon: data[i].tackleswon,
					yc: data[i].yc
				});
				$scope.stats.push(stats);
				loadFixture(stats.fixtureid);
			}
			
			window.setTimeout(function() {
				for(var i = 0; i<$scope.stats.length; i++) {

					chartShotsAssitsStats.games.push($scope.stats[i].fixture.club.name + ' ' + $scope.stats[i].fixture.datestr);
					chartShotsAssitsStats.goals.push($scope.stats[i].goals);
					chartShotsAssitsStats.assists.push($scope.stats[i].assists);
					chartShotsAssitsStats.shotstarget.push($scope.stats[i].shotstarget);
				}
			}, 1500);
			

			window.setTimeout(createCharts, 500);
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
		
	}
	
	function createCharts() {
		window.setTimeout(function() {
			createThreeBarhart('#areaspline',
			{
				text: 'Goals / Assists / Shot on target - last 10 games',
				games: chartShotsAssitsStats.games,
				goals: chartShotsAssitsStats.goals,
				assists: chartShotsAssitsStats.assists,
				shotstarget: chartShotsAssitsStats.shotstarget
			});
		}, 1000);
			
	}
	
	function createThreeBarhart(elem, params) {		
		$(elem).highcharts({
            chart: {
                type: 'areaspline'
            },
            title: {
                text: params.text
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 150,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: '#FFFFFF'
            },
            xAxis: {
                categories: params.games,
                plotBands: [{ // visualize the weekend
                    from: 4.5,
                    to: 6.5,
                    color: 'rgba(68, 170, 213, .2)'
                }]
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            tooltip: {
                shared: true,
                valueSuffix: ''
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.5
                }
            },
            series: [{
            	name: 'Shots on target',
            	data: params.shotstarget
            }, {
                name: 'Goals',
                data: params.goals
            }, {
                name: 'Assists',
                data: params.assists
            }]
        });
	}
}]);