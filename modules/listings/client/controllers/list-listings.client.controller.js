(function () {
  'use strict';

  angular
    .module('listings')
    .controller('ListingsListController', ListingsListController);

  ListingsListController.$inject = ['ListingsService'];

  function ListingsListController(ListingsService) {
    var vm = this;

    vm.listings = ListingsService.query();
  }
})();
