//Listings service used to communicate Listings REST endpoints
(function () {
  'use strict';

  angular
    .module('listings')
    .factory('ListingsService', ListingsService);

  ListingsService.$inject = ['$resource'];

  function ListingsService($resource) {
    return $resource('api/listings/:listingId', {
      listingId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
