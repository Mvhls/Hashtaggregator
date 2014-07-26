var express = require('express');
var router = express.Router();
var stream = require('../start-stream')


 // GET home page.
router.get('/', function(req, res) {

  res.render('index', {
    title: 'Stuville | Hashtaggregator'
  });

});

module.exports = router;
