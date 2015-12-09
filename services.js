var servicesDir = require('app-root-path') + '/services';
var Services = {};

require('fs').readdirSync(servicesDir).forEach(function(file) {
  var name = file.replace(/.js/, '');
  Services[name] = require(servicesDir + '/' + file);
});

module.exports = Services;

