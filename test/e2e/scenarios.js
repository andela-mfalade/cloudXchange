'use strict';

describe("Sharestream App tests", function () {
  describe("Resource list view", function () {
    beforeEach(function() {
      browser.get('http://localhost:3000/#');
    });
    it("Should display the correct page title", function () {
      expect(browser.getTitle()).toBe('Cloudshare');
    });
    it('should filter the list of available resources based on the user search query', function(){
      var resourceList = element.all(by.repeater('resource in resources'));
      var query = element(by.model('query'));
      query.sendKeys('Some random resource that is not expected to be found here');
      expect(resourceList.count()).toBe(0);


      query.clear();
      query.sendKeys('programming');
      expect(resourceList.count()).toBe(7);
    });
  });
});   