/**
 * LightSpeed API Wrapper
 *
 * @author  Scott Trinh <scott@scotttrinh.com>
 * @since   04/25/2014
 */

var _           = require("lodash");
var rest        = require("restler");
var querystring = require("querystring");


var REST_ROOT   = 'https://api.merchantos.com/API/Account/' +
                  process.env.LS_ACCOUNT + '/';
var API_KEY     = process.env.LS_API_KEY;


var lightspeed  = {

  createCall: function(method, entity, options, callback){
    options = (_.isUndefined(options)) ? {} : options;
    options.username = API_KEY;
    options.password = "apikey";
    var url = this._pathBuilder(entity, options.params);
    this._request(method, url, options, callback);
  },
  firstLetterLower: function(str) {
    return str.substr(0,1).toLowerCase() + str.substr(1);
  },

  _request: function(method, url, options, callback) {
    var allowedMethods = ['get','post','put','patch','delete'];
    var me = this;
    if (allowedMethods.indexOf(method) > -1) {
      rest[method](
        url,
        options
      ).on('complete', function(result, response) {
        if (response.statusCode === 503) {
          this.retry(1000);
        } else {
          callback(me._collectionToArray(result, url));
        }
      });
    } else {
      throw "Method not allowed" + method;
    }
  },

  _pathBuilder: function(entity, params) {
    if (_.isUndefined(params.load_relations)) {
      params.load_relations = "all";
    }

    return REST_ROOT + entity + ".json" + "?" + querystring.stringify(params);
  },
  _collectionToArray: function cta(resource, url) {
    /**
     *
     */
    var me = this;
    _.forIn(resource, function(value, key){
      if (key !== "@attributes"
          && key !== "href"
          && _.isArray(value) === false) {
        resource[key] = [value];
        var resourceID = me.firstLetterLower(key) + 'ID';
        _.forIn(resource[key], function(resourceValue, resourceKey) {
          resource[key][resourceKey].href = REST_ROOT + key + '/' + resource[key][resourceKey][resourceID] + '.json';
        });
      }
    });
    resource = this._addHate(url, resource);
    return resource;
  },
  _addHate: function hate(url, resource) {
    resource.href = url;
    return resource;
  },


}; // lightspeed object end

module.exports = lightspeed;
