coachStatControllers.controller('GameStatsCtrl', ['$scope', '$http', '$log', '$routeParams', '$rootScope', 'HighChartsFactory',
	function($scope, $http, $log, $routeParams, $rootScope, HighChartsFactory) {
	$scope.clubstats = [];
	$scope.club = new ModelClub({});
	$scope.editHref = '#/clubs/' + $routeParams.clubId + '/fixtures/' + $routeParams.fixtureId + '/edit';
	$scope.editFormationHref = '#/clubs/' + $routeParams.clubId + '/fixtures/' + $routeParams.fixtureId + '/formation/edit';
	$scope.editStatsHref = '#/clubs/' + $routeParams.clubId + '/fixtures/' + $routeParams.fixtureId + '/stats/edit';
	$scope.statsHref = '#/clubs/' + $routeParams.clubId + '/fixtures/' + $routeParams.fixtureId + '/stats';
	$scope.gamestatsHref = '#/clubs/' + $routeParams.clubId + '/fixtures/' + $routeParams.fixtureId + '/gamestats';
	var _lineupId = 0;
	$http({ method: 'GET', url: '/clubs/' + $routeParams.clubId, headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			var club = new ModelClub({id: data.id, name: data.name, club_type: data.club_type, location: data.location, image: data.image });
			$scope.club = club;
			loadFixture();
			
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	function createBreadcrumb() {
		$rootScope.path = [{ label: 'Home', url: '#/'},
            		   { label: 'Clubs', url: '#/clubs'},
            		   { label: $scope.club.name, url: '#/clubs/' + $scope.club.id},
            		   { label: 'Fixtures', url: '#/clubs/' + $scope.club.id + '/fixtures',},
            		   { label: $scope.club.fixtures[0].opp.name, url: '#/clubs/' + $scope.club.id + '/fixtures', isActive: 'active' }];
	}
	function loadFixture() {
		$http({ method: 'GET', url: '/clubs/' + $routeParams.clubId + '/fixture/' + $routeParams.fixtureId, headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
				
				var fixture = new ModelFixture({ location: data.location, date: data.date, time: data.time, clubid: data.clubid, oppid: data.oppid, id: data.id });
				
				$scope.club.fixtures.push(fixture);
				loadOppClub(fixture.id, fixture.oppid);
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	}
	
		
	function loadOppClub(id, oppid) {
		$http({ method: 'GET', url: '/clubs/' + oppid, headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
				
			var club = new ModelClub({id: data.id, name: data.name, club_type: data.club_type, location: data.location, image: data.image });
			$log.log($scope.club);
		
			for(var j=0; j<$scope.club.fixtures.length; j++) {
				if($scope.club.fixtures[j].id == id) {
					$scope.club.fixtures[j].opp = club;
				}
			}
			createBreadcrumb();
			loadGameStats();
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	}

	function loadGameStats() {
		$http({ method: 'GET', url: '/gamestats/fixture/' + $routeParams.fixtureId +'/club/' + $routeParams.clubId + '/oppositionclub/' + $scope.club.fixtures[0].opp.id, 
		headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*'}})
		.success(function(data, status, headers, config) {
			if(data.length < 1) {
				createGameStats();
			} else {
				
				for(var i = 0; i < data.length; i++) {
					
					var clubname = '';
					if(data[i].clubid == $routeParams.clubId) {
						clubname = $scope.club.name;
					} else {
						clubname = $scope.club.fixtures[0].opp.name;
					}
					
					
					$scope.clubstats.push(new ModelGameStats({ 
						fixtureid: data[i].fixtureid, 
						clubid: data[i].clubid, 
						clearances: data[i].clearances, 
						corners: data[i].corners, 
						crossmissed: data[i].crossmissed, 
						crosssuccess: data[i].crosssuccess, 
						fouls: data[i].fouls, 
						goals: data[i].goals, 
						offsides: data[i].offsides, 
						passmissed: data[i].passmissed, 
						passsuccess: data[i].passsuccess, 
						possession: data[i].possession, 
						rc: data[i].rc, 
						shotstarget: data[i].shotstarget, 
						shotswide: data[i].shotswide, 
						tackleslost: data[i].tackleslost, 
						tackleswon: data[i].tackleswon, 
						yc: data[i].yc,
						clubname: clubname
					}));	
				}
				
			}
			createChart();
		})
		.error(function(data, status, headers, config) { 
			$log.warn(data, status, headers, config);
		});
	}
	
	function createGameStats() {
		var clubsArr = [];
		clubsArr.push(new ModelGameStats({ 
			fixtureid: $routeParams.fixtureId, 
			clubid: $routeParams.clubId, 
			clearances: 0, corners: 0, crossmissed: 0, crosssuccess: 0, 
			fouls: 0, goals: 0, offsides: 0, passmissed: 0, passsuccess: 0, 
			possession: 0, rc: 0, shotstarget: 0, shotswide: 0, tackleslost: 0, tackleswon: 0, yc: 0}));
			
		clubsArr.push(new ModelGameStats({ 
				fixtureid: $routeParams.fixtureId, 
				clubid: $scope.club.fixtures[0].opp.id, 
				clearances: 0, corners: 0, crossmissed: 0, crosssuccess: 0, 
				fouls: 0, goals: 0, offsides: 0, passmissed: 0, passsuccess: 0, 
				possession: 0, rc: 0, shotstarget: 0, shotswide: 0, tackleslost: 0, tackleswon: 0, yc: 0}));
		
		var json = JSON.stringify(clubsArr);
        $http({
                url: '/gamestats/clubs/',
                method: "POST",
                data: {clubs: json},
                headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json, text/plain, */*', 
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}
            }).success(function (data, status, headers, config) {
                $log.info(data, status, headers, config);
                loadGameStats();
            }).error(function (data, status, headers, config) {
                $log.warn(data, status, headers, config);
            });
	}
	
	function createChart() {
		var chart,
        categories = ['Clearances', 'Corners', 'Cross success', 'Cross missed', 
            'Fouls', 'Goals', 'Offsides', 'Pass success', 'Pass missed',
            'Possession', 'Red cards', 'Yellow cards', 'Shots target', 'Shots wide',
            'Tackles won', 'Tackles lost'];
            
        $('#container').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Game stats'
            },
            subtitle: {
                text: ''
            },
            xAxis: [{
                categories: categories,
                reversed: false
            }, { // mirror axis on right side
                opposite: true,
                reversed: false,
                categories: categories,
                linkedTo: 0
            }],
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function(){
                        return (Math.abs(this.value) / 1);
                    }
                },
                min: -40,
                max: 40
            },
    
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
    
            tooltip: {
                formatter: function(){
                    return '<b>'+ this.series.name +', '+ this.point.category +'</b><br/>'+
                        Highcharts.numberFormat(Math.abs(this.point.y), 0);
                }
            },
    
            series: [{
                name: $scope.clubstats[0].clubname,
                data: [$scope.clubstats[0].clearances * -1, 
	                $scope.clubstats[0].corners * -1, 
	                $scope.clubstats[0].crosssuccess * -1, 
	                $scope.clubstats[0].crossmissed * -1, 
	                $scope.clubstats[0].fouls * -1, 
	                $scope.clubstats[0].goals * -1, 
	                $scope.clubstats[0].offsides * -1,
                    $scope.clubstats[0].passsuccess * -1, 
                    $scope.clubstats[0].passmissed * -1, 
                    $scope.clubstats[0].possession * -1, 
                    $scope.clubstats[0].rc * -1, 
                    $scope.clubstats[0].yc * -1, 
                    $scope.clubstats[0].shotstarget * -1, 
                    $scope.clubstats[0].shotswide * -1,
                    $scope.clubstats[0].tackleswon * -1, 
                    $scope.clubstats[0].tackleslost * -1]
            }, {
                name: $scope.clubstats[1].clubname,
                data: [$scope.clubstats[1].clearances, 
	                $scope.clubstats[1].corners, 
	                $scope.clubstats[1].crosssuccess, 
	                $scope.clubstats[1].crossmissed, 
	                $scope.clubstats[1].fouls, 
	                $scope.clubstats[1].goals, 
	                $scope.clubstats[1].offsides,
                    $scope.clubstats[1].passsuccess, 
                    $scope.clubstats[1].passmissed, 
                    $scope.clubstats[1].possession, 
                    $scope.clubstats[1].rc, 
                    $scope.clubstats[1].yc, 
                    $scope.clubstats[1].shotstarget, 
                    $scope.clubstats[1].shotswide,
                    $scope.clubstats[1].tackleswon, 
                    $scope.clubstats[1].tackleslost]
            }]
        });
	}
	
}]);
