var express = require('express');
var router = express.Router();
var killStream = require('../stream/killStream');
var runStream = require('../stream/runStream');


 // GET home page.
router.get('/', function(req, res) {

  res.render('index', {
    title: 'Hashtaggregator'
  });
});

router.post('/hashtag', function (req, res) {
  killStream();
  runStream(hashtag);
  // figure out what response to send here...back to the client
})

module.exports = router;
