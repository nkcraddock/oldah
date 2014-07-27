app = angular.module 'oldah.home', [
    'ui.router'
]

app.config ($stateProvider) ->
  $stateProvider.state 'home',
    url: '/home'
    views:
      main:
        controller: 'HomeCtrl',
        templateUrl: 'home/home'
    data:
      pageTitle: 'Home'

app.controller 'HomeCtrl', ($scope) ->
  $scope.something = 'something'

