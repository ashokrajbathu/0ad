(function() {
  'use strict';

  angular
    .module('core')
    .controller('AddtrixController', AddtrixController);

  AddtrixController.$inject = ['$scope'];

  function AddtrixController($scope) {
    var vm = this;

    // Addtrix controller logic
    // ...

    init();

    function init() {
    }
  }
})();
