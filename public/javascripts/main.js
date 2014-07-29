

$(document).ready(function () {

  var socket = window.socket;

  socket.on('sendTweets', function(data) {
    processTweet(data);
  });

})
