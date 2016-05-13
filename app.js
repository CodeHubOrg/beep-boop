var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require("path");

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

io.on('connection', function(socket){
  console.log('a robot connected');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
    console.log('emit:message: ' + msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
