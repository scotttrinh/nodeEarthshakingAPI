/**
 * Earthshaking Data API
 *
 * @author    Scott Trinh <scott@scotttrinh.com>
 * @since     04/26/2014
 */

var ls = require('./lightspeed');
var _ = require('lodash');

var earthshaking = {
  orders: {
    get: function get(entity, query, callback) {
      if (_.isUndefined(entity) || _.isUndefined(query)) {
        entity = "";
        query = {};
      }
      ls.createCall('get','Order' + entity, query, function(res){
        callback(res);
      });
    },
  },
};

module.exports = earthshaking;
