$(document).ready(function () {
  var socket = window.socket;

  console.log('loading main.js');

  console.log(createTweetObject);
  socket.on('sendTweets', function(data) {
    createTweetObject(data);
  });

})
