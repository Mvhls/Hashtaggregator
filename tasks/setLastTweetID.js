var getLastTweetID = require('./getLastTweetID');

module.exports = function(lastTweetID) {
  getLastTweetID(function(err, id) {
    if (err) return console.error(err);
    lastTweetID = id;
  });
}
