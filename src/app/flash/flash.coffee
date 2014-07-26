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

app.controller 'FlashCtrl', ($scope) ->
  operators = ['*', '-', '+']

  flashResult = (correct) ->
    console.log correct

  reset = () ->
    $scope.problem = getOperand() + ' ' + getOperator() + ' ' + getOperand()
    resetGuess()

  resetGuess = () ->
    $scope.guess = ''

  getOperand = () ->
    Math.floor ((Math.random() * 100) % 12) + 1

  getOperator = () ->
    which = Math.floor((Math.random() * 100) % operators.length)
    operators[which]

  $scope.makeGuess = () ->
    result = eval $scope.problem
    guess = Number $scope.guess
    correct = guess is result
    flashResult correct
    if correct
      reset()
    else
      resetGuess()

  reset()
