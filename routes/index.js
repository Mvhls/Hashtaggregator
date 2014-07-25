var express = require('express');
var keys = require('../keys');
var Twit = require('twit');
var router = express.Router();
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

 // GET home page.
router.get('/', function(req, res) {

	// stream.on('tweet', function(tweet) {
 //    console.log(tweet)
    
 //  });

  res.render('index', {
    title: 'Stuville'//, t_weet: t_weet
  });
});

module.exports = router;
