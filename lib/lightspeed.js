/**
 * LightSpeed API Wrapper
 * 
 * @author  Scott Trinh <scott@scotttrinh.com>
 * @since   04/25/2014
 */

var _ = require("lodash");
var format = require("util").format;
var rest = require("restler");
var querystring = require("querystring");


var REST_ROOT = 'https://api.merchantos.com/API/Account/' +
                process.env.LS_ACCOUNT + '/';
var API_KEY = process.env.LS_API_KEY;


var lightspeed = {

  createCall: function(method, entity, options, callback){
    // TODO: Create entity parser to create multiple calls if passed an
    //   array-like string (ex. entity === 'Order/1,2,3,6,8')
    options = (options === undefined) ? {} : options;
    options.username = API_KEY;
    options.password = "apikey";
    url = this._pathBuilder(entity, options.params);
    this._request(method, url, options, callback);
  },
  _request: function(method, url, options, callback) {
    var allowedMethods = ['get','post','put','patch','delete'];
    if (allowedMethods.indexOf(method) > -1) {
      rest[method](
        url,
        options
      ).on('complete', function(result, response) {
        if (response.statusCode === 503) {
          this.retry(1000);
        } else {
          callback(result);
        }
      });
    } else {
      throw "Method not allowed" + parameters.method;
    }
  },
  _pathBuilder: function(entity, params) {
    return REST_ROOT + entity + ".json" + "?" + querystring.stringify(params);
  },


} // lightspeed object end


module.exports = lightspeed;
