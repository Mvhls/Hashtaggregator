// Connect to Twitter Streaming API and return constant stream of JSON objects

var keys = require('../keys');
var Twit = require('twit');

var T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
});

module.exports = function(err, cb) {
  if(err) return cb(err)
  var stream = T.stream('statuses/filter', {
    track: require('./hashtag')
  });
  return stream;
};
