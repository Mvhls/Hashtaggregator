var selectQuery = require('./select-query')
var sql = require('sql')
var tweetTable = require('./schema')
var tweetSQL = sql.define({
  name: tweetTable.name,
  columns: tweetTable.columns
});

module.exports = function(cb) {

  var oldTime = new Date() - 10000
  var checkTime = new Date(oldTime).toString()
  console.log(checkTime)

  var query = tweetSQL
    .select('*')
    .from(tweetSQL)
    .where(
      tweetSQL.created_at.gt(checkTime)
    ).toQuery()

  var results = selectQuery(query)
  console.log(query)
  console.log("iamhere")
  return results
  console.log(results)

  if(err) return cb(err)

  cb(null, "tweets found");

}

if(process.argv[1] === __filename) {

  module.exports( function(err, results) {
    if(err) return console.error(err);
    console.log(results);
  })
}
