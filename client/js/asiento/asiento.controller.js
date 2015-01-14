(function(){
  'use strict';

  angular
      .module('app.asiento')
      .controller('Asiento', Asiento);

  Asiento.$inject = ['$scope', 'dataService'];

  function Asiento($scope, dataService){
    $scope.updateData = function(){
      dataService.getData('asiento','traerListaAsientos','')
          .then(function(response){
            dataService.saveData("asiento", response.data);
            $scope.asientos = response.data;
          });
    };
    $scope.updateData();
    $scope.movimientoTipo = function(string,value){
      if(string == 'debe' && value == 'debe'){
        return true;
      }else if(string == 'haber' && value == 'haber'){
        return true;
      }
      return false;
    };
  }
})();