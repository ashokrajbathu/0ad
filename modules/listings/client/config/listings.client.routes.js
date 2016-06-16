(function () {
  'use strict';

  angular
    .module('listings')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('listings', {
        abstract: true,
        url: '/listings',
        template: '<ui-view/>'
      })
      .state('listings.list', {
        url: '',
        templateUrl: 'modules/listings/client/views/list-listings.client.view.html',
        controller: 'ListingsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Listings List'
        }
      })
      .state('listings.viewbookedlisting', {
        url: '',
        templateUrl: 'modules/listings/client/views/view-bookings.client.view.html',
        controller: 'ListingsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Bookings List'
        }
      })
      .state('listings.create', {
        url: '/create',
        templateUrl: 'modules/listings/client/views/form-listing.client.view.html',
        controller: 'ListingsController',
        controllerAs: 'vm',
        resolve: {
          listingResolve: newListing
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Listings Create'
        }
      })
      .state('listings.bookit', {
        url: '/:listingId/book',
        templateUrl: 'modules/listings/client/views/book.client.view.html',
        controller: 'BookingController',
        controllerAs: 'vm',
        resolve: {
          listingResolve: getListing
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Book Listings'
        }
      })
      .state('listings.edit', {
        url: '/:listingId/edit',
        templateUrl: 'modules/listings/client/views/form-listing.client.view.html',
        controller: 'ListingsController',
        controllerAs: 'vm',
        resolve: {
          listingResolve: getListing
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Listing {{ listingResolve.name }}'
        }
      })
      .state
      ('listings.addphotos', {
        url: '/:listingId/photos',
        templateUrl: 'modules/listings/client/views/photos.client.view.html',
        controller: 'PhotosController',
        controllerAs: 'vm',
        resolve: {
          listingResolve: getListing
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Add photos to Listing {{ listingResolve.name }}'
        }
      })
      .state('multiphotos', {
        url: '/multiphotos',
        templateUrl: 'modules/listings/client/views/multiphotos.client.view.html',
        controller: 'MultiphotosController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Listings List'
        }
      })
     .state('search', {
        url: '/search',
        
        templateUrl: 'modules/listings/client/views/search-listings.client.view.html',
        controller: 'SearchController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Listings List'
        }
      })
      .state('listings.view', {
        url: '/:listingId',
        templateUrl: 'modules/listings/client/views/view-listing.client.view.html',
        controller: 'ListingsController',
        controllerAs: 'vm',
        resolve: {
          listingResolve: getListing
        },
        data:{
          pageTitle: 'Listing {{ articleResolve.name }}'
        }
      });
  }

  getListing.$inject = ['$stateParams', 'ListingsService'];

  function getListing($stateParams, ListingsService) {
    return ListingsService.get({
      listingId: $stateParams.listingId
    }).$promise;
  }

  newListing.$inject = ['ListingsService'];

  function newListing(ListingsService) {
    return new ListingsService();
  }
})();
