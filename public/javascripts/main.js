var app = angular.module( "hashtag", [] );

app.controller(
    "mapController",
    function( $scope, $interval ) {

        $interval(function(){
          $scope.tweets = window.searchArray}, 5000);


    }
);

$(document).ready(function () {
  var counter = 0;
  var socket = window.socket;

  socket.emit('ready', 'client ready');

  socket.on('sendTweets', function(data) {
    console.log("streaming tweet #" + counter + "...")
    processTweet(data);
    counter++;
  });

})
