var _ = require("lodash");
var rest = require("restler");
var querystring = require("querystring");

// Environment Variables used by this module:
// LS_API_KEY: API key assigned by LightSpeed
// LS_ACCOUNT: Account number assigned by LightSpeed

var REST_ROOT = 'https://api.merchantos.com/API/Account/'
                + process.env.LS_ACCOUNT + '/';


var lightspeed = {

  get:
    function (entity, options, cb) {
    },
  post: function(){},
  put: function(){},
  patch: function(){},
  delete: function(){},
  request: function(method, entity, options, callback) {
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
        cb(result);
      }
    });
  },


} // lightspeed object end


module.exports = lightspeed;
