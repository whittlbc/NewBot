var Uber = require('../services').Uber;

module.exports = {

  pattern: /hey/i,

  onMatch: function (matches, text) {

    this.respond('HEARD HEY!');

    var uber = new Uber();

    uber.getHistory(function (history) {
      console.log('Got Uber History!', history);
    });
  }

};


// Store all user access tokens in local storage under user_uuid --> ServiceName or DB
// Before making any calls to the server, check if you already have that access token.

  // (1) Exists
  //   (a) Check if needs to be refreshed
  //     (i) still valid
  //       (*) Move On
  //     (ii) expired
  //       (*) Refresh token
  //
  // (2) Doesn't Exist
  //    (a) Make OAuth 2.0 call to login for that person using that services' set of particulars

