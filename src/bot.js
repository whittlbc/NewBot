var assign = require('lodash/object/assign');
var fs = require('fs');
var Constants = require('../utils/constants');
var appDir = require('app-root-path');
var scriptsDir = appDir + '/scripts';
var scripts = [];
var servicesDir = appDir + '/services';
var services = {};
var Socket;

// populate array of user-created scripts
fs.readdirSync(scriptsDir).forEach(function(file) {
  scripts.push(require(scriptsDir + '/' + file));
});

// populate hash of 3rd-party services
fs.readdirSync(servicesDir).forEach(function(file) {
  var name = file.replace(/.js/, '');
  services[name] = require(servicesDir + '/' + file);
});

console.log(services);

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
    script.services = services;
    var matches = text.match(script.pattern);
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