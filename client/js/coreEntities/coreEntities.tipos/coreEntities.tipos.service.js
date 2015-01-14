(function(){
  'use strict';

  angular
      .module('app.coreEntities.tipos')
      .factory('CoreEntities.Tipos', CoreEntitiesTipos);

  CoreEntitiesTipos.$inject = ['$http'];

  function CoreEntitiesTipos($http){

    var tipos = [];

    return {
      getTipos  : getTipos,
      tipos     : tipos
    };

    function getTipos(){
      return $http.post("tipo/traerListaTipos",{},{cache:true})
          .then(getTiposCallback)
    }

    function getTiposCallback(response){
      tipos = response.data;
    }
  }
})();