/**
 * Earthshaking Data API
 *
 * @author    Scott Trinh <scott@scotttrinh.com>
 * @since     04/26/2014
 */

var ls = require('./lightspeed');
var _ = require('lodash');

var earthshaking = (function() {
  
  // public methods
  var orders = {
    get: function(opt_options, callback) {
      /**
       * Returns order resource(s). If only a function is passed, method
       * assumes that the caller desires last order modified
       * 
       * @param opt_options.query {object literal} will be stringified in get_
       *     and passed in the query string of the API call
       * @param opt_options.resource {array} resource ID of requested resource
       * @param {orders~getCallback} callback that handles the response
       */

      if (typeof(opt_options) === 'function') {
        callback = opt_options;
        opt_options = {query:{limit: 1, orderby_desc: 'timeStamp'}};
      }

      get_(false, opt_options.resource, opt_options.query, function(res){
        callback(arrayToHypermedia_(res));
      });
    }
  };

  // private methods
  /** @private */
  var get_ = function Get(isLocal, resource, query, callback) {
    /**
     * Create a GET request for a resource either to the local API
     * or LightSpeed API
     * 
     * @param isLocal {boolean} if true, it should set up a object call to local
     *     database
     * @param resource {array} resource(s) to be requested from server
     * @param query {object} object to stringify that will be passed
     *     along to pathBuilder
     * @param {Get} callback - callback that handles the response
     * 
     * @todo Write the local database call
     */
     
    var response = [];

    _(resource).forEach(function(resource) {

      if (isLocal) {
        // TODO: Do local database call here
      } else {
        ls.createCall('get', resource, query, function(res){
          response.push(res);
        });
      }
    });
    
    callback(response);

  };


  var post_ = function Post(domain, resource, options) {};
  var delete_ = function Delete(domain, resource) {};
  var patch_ = function Patch(domain, resource, changes) {};
  var options_ = function Options(domain, resource) {};
  
  var arrayToHypermedia_ = function(arr) { return arr; };

  return {
    // calls to local data
    receivingLogs: receivingLogs,

    // calls to LightSpeed data
    orders: orders,
    items: items,
    customers: customers,
    vendors: vendors,
    
  };
  
  
})();

module.exports = earthshaking;
