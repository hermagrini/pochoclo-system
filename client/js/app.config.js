(function(){
  'use strict';

  angular
      .module('pochocloApp')
      .config(configure);

  configure.$inject = ['$routeProvider'];

  function configure($routeProvider){
    $routeProvider
        .when('/',{
          controller:'Home',
          templateUrl:'client/js/home/home.html'
        })
        .when('/cuentas',{
          controller:'Cuentas',
          templateUrl:'client/js/cuentas/cuentas.html'
        })
        .when('/nuevoAsiento',{
          controller:'NuevoAsiento',
          templateUrl:'client/js/nuevoAsiento/nuevoAsiento.html'
        })
        .when('/asientos',{
          controller:'Asiento',
          templateUrl:'client/js/asiento/asiento.html'
        })
        .when('/debug',{
          templateUrl: 'client/js/views/debug.html',
          controller: "DebugCtrl"
        })
        .otherwise({redirectTo:'/'});
  }

})();