angular.module('oldah', [
    'templates-app',
    'templates-common',
    'oldah.home',
    'oldah.about',
    'ui.router'
])

.config(function myAppConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/home');
})

.run(function run() {})

.controller('AppCtrl', function AppCtrl($scope, $location) {
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        if (angular.isDefined(toState.data.pageTitle)) {
            $scope.pageTitle = toState.data.pageTitle + ' | oldah';
        }
    });
})

;
