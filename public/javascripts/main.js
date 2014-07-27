// $(document).ready(function () {

  var server = io.connect();

  console.log('loading main.js')

  server.on('connect', function(data) {
    console.log(data);
    // server.emit('connection', handle, chatroom);
  });

// }
