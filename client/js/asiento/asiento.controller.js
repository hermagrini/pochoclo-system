(function(){
  'use strict';

  angular
      .module('app.asiento')
      .controller('Asiento', Asiento);

  Asiento.$inject = ['$scope', '$http', '$filter'];

  function Asiento($scope, $http, $filter){
    var dateFilter = $filter('date');
    var orderBy = $filter('orderBy');
    var originalData;
    $scope.orderByDate = '-date';
    $scope.grupoAsientos = [];
    $scope.updateData = function(){
      $http.post('/asiento/traerListaAsientos')
          .then(function(response){
            originalData = response.data;
            parseData(originalData);
          });
    };
    $scope.updateData();
    $scope.toggleDate = function(){
      if($scope.orderByDate === '-date'){
        $scope.orderByDate = 'date';
      }else{
        $scope.orderByDate = '-date';
      }
      parseData(originalData);
    };
    $scope.movimientoTipo = function(string,value){
      if(string == 'debe' && value == 'debe'){
        return true;
      }else if(string == 'haber' && value == 'haber'){
        return true;
      }
      return false;
    };

    function parseData(data){
      $scope.grupoAsientos = _.groupBy(orderBy(data, $scope.orderByDate),function(n){
        return dateFilter(n.date,'dd-MM-yyyy');
      });
    }
  }
})();