// return an Integer equal to id of last tweet in db

var dbQuery = require('./query');
var sql = require('sql');
var lastTweet;

module.exports = function(cb) {

  var sql = {
    text: 'SELECT COUNT(*) FROM "tweets"'
  };

  lastTweet = dbQuery(sql, function(err, data){
    if(err) return console.error(err);
    cb(null, data.rows[0].count);
  });
}

// TEST ==============================

if(process.argv[1] === __filename) {

  module.exports(function(err, lastTweetID) {
    if(err) return console.error(err);
    console.log(lastTweetID);
    process.reallyExit();
  })
}
