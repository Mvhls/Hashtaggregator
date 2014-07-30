
module.exports = function(hashtag, tweets, cb) {
  filteredTweets = [];
  tweets.forEach(function(tweet) {
    console.log(tweet);
    console.log(hashtag);

    if (tweet.content.toLowerCase().indexOf(hashtag.toLowerCase()) > -1) {
      filteredTweets.push(tweet);
    }
    cb(null, filteredTweets);
  })
}

// TEST ==============================

// write it
