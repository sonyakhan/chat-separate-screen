// set up server and import packages

var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// save the users that have entered the chat
var users = [];

app.use(express.static(path.join(__dirname, 'public')));

// set up socket.io
io.on('connection', function(socket){
  console.log('a user connected');

  // gets the users and emits them
  socket.on('get-users', function() {
    socket.emit('all-users', users);
  });

  // triggers when a new user has joined
  socket.on('join', function(data){
      console.log(data);
      console.log(users);
      // adds the new user to the users array declared globally
      socket.nickname = data.nickname;
      users[socket.nickname] = socket; 
      var userObj = {
        nickname: data.nickname,
        socketid: socket.id
    };

    users.push(userObj);
    io.emit('all-users', users);
  });

  socket.on('send-message', function(data) {
      //socket.broadcast.emit('message-received', data);
      io.emit('message-received', data);
  });

  // socket.on('send-like', function(data){
  //     console.log(data);
  //     socket.broadcast.to(data.like).emit('user-liked',data);
  // });

 socket.on('disconnect', function(){
    users = users.filter(function(item) {
        return item.nickname !== socket.nickname;
    });
    io.emit('all-users', users);
  });

});

server.listen(3000, function() {
    console.log('server running on localhost:3000');
});
