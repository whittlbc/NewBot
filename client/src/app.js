define(function(require, module, exports) {
  var io = require('socket.io');
  var socket = io.connect(window.location.origin);

  socket.on('response', function (loginURL) {
    document.location = loginURL;
    console.log(loginURL);
  });

  $('button').click(function () {
    socket.emit('message', $('input').val())
  });

});
