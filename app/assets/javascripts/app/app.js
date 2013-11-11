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
      when('/clubs/:clubId', {
        templateUrl: '/assets/app/views/club/club.html',
        controller: 'ClubCtrl'
      }).
      when('/clubs/:clubId/details', {
        templateUrl: '/assets/app/views/club/details.html',
        controller: 'ClubDetailsCtrl'
      }).
      when('/clubs/:clubId/players', {
        templateUrl: '/assets/app/views/players/players.html',
        controller: 'PlayersCtrl'
      }).
      when('/clubs/:clubId/players/:playerId', {
        templateUrl: '/assets/app/views/players/player.html',
        controller: 'PlayerCtrl'
      }).
      when('/clubs/:clubId/players/:playerId/edit', {
        templateUrl: '/assets/app/views/players/edit.html',
        controller: 'PlayerEditCtrl'
      }).
      when('/clubs/:clubId/fixtures', {
        templateUrl: '/assets/app/views/fixtures/fixtures.html',
        controller: 'FixturesCtrl'
      }).
      when('/clubs/:clubId/fixtures/:fixtureId', {
        templateUrl: '/assets/app/views/fixtures/fixture.html',
        controller: 'FixtureCtrl'
      }).
      when('/myaccount', {
        templateUrl: '/assets/app/views/account/myaccount.html',
        controller: 'MyAccountCtrl'
      });
  }]);