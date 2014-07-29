

$(document).ready(function () {
  var counter = 0;
  var socket = window.socket;

  // socket.emit()

  socket.on('sendTweets', function(data) {
    console.log("streaming tweet #" + counter + "...")
    processTweet(data);
    counter++;
  });

})
