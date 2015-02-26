(function(){
  'use strict';

  angular
      .module('app.cuentas')
      .controller('Cuentas', Cuentas);

  Cuentas.$inject = ['$scope', '$http', 'CoreEntities.Tipos', 'CoreEntities.Rubros', 'CoreEntities.Cuentas'];

  function Cuentas($scope, $http, CoreEntitiesTipos, CoreEntitiesRubros, CoreEntitiesCuentas){

    $scope.updateData = function(){
      CoreEntitiesTipos.getTipos().then(function(){
        $scope.tipos = CoreEntitiesTipos.tipos;
      });
      CoreEntitiesRubros.getRubros().then(function(){
        $scope.rubros = CoreEntitiesRubros.rubros;
      });
      CoreEntitiesCuentas.getCuentas().then(function(){
        $scope.cuentas = CoreEntitiesCuentas.cuentas;
      });
    };

    $scope.updateData();

    $scope.abrirDetalle = function(str){
      var elem = $('#'+str);
      elem.toggle('slow');
    };

    $scope.abrirMayor = function(cuenta){
      $scope.formMayor = cuenta;
      $scope.formMayor.saldo = {tipo:'',monto:''};
      var auxDebe = 0;
      var auxHaber = 0;
      for(var mov in $scope.formMayor.movimientos){
        var movimiento = $scope.formMayor.movimientos[mov];
        if(movimiento.tipo =='debe'){
          auxDebe += movimiento.monto;
        }else{
          auxHaber += movimiento.monto;
        }
      }
      if(auxDebe>auxHaber){
        $scope.formMayor.saldo.tipo = 'Deudor';
        $scope.formMayor.saldo.monto = auxDebe - auxHaber;
      }else{
        if(auxHaber>auxDebe){
          $scope.formMayor.saldo.tipo = 'Acreedor';
          $scope.formMayor.saldo.monto = auxHaber - auxDebe;
        }else{
          $scope.formMayor.saldo.tipo = '';
          $scope.formMayor.saldo.monto = 0;
        }
      }
      $scope.modals.mayor = 'bet-show';
    };

    $scope.modals = {'rubro':'','cuenta':'',mayor:''};

    $scope.formRubro = {};
    $scope.formCuenta = {};

    $scope.eliminarElemento = function(elem,index){
      if(confirm('¿Seguro desea eliminar este elemento?')){
        $http.post("remove/" + elem,{'id':index}).then(function(){
          $scope.updateData();
        });
      }
    };

    $scope.crearCuenta = function(index){
      $scope.formCuenta.idRubro = String(index);
      $scope.formCuenta.id = String(CoreEntitiesCuentas.calcularCuentaId(index));
      $scope.modals.cuenta = 'bet-show';
    };
    $scope.crearRubro = function(index){
      $scope.formRubro.idTipo = String(index);
      $scope.formRubro.id = String(CoreEntitiesRubros.calcularRubroId(index));
      $scope.modals.rubro = 'bet-show';
    };

    $scope.editarCuenta= function(id){
      var cuenta = CoreEntitiesCuentas.buscarCuentaPorId(id);
      $scope.formCuenta= cuenta[0];
      $scope.modals.cuenta = 'bet-show';
    };

    $scope.editarRubro = function(id){
      var rubro = CoreEntitiesRubros.buscarRubroPorId(id);
      $scope.formRubro = rubro[0];
      $scope.modals.rubro = 'bet-show';
    };

    function capitaliseFirstLetter(string){
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    $scope.hideModal = function(modal){
      $scope.modals[modal] = '';
      $scope['form' + capitaliseFirstLetter(modal)] = {};
    };

    $scope.movimientoTipo = function(string,value){
      if(string == 'debe' && value == 'debe'){
        return true;
      }else if(string == 'haber' && value == 'haber'){
        return true;
      }
      return false;
    };

    $scope.sendForm = function(action,data){
      $http.post("put/" + action,data).then(function(){
        $scope.hideModal(action);
        $scope.updateData();
      });
    };

  }
})();