module.exports = {
  pattern: /Maggie/i,
  onMatch: function (matches, text) {
    this.respond('The girl I love!');
  }
}