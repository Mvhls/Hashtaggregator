// Handles the whole process of streaming from twitter to the database
var twitterStream = require('./twitterStream');
var createTweet = require('./createTweet');
var objectifyTweet = require('./objectifyTweet');
var stream = twitterStream();

module.exports = function(err, cb) {
  if (err) return cb(err);
  stream.on('tweet', function(tweet) {
    objectifyTweet(tweet, function(err, tweetObject) {
      if (err) return console.error(err);
      createTweet(tweetObject, function(err, data) {
        console.log(data.content);
      })
    })
  });
};
