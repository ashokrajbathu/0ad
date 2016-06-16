'use strict';

angular
    .module('listings')
    .controller('BookingController', BookingController);

  BookingController.$inject = ['$scope', '$state', 'Authentication', 'listingResolve', 'FileUploader', '$timeout', '$window', '$http'];

  function BookingController ($scope, $state, Authentication, listing, FileUploader, $timeout, $window, $http) {
    var vm = this;

    vm.listing = listing;
    vm.error = null;
    vm.authentication = Authentication;
    vm.form = {};

    $http.post('/api/listing/booking/'+listing._id, vm.authentication.user).success(function (response) {
        // If successful we assign the response to the global user model
       
        // And redirect to the previous or home page
      }).error(function (response) {
        $scope.error = response.message;
      });

  }
  

 


