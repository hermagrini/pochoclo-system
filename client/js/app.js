(function(){
  'use strict';

  angular
      .module('pochocloApp',[
        'ngRoute',
        'ngAnimate',
        'ngSanitize',
        'app.home',
        'app.cuentas',
        'app.nuevoAsiento',
        'app.asiento',
        'app.coreEntities'
      ]);
})();

angular
    .module('pochocloApp')
    .controller('DebugCtrl', function($scope,$http){
      $scope.pegar = function(){
        $http.post($scope.url, JSON.parse($scope.params)).then(function(response){
          $scope.response = response.data;
        });
      };
    });