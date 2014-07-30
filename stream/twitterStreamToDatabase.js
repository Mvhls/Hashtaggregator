// Handles the whole process of streaming from twitter to the database
var twitterStream = require('./twitterStream');
var createTweet = require('./createTweet');
var objectifyTweet = require('./objectifyTweet');
var messenger = require('../messenger');
var stream;


module.exports = function(hashtag) {
  twitterStream(hashtag, function(err, theStream) {
    stream = theStream;
  });

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

  // memory leak risk
  messenger.on('destroy', function() {
    stream.stop();
  })
};
