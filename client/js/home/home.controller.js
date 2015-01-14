(function(){
  'use strict';

  angular
      .module('app.home')
      .controller('Home', Home);

  Home.$inject = ['$scope'];

  function Home($scope){
    $scope.nombre = '';
  }
})();