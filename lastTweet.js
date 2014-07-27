var server = io.connect();

server.on('lastTweet', function(lastTweetIDNumber) {
  module.exports = lastTweetIDNumber;
})
