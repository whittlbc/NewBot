var express = require('express');
var router = express.Router();

// here for index.ejs rendering
router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;
