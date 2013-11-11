coachStatControllers.directive('breadcrumb',['$rootScope', function($rootScope) {
        return {
            restrict: 'E',
            template: "<ul class='breadcrumb' ><li ng-repeat='node in path'><a ng-href='{{node.url}}' >{{node.label}}</a></li></ul>",
            replace: true,
            controller: 'HomeCtrl'
        };
    }]);