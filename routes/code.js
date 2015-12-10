var express = require('express');
var router = express.Router();
var Request = require('../src/request');

// TEMP CODE ENDPOINTS

router.get('/uber', function(req, res) {
  var code = req.query.code;
  console.log('CODE: ', code);
  res.render('index');

  //     - url
  //     - Standard params:
  //       - client_id
  //       - redirect_uri
  //       - client_secret?
  //       - code (temp token)
  //     - Special params:
  //       - client_secret
  //       - grant_type

  //Request.get(url, data, {
  //  success: function () {
  //    var self = this;
  //
  //  },
  //  error: function () {
  //    var self = this;
  //
  //  },
  //});

});

module.exports = router;
