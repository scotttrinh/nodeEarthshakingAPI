var _ = require("lodash");
var rest = require("restler");
var querystring = require("querystring");

var REST_ROOT = 'https://api.merchantos.com/API/Account/' +
                process.env.LS_ACCOUNT + '/';

var lightspeed = {

  get: function (entity, options, callback) {
    _request('GET', entity, options, callback);
  },
  post: function(){},
  put: function(){},
  patch: function(){},
  delete: function(){},
  _request: function(method, entity, options, callback) {
    switch (method) {
      case 'GET':
        break;
      case 'POST':
        break;
      case 'PUT':
        break;
      case 'PATCH':
        break;
      case 'DELETE':
        break;
    }
    rest.get( // TODO: Make a restler call based on method
    ).on('complete', function(result, response) {
      if (response.statusCode === 503) {
        this.retry(1000);
      } else {
        callback(result);
      }
    });
  },
  _pathBuilder: function(entity, params) {
    return REST_ROOT + entity + querystring.stringify(params);
  },


} // lightspeed object end


module.exports = lightspeed;
