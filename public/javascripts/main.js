$(document).ready(function () {
  var socket = window.socket;

  console.log('loading main.js');

  socket.on('sendTweets', function(data) {
    console.log(data);
  });

})
