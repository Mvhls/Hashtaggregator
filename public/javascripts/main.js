var app = angular.module("hashtag", []);
var lastTweetID;

app.controller(
    "mapController",
    function( $scope, $interval ) {

      $interval(function(){
        $scope.tweets = window.searchArray
      }, 5000);
    }
);

$(document).ready(function () {
  var counter = 0;
  var socket = window.socket;

  socket.emit('ready');

  socket.on('sendTweets', function(data) {
    processTweet(data);
    // console.log("streaming tweet #" + counter + "...")
    counter++;
  });

  socket.on('lastTweet', function(id) {
    var lastTweetID = id;
    // console.log('LAST TWEET: ' + lastTweetID)
  })

  setInterval(askForNewTweets, 2000);

  // get moar tweets!
  function askForNewTweets() {
    socket.emit('moarTweets', lastTweetID);
  }


  $('#change-hashtag-form').submit(function(event) {
    // event.preventDefault();
    var hashtag = event.target[0].value
    console.log(hashtag)
    socket.emit('newStream', hashtag);
  })
})
