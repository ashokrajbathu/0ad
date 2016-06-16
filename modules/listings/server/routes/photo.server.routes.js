'use strict';

/**
 * Module dependencies
 */
var listingsPolicy = require('../policies/listings.server.policy'),
  listings = require('../controllers/photo.server.controller');

module.exports = function(app) {
  // Listings Routes
  

  //app.route('/api/listings/picture/:listingId')
    //.post(listings.uploadPicture);
    
 
  app.route('/api/listing/picture/:listingsId').post(listings.AddPicture);
  app.route('/api/listing/booking/:listingsId').post(listings.AddBooking);
  // Finish by binding the Listing middleware
  //app.param('listingId', listings.listingByID);

  app.param('listingsId', listings.listingByID);

};
