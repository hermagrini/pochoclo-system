(function(){
  'use strict';

  angular
      .module('app.coreEntities.cuentas')
      .factory('CoreEntities.Cuentas', CoreEntitiesCuentas);

  CoreEntitiesCuentas.$inject = ['$http'];

  function CoreEntitiesCuentas($http){

    var cuentas = [];

    return {
      buscarCuentaPorId     : buscarCuentaPorId,
      buscarRubroPorIdRubro : buscarRubroPorIdRubro,
      cuentas               : cuentas,
      calcularCuentaId      : calcularCuentaId,
      getCuentas            : getCuentas
    };

    function calcularCuentaId(index){
      var cuentas = buscarRubroPorIdRubro(index);
      var cuentaId = (parseInt(index)*100);
      if(cuentas.length > 0){
        cuentaId = parseInt(cuentas[cuentas.length-1].id);
      }
      return cuentaId+1;
    }

    function buscarCuentaPorId(id){
      return $.grep(cuentas,function(cuenta){
        return cuenta.id == id;
      });
    }

    function buscarRubroPorIdRubro(idRubro){
      return $.grep(cuentas,function(cuenta){
        return cuenta.idRubro == idRubro;
      });
    }

    function getCuentas(){
      return $http.post("cuenta/traerListaCuentas",{},{cache:true})
          .then(getCuentasCallback)
    }

    function getCuentasCallback(response){
      cuentas = response.data;
    }
  }

})();