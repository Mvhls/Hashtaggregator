var express = require('express');
var router = express.Router();
var stream = require('../start-stream')


 // GET home page.
router.get('/', function(req, res) {

  // stream();
  res.render('index', {
    title: 'Stuville'
  });

});

module.exports = router;