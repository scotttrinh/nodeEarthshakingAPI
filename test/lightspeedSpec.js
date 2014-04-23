var expect = require("chai").expect;
var ls = require("../lib/lightspeed.js");
var args = ["Orders",{"limit":"1"}];

describe("LightSpeed", function() {
  describe(".get()", function() {
    it("should return a result", function() {
      var results = ls.get(args);

      expect(results).to.exist;
    });
    it("should return an object", function() {
      var results = ls.get(args);

      expect(results).to.be.instanceof(Object);
    });
    it("should require arguments", function() {
      expect(ls.get).to.throw('too few arguments');
    });
    it("should return properly formatted JSON", function() {
      expect(function(){ls.get(args)}).to.not.throw(/poorly formed JSON/);
    });
  });
});
