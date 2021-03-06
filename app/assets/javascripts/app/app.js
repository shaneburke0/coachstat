var coachStat = angular.module('coachStat', ['ngRoute', 'coachStatControllers']);
var coachStatControllers = angular.module('coachStatControllers', []);

coachStat.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/assets/app/views/home.html',
        controller: 'HomeCtrl'
      }).
      when('/clubs', {
        templateUrl: '/assets/app/views/club/clubs.html',
        controller: 'ClubsCtrl'
      }).
      when('/clubs/addopposition', {
        templateUrl: '/assets/app/views/club/addopposition.html',
        controller: 'ClubNewOppositionCtrl'
      }).
      when('/clubs/add', {
        templateUrl: '/assets/app/views/club/add.html',
        controller: 'ClubNewCtrl'
      }).
      when('/clubs/:clubId', {
        templateUrl: '/assets/app/views/club/club.html',
        controller: 'ClubCtrl'
      }).
      when('/clubs/:clubId/details', {
        templateUrl: '/assets/app/views/club/details.html',
        controller: 'ClubDetailsCtrl'
      }).
      when('/clubs/:clubId/edit', {
        templateUrl: '/assets/app/views/club/edit.html',
        controller: 'ClubEditCtrl'
      }).
      when('/clubs/:clubId/players', {
        templateUrl: '/assets/app/views/players/players.html',
        controller: 'PlayersCtrl'
      }).
      when('/clubs/:clubId/players/add', {
        templateUrl: '/assets/app/views/players/add.html',
        controller: 'PlayerNewCtrl'
      }).
      when('/clubs/:clubId/players/:playerId', {
        templateUrl: '/assets/app/views/players/player.html',
        controller: 'PlayerCtrl'
      }).
      when('/clubs/:clubId/players/:playerId/edit', {
        templateUrl: '/assets/app/views/players/edit.html',
        controller: 'PlayerEditCtrl'
      }).
      when('/clubs/:clubId/fixtures/add', {
        templateUrl: '/assets/app/views/fixtures/add.html',
        controller: 'FixtureAddCtrl'
      }).
      when('/clubs/:clubId/fixtures', {
        templateUrl: '/assets/app/views/fixtures/fixtures.html',
        controller: 'FixturesCtrl'
      }).
      when('/clubs/:clubId/fixtures/:fixtureId/formation/edit', {
        templateUrl: '/assets/app/views/formation/edit.html',
        controller: 'FormationEditCtrl'
      }).
      when('/clubs/:clubId/fixtures/:fixtureId/stats/edit', {
        templateUrl: '/assets/app/views/fixturestats/edit.html',
        controller: 'FixtureStatsEditCtrl'
      }).
      when('/clubs/:clubId/fixtures/:fixtureId/stats', {
        templateUrl: '/assets/app/views/fixturestats/view.html',
        controller: 'FixtureStatsCtrl'
      }).
      when('/clubs/:clubId/fixtures/:fixtureId/gamestats/edit', {
        templateUrl: '/assets/app/views/fixturestats/gamestats.edit.html',
        controller: 'GameStatsEditCtrl'
      }).
      when('/clubs/:clubId/fixtures/:fixtureId/gamestats', {
        templateUrl: '/assets/app/views/fixturestats/gamestats.view.html',
        controller: 'GameStatsCtrl'
      }).
      when('/clubs/:clubId/fixtures/:fixtureId/edit', {
        templateUrl: '/assets/app/views/fixtures/edit.html',
        controller: 'FixtureEditCtrl'
      }).
      when('/clubs/:clubId/fixtures/:fixtureId', {
        templateUrl: '/assets/app/views/fixtures/fixture.html',
        controller: 'FixtureCtrl'
      }).
      when('/myaccount/edit', {
        templateUrl: '/assets/app/views/account/edit.html',
        controller: 'MyAccountEditCtrl'
      }).
      when('/myaccount', {
        templateUrl: '/assets/app/views/account/myaccount.html',
        controller: 'MyAccountCtrl'
      }).
      when('/contactus/confirm', {
        templateUrl: '/assets/app/views/contactus/confirm.html',
        controller: 'ContactUsConfirmCtrl'
      }).
      when('/contactus', {
        templateUrl: '/assets/app/views/contactus/view.html',
        controller: 'ContactUsCtrl'
      }).
      otherwise({
            redirectTo: '/'
        });
  }]);