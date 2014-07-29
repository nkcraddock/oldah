
describe 'mathGameService', () ->
  describe 'randomProblem', ->
    mathGameService = null
    $location = null
    $scope = null

    beforeEach module 'oldah'
    beforeEach module 'oldah.flash'

    beforeEach inject (_mathGameService_) ->
      mathGameService = _mathGameService_
    
    it 'should return 99 problems', () ->
      for i in [1..99]
        problem = mathGameService.randomProblem()
        expect(problem).toMatch /\d+\s+[\*\-\+]\s+\d+/

    
