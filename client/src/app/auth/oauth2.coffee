app = angular.module 'oldah.auth', [
    'ui.router'
]

app.config ($stateProvider) ->
  $stateProvider.state 'auth',
    url: '/oauth2'
    views:
      main:
        controller: 'OAuth2Ctrl',
        template: ''
    data:
      pageTitle: 'oauth2'

app.controller 'OAuth2Ctrl', ($rootScope, $location, $http) ->

  regex = /^.*\#access_token=([^&]+)/g
  matches = regex.exec $location.url()
  url = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + \
  matches[1]
  
  $http.get(url).success (data) ->
    $rootScope.email = data.email
    $location.url('/home')
