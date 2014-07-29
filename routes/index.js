var express = require('express');
var router = express.Router();
var killStream = require('../stream/killStream');
var runStream = require('../stream/twitterStreamToDatabase');
var placeholder = require('../stream/hashtag');

 // GET home page.
router.get('/', function(req, res) {

  res.render('index', {
    title: 'Hashtaggregator',
    oldHashTag: placeholder
  });
});

// router.post('/hashtag', function (req, res) {
//   var hashtag = req.body.params
//   // killStream();
//   runStream(hashtag);
//   // figure out what response to send here...back to the client
//   return hashtag
// })

module.exports = router;
