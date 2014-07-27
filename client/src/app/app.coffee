angular.module('oldah', [
    'templates-app'
    'templates-common'
    'oldah.home'
    'oldah.flash'
    'ui.router'
    'ngEnter'
])
.config(($stateProvider, $urlRouterProvider, $locationProvider) ->
  $locationProvider.html5Mode true
  $urlRouterProvider.otherwise '/home'
)
.controller 'AppCtrl', ($scope, $location) ->
  $scope.$on '$stateChangeSuccess', (event, toState) ->
    $scope.pageTitle = "#{toState.data.pageTitle} | say oldah!"

