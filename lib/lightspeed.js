var _ = require("lodash");
var rest = require("restler");
var querystring = require("querystring");

var lightspeed = {

  get:
    function (entity, options, cb) {
      rest.get(
        process.env.LS_API_URL +
        entity +
        querystring.stringify(options),
        { "username":process.env.LS_API_KEY,
          "password":"apikey" }
      ).on('complete', function(result, response) {
        if (response.statusCode === 503) {
          this.retry(1000);
        } else {
          cb(result);
        }
      });
    },

}

module.exports = lightspeed;
