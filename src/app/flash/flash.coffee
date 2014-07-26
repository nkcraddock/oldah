app = angular.module 'oldah.flash', [
 'ui.router'
]

app.config ($stateProvider) ->
  $stateProvider.state 'flash',
    url: '/flash'
    views:
      main:
        controller: 'FlashCtrl',
        templateUrl: 'home/home'
    data:
      pageTitle: 'Flash'

app.controller 'FlashCtrl', ($scope) ->
  $scope.something = 'something'

