var express = require('express');
var keys = require('../keys');
var Twit = require('twit');

var router = express.Router();
// var TweetModel = require('../models/Tweet')
var T = new Twit({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret
});
var stream = T.stream('statuses/filter', {
    track: '#myworstbirthday'
});
var t_weet = "";
var coordinates = [];

 // GET home page.
router.get('/', function(req, res) {

	stream.on('tweet', function(tweet) {
    console.log(tweet.coordinates);
    if (!tweet.coordinates) {
      coordinates = [0, 0];
    } else {
      coordinates = tweet.coordinates;
    }
    var newTweet = {
      username: tweet.user.screen_name,
      content: tweet.text,
      latitude: coordinates[0],
      longitude: coordinates[1],
      twitter_id: tweet.id_str,
      location: tweet.user.location,
      stars: tweet.favorite_count
    }; // = new TweetModel()
    console.log(newTweet)
    Tweet.create(newTweet, function(err, results) {
        if(err) {
            console.log(err)
        }
        else {
            console.log('tweet created');
            console.log(results);
        }
    });
    // console.log(tweet)
  });

  res.render('index', {
    title: 'Stuville', t_weet: t_weet
  });
});

module.exports = router;
