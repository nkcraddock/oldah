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
  $scope.login = () ->
    baseUrl = 'https://accounts.google.com/o/oauth2/auth?'
    cid = '352615882020-vp8umgl8l7oo9thp8dkopvin9se3app5' + \
    '.apps.googleusercontent.com'

    redirecturi = 'http://localhost:9000/oauth2'
    scope = 'email%20profile'
    response_type = 'token'

    request = "#{baseUrl}response_type=#{response_type}" + \
    "&client_id=#{cid}&redirect_uri=#{redirecturi}&scope=#{scope}"
    window.location.href = request
