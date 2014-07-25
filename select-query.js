var pg = require('pg')
var conString = (process.env.DATABASE_URL || "postgres://apprentice@localhost/hashtag_dev");

module.exports = function(sql, cb) {
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query(sql, function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) return cb(err)

      cb(null, result.rows[0].number);
      //output: 1
    });
  });
}



if(process.argv[1] === __filename) {
  module.exports('SELECT * from tweets', function(err, data) {
    if(err) return console.error(err);
    console.log(data);
  })
}
