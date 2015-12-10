var assign = require('lodash/object/assign');
var ls = new require('node-localstorage').LocalStorage('./localStorage');

function Session (options) {
  options = options || {};
}

assign(Session.prototype, {

  getServiceData: function (service) {
    return JSON.parse(ls.getItem(service));
  },

  saveServiceData: function (service, data) {
    ls.setItem(service, JSON.stringify(data));
  }

});

module.exports = Session;

