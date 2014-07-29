// Handles the whole process of streaming from twitter to the database
var twitterStream = require('./twitterStream');
var createTweet = require('./createTweet');
var objectifyTweet = require('./objectifyTweet');

module.exports = function(hashtag) {
  var stream = twitterStream(hashtag);
  // if (err) return cb(err);
  stream.on('tweet', function(tweet) {
    objectifyTweet(tweet, function(err, tweetObject) {
      if (err) return console.error(err);
      if (tweetObject.username) {
        createTweet(tweetObject, function(err, data) {
          console.log(data);
        })
      }
    })
  });
};
