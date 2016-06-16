'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  mongoosastic = require('mongoosastic'),
  Schema = mongoose.Schema;

/**
 * Listing Schema
 */

var ListingSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Listing name',
    trim: true
  },
  listingImageURL: {
    type: String,
    default: 'modules/users/client/img/profile/default.png'
  },
  spacetype: {
    type: String,
    default:'',
    required: 'Please enter the spacetype',
    trim: true
  },
  detailsofspace: {
    type: String,
    default:'',
    //required: 'Please enter the detailsofspace',
    trim: true
  },
  location: {
    type: String,
    default: '',
    required: 'Please fill Listing location',
    trim: true
  },
  targetedcustomers: {
    type: String,
    default:'',
    //required: 'Please enter the targeted customers',
    trim: true
  },
  customertype: {
    type: String,
    default:'',
    required: 'Please enter the customer details',
    trim: true
  },
  agegroup: {
    type: String,
    default:'',
    //required: 'Please enter the age group',
    trim: true
  },
  targetedgender: {
    type: String,
    default:'',
    //required: 'Please enter the targeted gender',
    trim: true
  },
  targetniche: {
    type: String,
    default:'',
    //required: 'Please enter the target niche',
    trim: true
  },
  targetedmarket: {
    type: String,
    default:'',
    //required: 'Please enter the targeted market',
    trim: true
  },
  //reach is number of people that this add will reach
  reach: { 
    type: String,
    default:'',
    //required: 'Please enter the avarage number of people it reaches',
    trim: true
  },
  //perweek
  pricing: { 
    type: String,
    default:'',
    //required: 'Please enter the Pricing',
    trim: true
  },
  spaceavailability: { 
    type: String,
    default:'',
    required: 'Please enter the available Dates and timings of space',
    trim: true
  },
  contact: { 
    type: String,
    default:'',
    required: 'Your contact number is required',
    trim: true
  },
  emailid: { 
    type: String,
    default:'',
    required: 'Email ID is required',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

ListingSchema.plugin(mongoosastic);
mongoose.model('Listing', ListingSchema);

