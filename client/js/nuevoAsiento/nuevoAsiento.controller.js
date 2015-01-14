(function(){
  'use strict';

  angular
      .module('app.nuevoAsiento')
      .controller('NuevoAsiento', NuevoAsiento);

  NuevoAsiento.$inject = ['$scope', '$http', 'CoreEntities.Cuentas'];

  function NuevoAsiento($scope, $http, CoreEntitiesCuentas){

    $scope.cuentas = CoreEntitiesCuentas.cuentas;
    
    $scope.updateData = function(){
      CoreEntitiesCuentas.getCuentas();
    };

    $scope.updateData();
    $scope.movimientos = [];
    $scope.movimientoForm = {id:'',nombre:'',debe:'',haber:''};
    $scope.hide = {id:'hide',nombre:'hide'};

    $scope.showDropdown = function(elem){
      switch (elem){
        case 'id':
          $scope.hide.id = '';
          break;
        case 'nombre':
          $scope.hide.nombre = '';
          break;
      }
    };

    $scope.setForm = function(cuenta){
      $scope.movimientoForm = cuenta;
      $scope.searchId = cuenta.id;
      $scope.searchNombre = cuenta.nombre;
      $scope.hide = {id:'hide',nombre:'hide'};
    };

    $scope.agregarMovimiento = function(){
      var cuentaValida = $.grep($scope.cuentas,function(n,i){
        return (n.id == $scope.movimientoForm.id) && (n.nombre == $scope.movimientoForm.nombre);
      });

      var cuentaRegistrada = $.grep($scope.movimientos,function(n,i){
        return (n.id == $scope.movimientoForm.id) && (n.nombre == $scope.movimientoForm.nombre);
      });

      var monto = false;
      if(!((typeof $scope.movimientoForm.debe == 'undefined')&&(typeof $scope.movimientoForm.haber == 'undefined'))){
        if(!($scope.movimientoForm.debe!=null && $scope.movimientoForm.haber!=null)){
          monto = true;
          if($scope.movimientoForm.debe>0){
            $scope.movimientoForm.monto = $scope.movimientoForm.debe;
            $scope.movimientoForm.tipo = 'debe';
          }else{
            $scope.movimientoForm.monto = $scope.movimientoForm.haber;
            $scope.movimientoForm.tipo = 'haber';
          }
        }
      }
      if (cuentaValida.length==1 && monto){
        if(cuentaRegistrada.length==0){
          $scope.movimientos.push($scope.movimientoForm);
        }
        $scope.movimientoForm = {};
        $scope.searchId = '';
        $scope.searchNombre = '';
        $scope.checkearBalance();
      }
    };

    $scope.quitarMovimiento = function(index){
      $scope.movimientos.splice(index);
    };
    $scope.checkearBalance = function(){
      $scope.total= {debe:0,haber:0};
      for (var mov in $scope.movimientos){
        if($scope.movimientos[mov].tipo == 'debe'){
          $scope.total.debe += $scope.movimientos[mov].monto;
        }else{
          $scope.total.haber += $scope.movimientos[mov].monto;
        }
      }
    };
    $scope.guardarAsiento = function(){
      $scope.checkearBalance();
      if($scope.total.debe == $scope.total.haber){
        $http.post('put/asiento',{movimientos:$scope.movimientos}).then(function(response){
          $scope.movimientos = [];
          $scope.total= {debe:0,haber:0};
        });
      }
    };
  }

})();