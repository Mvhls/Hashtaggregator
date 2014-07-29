var getLastTweetID = require('./getLastTweetID');

module.exports = function(cb) {
  var lastID;
  getLastTweetID(function(err, id) {
    if (err) return console.error(err);
    lastID = id;
  });
  return lastID;
}

// TEST =========================================

if(process.argv[1] === __filename) {

  module.exports(function (err, id) {
    if (err) return console.error(err);
    return id;
  });
}
