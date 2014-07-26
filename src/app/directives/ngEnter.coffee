angular.module('ngEnter', [])
  .directive 'ngEnter', () ->
    return (scope, element, attrs) ->
      element.bind 'keydown', (event) ->
        if event.which is 13
          scope.$apply () ->
            scope.$eval attrs.ngEnter

          event.preventDefault

