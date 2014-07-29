module.exports = function streamTweetsToClient(Tweets, Client, Delay) {
  (function streamRemainingTweets() {
      if (Tweets.length) {
          Client.emit('sendTweets', Tweets.pop());
          setTimeout(streamRemainingTweets, Delay);
      }
  })();
}

// not sure how to test this one
// TEST ==============================

// if(process.argv[1] === __filename) {

// tweets = ['tweetle dee', 'tweetle dum'];

//   module.exports(function(tweets, process, 1000) {
//     (function streamRemainingTweets() {
//         if (Tweets.length) {
//             Client.emit('sendTweets', Tweets.pop());
//             setTimeout(streamRemainingTweets, TWEET_SENDING_DELAY);
//         }
//     })();
//   })
//   process.reallyExit();
// }
