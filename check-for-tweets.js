// Query database for new tweets every ten seconds, and return any that exist

var dbQuery = require('./query')
var sql = require('sql')
// var tweetTable = require('./schema')
// var tweetSQL = sql.define({
//   name: tweetTable.name,
//   columns: tweetTable.columns
// });

module.exports = function(err, cb) {
  if(err) return cb(err);

  var oldTime = new Date() - 10000;
  var checkTime = new Date(oldTime).toString();
  console.log(checkTime);
  var query = {
    text: 'SELECT * FROM "tweets" WHERE ("tweets"."created_at" > $1)',
    values: [ checkTime ]
  }


  // var query = tweetSQL
  //   .select('*')
  //   .from(tweetSQL)
  //   .where(
  //     tweetSQL.created_at.gt(checkTime)
  //   ).toQuery()

  var results = dbQuery(query)
  // console.log(query)
  console.log("iamhere");
  // if (results) return results;
  console.log(results)


  cb(null, results);

}

if(process.argv[1] === __filename) {

  module.exports(null, function(err, results) {
    if(err) return console.error(err);
    console.log(results);
  })
}
