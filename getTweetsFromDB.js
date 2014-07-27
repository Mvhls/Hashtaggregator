// Query database for new tweets every ten seconds, and return any that exist

var server = io.connect();
var dbQuery = require('./query');
var sql = require('sql');
// var lastTweet = require('./lastTweet'); //returns an integer

module.exports = function(err, lastTweetIDNumber, cb) {
  if(err) return cb(err);

  var query = {
    text: 'SELECT * FROM "tweets" WHERE ("tweets"."id" > $1)',
    values: [ lastTweetIDNumber ]
  };

  var results = dbQuery(query, function(err, data) {
    newLastTweet = data.rows[data.rows.length - 1].id;
    server.emit('newLastTweet', newLastTweet);
    cb(null, data.rows);
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
