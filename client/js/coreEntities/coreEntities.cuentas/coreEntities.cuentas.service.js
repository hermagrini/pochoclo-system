(function(){
  'use strict';

  angular
      .module('app.coreEntities.cuentas')
      .factory('CoreEntities.Cuentas', CoreEntitiesCuentas);

  CoreEntitiesCuentas.$inject = ['$http'];

  function CoreEntitiesCuentas($http){

    var cuentas = [];

    var servicio = {
      buscarCuentaPorId     : buscarCuentaPorId,
      buscarRubroPorIdRubro : buscarRubroPorIdRubro,
      cuentas               : cuentas,
      calcularCuentaId      : calcularCuentaId,
      getCuentas            : getCuentas
    };

    return servicio;

    function buscarCuentaPorId(id){
      return $.grep(servicio.cuentas,function(cuenta){
        return cuenta.id == id;
      });
    }

    function buscarRubroPorIdRubro(idRubro){
      return $.grep(servicio.cuentas,function(cuenta){
        return cuenta.idRubro == idRubro;
      });
    }

    function calcularCuentaId(index){
      var cuentas = buscarRubroPorIdRubro(index);
      var cuentaId = (parseInt(index)*100);
      if(cuentas.length > 0){
        cuentaId = parseInt(cuentas[cuentas.length-1].id);
      }
      return cuentaId+1;
    }

    function getCuentas(){
      return $http.post("cuenta/traerListaCuentas",{},{cache:true})
          .then(getCuentasCallback)
    }

    function getCuentasCallback(response){
      servicio.cuentas = response.data;
    }
  }

})();