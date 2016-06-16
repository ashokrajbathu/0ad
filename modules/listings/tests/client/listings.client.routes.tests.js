(function () {
  'use strict';

  describe('Listings Route Tests', function () {
    // Initialize global variables
    var $scope,
      ListingsService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ListingsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ListingsService = _ListingsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('listings');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/listings');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          ListingsController,
          mockListing;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('listings.view');
          $templateCache.put('modules/listings/client/views/view-listing.client.view.html', '');

          // create mock Listing
          mockListing = new ListingsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Listing Name'
          });

          //Initialize Controller
          ListingsController = $controller('ListingsController as vm', {
            $scope: $scope,
            listingResolve: mockListing
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:listingId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.listingResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            listingId: 1
          })).toEqual('/listings/1');
        }));

        it('should attach an Listing to the controller scope', function () {
          expect($scope.vm.listing._id).toBe(mockListing._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/listings/client/views/view-listing.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ListingsController,
          mockListing;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('listings.create');
          $templateCache.put('modules/listings/client/views/form-listing.client.view.html', '');

          // create mock Listing
          mockListing = new ListingsService();

          //Initialize Controller
          ListingsController = $controller('ListingsController as vm', {
            $scope: $scope,
            listingResolve: mockListing
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.listingResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/listings/create');
        }));

        it('should attach an Listing to the controller scope', function () {
          expect($scope.vm.listing._id).toBe(mockListing._id);
          expect($scope.vm.listing._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/listings/client/views/form-listing.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ListingsController,
          mockListing;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('listings.edit');
          $templateCache.put('modules/listings/client/views/form-listing.client.view.html', '');

          // create mock Listing
          mockListing = new ListingsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Listing Name'
          });

          //Initialize Controller
          ListingsController = $controller('ListingsController as vm', {
            $scope: $scope,
            listingResolve: mockListing
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:listingId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.listingResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            listingId: 1
          })).toEqual('/listings/1/edit');
        }));

        it('should attach an Listing to the controller scope', function () {
          expect($scope.vm.listing._id).toBe(mockListing._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/listings/client/views/form-listing.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
