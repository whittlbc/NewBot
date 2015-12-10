var Service = require('../src/service');
var inherits = require('inherits');
var assign = require('lodash/object/assign');
var Session = require('../src/session');
var OAuth = require('../src/oauth');

function Uber (options) {
  options = options || {};
  this.sessionData = Session.getServiceData('Uber');
}

inherits(Uber, Service);

assign(Uber.prototype, {

  getAccessToken: function (cb) {
    // User doesn't have a session for this service yet, so prompt login
    //if (!this.sessionData) {
      OAuth.loginForService('Uber', function (url) {
        cb(url)
      });
    //}
    // if access token is expired, refresh it and update session data with the new token
    //if (this.accessTokenExpired(this.sessionData.accessToken)) {
    //  this.refreshAccessToken(function (newToken) {
    //    this.sessionData.accessToken = newToken;
    //    Session.saveServiceData('Uber', this.sessionData);
    //    cb(newToken);
    //  });
    //} else {
    //  cb(this.sessionData.accessToken);
    //}
  },

  accessTokenExpired: function () {
    var self = this;

  },

  refreshAccessToken: function () {
    var self = this;

  },

  getHistory: function (cb) {
    this.getAccessToken(function (url) {
      cb(url);
    });
  }

});

module.exports = Uber;

