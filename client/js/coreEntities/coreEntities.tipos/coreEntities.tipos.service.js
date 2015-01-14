(function(){
  'use strict';

  angular
      .module('app.coreEntities.tipos')
      .factory('CoreEntities.Tipos', CoreEntitiesTipos);

  CoreEntitiesTipos.$inject = ['$http'];

  function CoreEntitiesTipos($http){

    var tipos = [];

    var servicio = {
      getTipos  : getTipos,
      tipos     : tipos
    };

    return servicio;

    function getTipos(){
      return $http.post("tipo/traerListaTipos",{},{cache:true})
          .then(getTiposCallback)
    }

    function getTiposCallback(response){
      servicio.tipos = response.data;
    }
  }
})();