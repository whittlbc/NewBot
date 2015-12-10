var assign = require('lodash/object/assign');
var AuthServiceMap = require('./auth_service_map');
var yaml = require('js-yaml');
var fs = require('fs');
var API = yaml.safeLoad(fs.readFileSync('./apis.yml', 'utf8'));


function OAuth (options) {
  options = options || {};
}

assign(OAuth.prototype, {

  loginForService: function (service, cb) {
    var serviceData = API[service];
    var tempCodeData = serviceData.AUTH.CODE;
    var url = tempCodeData.url + '?';
    var params = tempCodeData.PARAMS;
    params.redirect_uri = 'http://localhost:3000/code/' + service.toLowerCase();
    var paramsCount = Object.keys(params).length;

    var i = 0;
    for (var key in params) {
      i++;
      url += key + '=' + params[key];
      if (i < paramsCount) {
        url += '&'
      }
    }

    cb(url);
  }

});

module.exports = new OAuth();

