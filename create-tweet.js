var selectQuery = require('./select-query')

var sql = require('sql')

var tweetTable = require('./schema')
var tweetSQL = sql.define({
  name: tweetTable.name,
  columns: tweetTable.columns
});

module.exports = function(tweet, cb) {

  var query = tweetSQL.insert(tweet).toQuery()

  // tweetSQL
  //   .select('*')
  //   .where(
  //     tweetSQL
  //     .created_at
  //     .isGreaterThan(
  //       new Date().getTime()
  //     )
  //   ).toQuery()



  console.log(query)

  selectQuery(query, function(err, result) {

      if(err) return cb(err)

      cb(null, "tweet created");
      //output: 1
    });
}

if(process.argv[1] === __filename) {
    var tweetToStuff = {
    username: 'Bob'
  , content: 'Havashava'
  , longitude: 70.5
  , latitude: 80.4
  , twitter_id: '312423'
  , location: 'chicago, il'
  , stars: 1
  }

  module.exports(tweetToStuff, function(err, data) {
      if(err) return console.error(err);
      console.log(data);
  })
}
