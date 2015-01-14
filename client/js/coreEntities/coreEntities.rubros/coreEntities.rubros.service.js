(function(){
  'use strict';

  angular
      .module('app.coreEntities.rubros')
      .factory('CoreEntities.Rubros', CoreEntitiesRubros);

  CoreEntitiesRubros.$inject = ['$http'];

  function CoreEntitiesRubros($http){
    
    var rubros = [];

    return {
      buscarRubroPorId      : buscarRubroPorId,
      buscarRubroPorIdTipo  : buscarRubroPorIdTipo,
      calcularRubroId       : calcularRubroId,
      getRubros             : getRubros,
      rubros                : rubros
    };

    function calcularRubroId(index){
      var rubros = buscarRubroPorIdTipo(index);
      var rubroId = (parseInt(index) * 10);
      if(rubros.length > 0){
        rubroId = parseInt(rubros[rubros.length - 1].id);
      }
      return rubroId + 1;
    }

    function buscarRubroPorId(id){
      return $.grep(rubros,function(rubro){
        return rubro.id == id;
      });
    }

    function buscarRubroPorIdTipo(idTipo){
      return $.grep(rubros,function(rubro){
        return rubro.idTipo == idTipo;
      });
    }

    function getRubros(){
      return $http.post("rubro/traerListaRubros",{},{cache:true})
          .then(getRubrosCallback)
    }

    function getRubrosCallback(response){
      rubros = response.data;
    }
  }
})();