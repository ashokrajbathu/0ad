'use strict';

describe('Listings E2E Tests:', function () {
  describe('Test Listings page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/listings');
      expect(element.all(by.repeater('listing in listings')).count()).toEqual(0);
    });
  });
});
