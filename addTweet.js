var conString = (process.env.DATABASE_URL || "postgres://apprentice@localhost/source_develpoment")
var addTweet = new pg.Client(conString);

var tweet = require('/tweets')

module.exports = function(newTweet) {
  tweet.create(newTweet, function(err, results) {
    if(err) {
      console.log("Nothing was created");
    }
    else {
      console.log('tweet created');
      console.log('results');
    }
  })
}
