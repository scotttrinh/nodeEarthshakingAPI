var expect = require("chai").expect;
var ls = require("../lib/lightspeed.js");
var _ = require("lodash");

var REST_ROOT = 'https://api.merchantos.com/API/Account/' +
                process.env.LS_ACCOUNT + '/';
describe("LightSpeed", function() {

  it("should load successfully", function(){
    expect(ls).to.not.be.null;
  });

  it("should use environment variables for secrets", function() {
    expect(process.env.LS_API_KEY).to.exist;
    expect(process.env.LS_ACCOUNT).to.exist;
  });

  describe("._addHate()", function(){
    it("should take an object and add an href to itself", function() {
      var url = 'http://this.url/';
      var resource = {};
      var resourceWithHref = ls._addHate(url, resource);
      expect(resourceWithHref.href).to.equal(url);
    });
  });

  describe(".createCall() on collection endpoint", function() {
    var lsResponse;
    var testEntity = 'Employee';
    var resourceID = (function(str) { return str.substr(0,1).toLowerCase() + str.substr(1); })(testEntity) + 'ID';
    this.timeout(0);

    before(function (done) {
      ls.createCall('get',
                    testEntity,
                    {params:{limit:1,load_relations:"all"}},
                    function(res){
                      lsResponse = res;
                      console.log(lsResponse);
                      done();
                    });
    });

    it("should return a non empty value", function() {
      expect(_.isEmpty(lsResponse)).to.be.false;
    });
    it("should return an object", function() {
      expect(_.isObject(lsResponse)).to.be.true;
    });
    it("should return correct number of resources", function() {
      if (lsResponse["@attributes"].count > 0) {
        expect(lsResponse[testEntity]).to.have.length(1);
      } else {
        expect(1).to.equal(1);
      }
    });
    it("should contain a universal identifier href", function() {
      expect(lsResponse.href).to.exist;
    });
    it("should go to the resource and add hrefs to each instance", function() {
      var url = REST_ROOT + testEntity + '/' + lsResponse[testEntity][0][resourceID] + '.json';
      expect(lsResponse[testEntity][0].href).to.equal(url);
    });

  });
  describe(".createCall() on an instance endpoint", function (){
    var lsResponse;
    var testEntityRoot = 'Employee';
    var testEntityInstance = '2';
    var testEntity = testEntityRoot + '/' + testEntityInstance;
    this.timeout(0);

    before(function (done) {
      ls.createCall('get',
                    testEntity,
                    {params:{limit:1,load_relations:"all"}},
                    function(res){
                      lsResponse = res;
                      console.log(lsResponse);
                      done();
                    });
    });
    it("should return a non-empty response", function() {
      expect(_.isEmpty(lsResponse)).to.be.false;
    });
    it("should return a deserialized object", function() {
      expect(_.isObject(lsResponse)).to.be.true;
    });
    it("should return the requested resource as an array", function() {
      expect(_.isArray(lsResponse[testEntityRoot])).to.be.true;
    });
  });
  describe("._arrayToCSVString", function(){
    it("should return a string of comma separated values", function(){
      expect(ls._arrayToCSVString(['1',2,'abc'])).to.equal('1,2,abc');
    });
  });
  describe(".createCall() on an array of instance endpoints", function(){
    var lsResponse;
    var testEntityRoot = 'Order';
    var testEntityInstances = ['8','10','12','abc'];
    var testEntity = {};
    testEntity[testEntityRoot] = testEntityInstances;
    console.log(testEntity);
    this.timeout(0);

    before(function (done) {
      ls.createCall('get',
                    testEntity,
                    {params:{limit:1,load_relations:"all"}},
                    function(res){
                      lsResponse = res;
                      console.log(lsResponse);
                      done();
                    });
    });
    it("should return a response with correct length array of resources", function() {
      expect(lsResponse[testEntityRoot].length).to.equal(4);
    });
    it("should return all valid resources requested and an empty record for invalid resources", function() {
      expect(_.isEmpty(lsResponse[testEntityRoot]['8'])).to.be.false;
      expect(_.isEmpty(lsResponse[testEntityRoot]['abc'])).to.be.true;
    });
  });
});
