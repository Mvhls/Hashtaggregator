module.exports = function(db, callback) {
  db.define('tweets', {
      username    : { type: "text" },
      content     : { type: "text" },
      longitude   : { type: "number" },
      latitude    : { type: "number" },
      twitter_id  : { type: "text" },
      location    : { type: "text" },
      stars       : { type: "integer" }
  });
}
