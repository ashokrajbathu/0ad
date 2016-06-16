(function () {
  'use strict';

  // Listings controller
  angular
    .module('listings')
    .controller('ListingsController', ListingsController);

  ListingsController.$inject = ['$scope', '$state', 'Authentication', 'listingResolve', '$http'];

  function ListingsController ($scope, $state, Authentication, listing, $http) {
    var vm = this;

    vm.authentication = Authentication;
    vm.listing = listing;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Listing
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.listing.$remove($state.go('listings.list'));
      }
    }

    // Save Listing
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.listingForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.listing._id) {
        vm.listing.$update(successCallback, errorCallback);

      } else {
        console.log(vm.listing._id);
        vm.listing.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('listings.view', {
          listingId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
  
})();
