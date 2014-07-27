describe 'AppCtrl', () ->
  describe 'isCurrentUrl', ->
    AppCtrl = null
    $location = null
    $scope = null

    beforeEach module 'oldah'

    beforeEach inject ($controller, _$location_, $rootScope) ->
      $location = _$location_
      $scope = $rootScope.$new()
      AppCtrl = $controller 'AppCtrl', {
        $location: $location
        $scope: $scope
      }
    
    it 'should pass a dummy test', inject () ->
      expect(AppCtrl).toBeTruthy

