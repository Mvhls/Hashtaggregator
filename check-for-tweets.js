// Query database for new tweets every ten seconds, and return any that exist

var dbQuery = require('./query');
var sql = require('sql');
var lastTweet = require('./lastTweet'); //returns an integer

module.exports = function(err, cb) {
  if(err) return cb(err);

  var query = {
    text: 'SELECT * FROM "tweets" WHERE ("tweets"."id" > $1)',
    values: [ lastTweet ]
  };

  var results = dbQuery(query, function(err, data) {
    lastTweet = data.rows[data.rows.length - 1].id;
    cb(null, data.rows);
  });
}

if(process.argv[1] === __filename) {
  module.exports(null, function(err, results) {
    if(err) return console.error(err);
    console.log(results);
  });
};
