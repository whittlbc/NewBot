var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('newTest');
var index = require('./routes/index');
var code = require('./routes/code');
var token = require('./routes/token');

var Bot = require('./src/bot');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'client'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

// set up middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));

// set up routes
app.use('/', index);
app.use('/code', code);
app.use('/token', token);

// create and start server
var server = app.listen(app.get('port'), function () {
  console.log('Listening on 3000');
});

var bot = new Bot(server);
bot.configure();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
