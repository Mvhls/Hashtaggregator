var express = require('express');
var router = express.Router();
var runStream = require('../stream/twitterStreamToDatabase');
var placeholder = require('../stream/hashtag');

 // GET home page.
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Hashtaggregator'
  })
})

router.get('/new-tag', function(req, res) {
  res.render('change', {
    title: 'pick a new hashtag'
  })
})

router.post('/new-tag', function(req, res) {
  res.redirect
})

module.exports = router;
