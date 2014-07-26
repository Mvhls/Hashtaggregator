// Query database for new tweets every ten seconds, and return any that exist

var dbQuery = require('./query')
var sql = require('sql')
// GLOBAL VAR
lastTweet = 100000;

module.exports = function(err, cb) {
  if(err) return cb(err);

  // var oldTime = new Date() - 10000;
  // var checkTime = new Date(oldTime).toString();
  // console.log(checkTime);
  console.log(lastTweet);

  var query = {
    text: 'SELECT * FROM "tweets" WHERE ("tweets"."id" = $1)',
    values: [ lastTweet ]
  };


  // var query = tweetSQL
  //   .select('*')
  //   .from(tweetSQL)
  //   .where(
  //     tweetSQL.created_at.gt(checkTime)
  //   ).toQuery()

  var results = dbQuery(query, cb);
  // console.log(query)
  console.log("line 31");
  // if (results) return results;
  console.log(results);


  cb(null, results);

}

if(process.argv[1] === __filename) {

  module.exports(null, function(err, results) {
    if(err) return console.error(err);
    console.log(results);
  });
};
