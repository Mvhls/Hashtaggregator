// Function that connects to and queries the database with the sql statement passed to it

var pg = require('pg')
var conString = (process.env.DATABASE_URL || "postgres://apprentice@localhost/source_development");
console.log(process.env.DATABASE_URL);

module.exports = function(sql, cb) {
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }

    client.query(sql, function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) return console.error(err)
      cb(null, result);
    });
  });
}

// TEST ================================

if(process.argv[1] === __filename) {

  module.exports({text: 'INSERT INTO "tweets" ("username") VALUES ($1)', values: ['234']}, function(err, data) {
    if(err) return console.error(err);
    console.log(data.rows);

    module.exports('SELECT * from tweets', function(err, data) {
      if(err) return console.error(err);
      console.log(data.rows);
    })
  })
}
