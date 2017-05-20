// set up server and import packages

var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(path.join(__dirname + '/public')));

// set up socket.io
io.on('connection', function(socket) {
  console.log('a user has connected');

  socket.on('disconnect', function(){
    console.log('a user has disconnected');
  });
});

// set port to 3000
server.listen(3000, function() {
  console.log('server running on localhost:3000');
});
