var Uber = require('../services').Uber;

module.exports = {

  pattern: /hey/i,

  onMatch: function (matches, text) {
    var uber = new Uber();
    var self = this;
    uber.getHistory(function (loginURL) {
      self.respond(loginURL);
    });
  }

};