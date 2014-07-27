var dbQuery = require('./query');
var sql = require('sql');
var lastTweet;

module.exports = function(cb) {
  // if(err) return cb(err);
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

// module.exports({text: 'INSERT INTO "tweets" ("username") VALUES ($1)', values: ['234']}, function(err, data) {
    // if(err) return console.error(err);
    // console.log(data.rows);
