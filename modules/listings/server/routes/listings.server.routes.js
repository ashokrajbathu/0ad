'use strict';

/**
 * Module dependencies
 */
var listingsPolicy = require('../policies/listings.server.policy'),
  listings = require('../controllers/listings.server.controller');

module.exports = function(app) {
  // Listings Routes
  app.route('/api/listings').all(listingsPolicy.isAllowed)
    .get(listings.list)
    .post(listings.create);

  //app.route('/api/listings/picture/:listingId')
    //.post(listings.uploadPicture);
    
  app.route('/api/listings/:listingId').all(listingsPolicy.isAllowed)
    .get(listings.read)
    .put(listings.update)
    .delete(listings.delete);

  // Finish by binding the Listing middleware
  app.param('listingId', listings.listingByID);

};
