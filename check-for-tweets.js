var selectQuery = require('./select-query')
var sql = require('sql')
var tweetTable = require('./schema')
var tweetSQL = sql.define({
  name: tweetTable.name,
  columns: tweetTable.columns
});

module.exports = function(cb) {
  var oldTime = new Date() - 5000
  var checkTime = new Date(oldTime)

  query = tweetSQL
    .select('*')
    .where(
      tweetSQL
      .created_at
      .isGreaterThan(
        (checkTime)
      )
    ).toQuery()
  var results = selectQuery(query)
  console.log("iamhere")
  return results
  console.log(results)

  if(err) return cb(err)

  cb(null, "tweet created");

}

if(process.argv[1] === __filename) {

  module.exports( function(err, results) {
    if(err) return console.error(err);
    console.log(results);
  })
}
