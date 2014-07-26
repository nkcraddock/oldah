app = angular.module('oldah.flash')
app.factory 'mathGameService', () ->
  operators = ['*', '-', '+']

  getOperand = () ->
    Math.floor ((Math.random() * 100) % 12) + 1

  getOperator = () ->
    which = Math.floor((Math.random() * 100) % operators.length)
    operators[which]

  return {
    randomProblem: () ->
      "#{getOperand()} #{getOperator()} #{getOperand()}"
  }
