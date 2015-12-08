var assign = require('lodash/object/assign');
var Constants = require('../utils/constants');
var scriptsDir = require('app-root-path') + '/scripts';
var scripts = [];
var Socket;

require('fs').readdirSync(scriptsDir).forEach(function(file) {
  scripts.push(require(scriptsDir + '/' + file));
});

function Bot (server) {
  this.io = require('socket.io')(server);
}

assign(Bot.prototype, {

  configure: function () {
    var self = this;
    this.io.on('connection', function (s) {
      Socket = s;
      Socket.on('message', function (text) {
        var foundMatch = false;
        for (var i = 0; i < scripts.length; i++) {
          if (self.checkForMatch(scripts[i], text)) {
            foundMatch = true;
            break;
          }
        }
        if (!foundMatch) {
          self.respond(Constants.NO_MATCH_MESSAGE);
        }
      });
    });
  },

  checkForMatch: function (script, text) {
    script.respond = this.respond;
    var matches = text.match(script.pattern);
    var matchExists = (matches != null);
    if (matches != null) {
      script.onMatch(matches, text);
      return true;
    }
    return false;
  },

  respond: function (text) {
    Socket.emit('response', text);
  }

});

module.exports = Bot;