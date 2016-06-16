'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Listing = mongoose.model('Listing'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash'),
  multer = require('multer');

/**
 * Create a Listing
 */
exports.create = function(req, res) {
  var listing = new Listing(req.body);
  listing.user = req.user;

  listing.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(listing);
    }
  });
};

/**
 * Show the current Listing
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var listing = req.listing ? req.listing.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  listing.isCurrentUserOwner = req.user && listing.user && listing.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(listing);
};

/**
 * Update a Listing
 */
exports.update = function(req, res) {
  var listing = req.listing ;

  listing = _.extend(listing , req.body);

  listing.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(listing);
    }
  });
};

/**
 * Delete an Listing
 */
exports.delete = function(req, res) {
  var listing = req.listing ;

  listing.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(listing);
    }
  });
};

/**
 * List of Listings
 */
exports.list = function(req, res) { 
  Listing.find().sort('-created').populate('user', 'displayName').exec(function(err, listings) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(listings);
    }
  });
};

/**
 * Listing middleware
 */
exports.listingByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Listing is invalid'
    });
  }

  Listing.findById(id).populate('user', 'displayName').exec(function (err, listing) {
    if (err) {
      return next(err);
    } else if (!listing) {
      return res.status(404).send({
        message: 'No Listing with that identifier has been found'
      });
    }
    req.listing = listing;
    next();
  });
};
