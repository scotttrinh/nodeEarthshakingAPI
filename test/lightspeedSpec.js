var expect = require("chai").expect;
var ls = require("../lib/lightspeed.js");
var _ = require("lodash");

describe("LightSpeed", function() {

  it("should load successfully", function(){
    expect(ls).to.not.be.null;
  });

  it("should use environment variables for secrets", function() {
    expect(process.env.LS_API_KEY).to.exist;
    expect(process.env.LS_ACCOUNT).to.exist;
  });

  describe(".createCall()", function() {
    var lsOrder;

    before(function (done) {
      ls.createCall('get',
                    'Order',
                    {params:{limit:1,load_relations:"all"}},
                    function(res){
                      lsOrder = res;
                      done();
                    });
    });

    it("should return a non-empty object response", function() {
      expect(_.isEmpty(lsOrder)).to.be.false;
      expect(_.isObject(lsOrder)).to.be.true;
    });

  });
});
