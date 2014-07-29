

$(document).ready(function () {

  var socket = window.socket;

  socket.on('sendTweets', function(data) {
    console.log("streaming tweet #" + data.id + "...")
    processTweet(data);
  });

})
