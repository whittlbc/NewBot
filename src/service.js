var assign = require('lodash/object/assign');

function Service (options) {
  options = options || {};
}

assign(Service.prototype, {

  myFunc: function () {
    var self = this;

  }

});

module.exports = Service;

