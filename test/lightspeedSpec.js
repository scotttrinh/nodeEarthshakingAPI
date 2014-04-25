var expect = require("chai").expect;
var ls = require("../lib/lightspeed.js");
var args = ["Orders",{"limit":"1"}];

describe("LightSpeed", function() {
  it("should use environment variables for secrets", function() {
    expect(process.env.LS_API_KEY).to.exist;
    expect(process.env.LS_ACCOUNT).to.exist;
  });
  describe(".get()", function() {
  });
});
