app = angular.module 'oldah.flash', [
 'ui.router'
]

app.config ($stateProvider) ->
  $stateProvider.state 'flash',
    url: '/flash'
    views:
      main:
        controller: 'FlashCtrl',
        templateUrl: 'flash/flash'
    data:
      pageTitle: 'Flash'

app.controller 'FlashCtrl', ($scope, mathGameService) ->
  $scope.wins = 0
  $scope.guesses = 0
  $scope.winRatio = 0

  processResult = (correct) ->
    do win if correct
    do nextGuess

  win = () ->
    $scope.wins += 1
    nextProblem()

  nextProblem = () ->
    $scope.problem = mathGameService.randomProblem()

  nextGuess = () ->
    $scope.guesses += 1
    $scope.guess = ''
    $scope.winRatio = Math.floor ($scope.wins / $scope.guesses) * 100

  $scope.makeGuess = () ->
    result = eval $scope.problem
    guess = Number $scope.guess
    correct = guess is result
    do win if correct
    nextGuess()

  nextProblem()
