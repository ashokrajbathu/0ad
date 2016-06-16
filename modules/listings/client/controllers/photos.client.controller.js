'use strict';

angular
    .module('listings')
    .controller('PhotosController', PhotosController);

  PhotosController.$inject = ['$scope', '$state', 'Authentication', 'listingResolve', 'FileUploader', '$timeout', '$window'];

  function PhotosController ($scope, $state, Authentication, listing, FileUploader, $timeout, $window) {
    var vm = this;

    vm.listing = listing;
    vm.error = null;
    vm.form = {};
    vm.imageURL = vm.listing.listingImageURL;
    
    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: 'api/listing/picture/'+listing._id,
      alias: 'newProfilePicture'
    });
    //console.log(vm.listing._id);
    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    $scope.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            vm.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };

    // Called after the user has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;

      // Populate user object
      //$scope.user = Authentication.user = response;
      vm.listing = response;
      console.log(response);
      // Clear upload buttons
      $scope.cancelUpload();
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();

      // Show error message
      $scope.error = response.message;
    };

    // Change user profile picture
    $scope.uploadProfilePicture = function () {
      // Clear messages
      $scope.success = $scope.error = null;

      // Start upload
      $scope.uploader.uploadAll();
       
      /* $state.go('listings.view', {
          listingId: listing._id
        });*/

    };


    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
      vm.imageURL = vm.listing.listingImageURL;
    };
  }



