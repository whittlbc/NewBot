
module.exports = {

  pattern: /hey/i,

  onMatch: function (matches, text) {
    var Uber = this.services.Uber;
    var uber = new Uber();

    this.respond('HEARD A MATCH!');
  }

};