// Query database for new tweets every ten seconds, and return any that exist

// var io = require('socket.io').listen(server);
// var server = io.connect();
var dbQuery = require('./query');
var sql = require('sql');
// var lastTweet = require('./lastTweet'); //returns an integer

module.exports = function(err, cb) {
  if(err) return cb(err);

  var query = {
    text: 'SELECT * FROM "tweets"'
  };

  var results = dbQuery(query, function(err, data) {
    // newLastTweet = data.rows[data.rows.length - 1].id;
    // server.emit('newLastTweet', newLastTweet);
    geoTweets = []
    data.rows.forEach(function(tweet) {
      if (tweet.latitude) geoTweets.push(tweet);
    })
    cb(null, geoTweets);
  });
}



// TEST ===========================================

if(process.argv[1] === __filename) {
  module.exports(null, function(err, results) {
    if(err) return console.error(err);
    console.log(results);
    process.reallyExit();
  });
};
