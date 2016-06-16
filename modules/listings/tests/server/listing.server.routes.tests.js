'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Listing = mongoose.model('Listing'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, listing;

/**
 * Listing routes tests
 */
describe('Listing CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Listing
    user.save(function () {
      listing = {
        name: 'Listing name'
      };

      done();
    });
  });

  it('should be able to save a Listing if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Listing
        agent.post('/api/listings')
          .send(listing)
          .expect(200)
          .end(function (listingSaveErr, listingSaveRes) {
            // Handle Listing save error
            if (listingSaveErr) {
              return done(listingSaveErr);
            }

            // Get a list of Listings
            agent.get('/api/listings')
              .end(function (listingsGetErr, listingsGetRes) {
                // Handle Listing save error
                if (listingsGetErr) {
                  return done(listingsGetErr);
                }

                // Get Listings list
                var listings = listingsGetRes.body;

                // Set assertions
                (listings[0].user._id).should.equal(userId);
                (listings[0].name).should.match('Listing name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Listing if not logged in', function (done) {
    agent.post('/api/listings')
      .send(listing)
      .expect(403)
      .end(function (listingSaveErr, listingSaveRes) {
        // Call the assertion callback
        done(listingSaveErr);
      });
  });

  it('should not be able to save an Listing if no name is provided', function (done) {
    // Invalidate name field
    listing.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Listing
        agent.post('/api/listings')
          .send(listing)
          .expect(400)
          .end(function (listingSaveErr, listingSaveRes) {
            // Set message assertion
            (listingSaveRes.body.message).should.match('Please fill Listing name');

            // Handle Listing save error
            done(listingSaveErr);
          });
      });
  });

  it('should be able to update an Listing if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Listing
        agent.post('/api/listings')
          .send(listing)
          .expect(200)
          .end(function (listingSaveErr, listingSaveRes) {
            // Handle Listing save error
            if (listingSaveErr) {
              return done(listingSaveErr);
            }

            // Update Listing name
            listing.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Listing
            agent.put('/api/listings/' + listingSaveRes.body._id)
              .send(listing)
              .expect(200)
              .end(function (listingUpdateErr, listingUpdateRes) {
                // Handle Listing update error
                if (listingUpdateErr) {
                  return done(listingUpdateErr);
                }

                // Set assertions
                (listingUpdateRes.body._id).should.equal(listingSaveRes.body._id);
                (listingUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Listings if not signed in', function (done) {
    // Create new Listing model instance
    var listingObj = new Listing(listing);

    // Save the listing
    listingObj.save(function () {
      // Request Listings
      request(app).get('/api/listings')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Listing if not signed in', function (done) {
    // Create new Listing model instance
    var listingObj = new Listing(listing);

    // Save the Listing
    listingObj.save(function () {
      request(app).get('/api/listings/' + listingObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', listing.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Listing with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/listings/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Listing is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Listing which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Listing
    request(app).get('/api/listings/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Listing with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Listing if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Listing
        agent.post('/api/listings')
          .send(listing)
          .expect(200)
          .end(function (listingSaveErr, listingSaveRes) {
            // Handle Listing save error
            if (listingSaveErr) {
              return done(listingSaveErr);
            }

            // Delete an existing Listing
            agent.delete('/api/listings/' + listingSaveRes.body._id)
              .send(listing)
              .expect(200)
              .end(function (listingDeleteErr, listingDeleteRes) {
                // Handle listing error error
                if (listingDeleteErr) {
                  return done(listingDeleteErr);
                }

                // Set assertions
                (listingDeleteRes.body._id).should.equal(listingSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Listing if not signed in', function (done) {
    // Set Listing user
    listing.user = user;

    // Create new Listing model instance
    var listingObj = new Listing(listing);

    // Save the Listing
    listingObj.save(function () {
      // Try deleting Listing
      request(app).delete('/api/listings/' + listingObj._id)
        .expect(403)
        .end(function (listingDeleteErr, listingDeleteRes) {
          // Set message assertion
          (listingDeleteRes.body.message).should.match('User is not authorized');

          // Handle Listing error error
          done(listingDeleteErr);
        });

    });
  });

  it('should be able to get a single Listing that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Listing
          agent.post('/api/listings')
            .send(listing)
            .expect(200)
            .end(function (listingSaveErr, listingSaveRes) {
              // Handle Listing save error
              if (listingSaveErr) {
                return done(listingSaveErr);
              }

              // Set assertions on new Listing
              (listingSaveRes.body.name).should.equal(listing.name);
              should.exist(listingSaveRes.body.user);
              should.equal(listingSaveRes.body.user._id, orphanId);

              // force the Listing to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Listing
                    agent.get('/api/listings/' + listingSaveRes.body._id)
                      .expect(200)
                      .end(function (listingInfoErr, listingInfoRes) {
                        // Handle Listing error
                        if (listingInfoErr) {
                          return done(listingInfoErr);
                        }

                        // Set assertions
                        (listingInfoRes.body._id).should.equal(listingSaveRes.body._id);
                        (listingInfoRes.body.name).should.equal(listing.name);
                        should.equal(listingInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Listing.remove().exec(done);
    });
  });
});
