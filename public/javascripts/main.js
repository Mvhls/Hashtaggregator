

$(document).ready(function () {

  var socket = window.socket;

  socket.on('sendTweets', function(data) {
    processTweet(data);
  });

})

// var app = angular.module('app', ['ngRoute', 'leaflet-directive']);
