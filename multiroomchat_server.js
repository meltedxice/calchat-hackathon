var url = require('url');
var pathname = "default";
var fs = require('fs');
var server = require('http').createServer(function(req, response){
  fs.readFile(__dirname+'/multiroomchat.html', function(err, data){
    response.writeHead(200, {'Content-Type':'text/html'}); 
    response.write(data);  
    if (url.parse(req.url).pathname != "/favicon.ico"){
      pathname = url.parse(req.url).pathname;
    }
      everyone.now.setValue = function () {
      this.now.path = pathname;
  }
    response.end();
  });
});
server.listen(8080);


var nowjs = require("now");
var everyone = nowjs.initialize(server);


nowjs.on('connect', function(){
  this.now.room = pathname; //dynamically assign based on route
  //console.log("pathname after assignment:" + pathname);
  nowjs.getGroup(this.now.room).addUser(this.user.clientId);
  console.log(this.now.name + " has joined " + this.now.room);
});


nowjs.on('disconnect', function(){
  console.log(this.now.name + " has left the chat");
});

everyone.now.changeRoom = function(newRoom){
  nowjs.getGroup(this.now.room).removeUser(this.user.clientId);
  nowjs.getGroup(newRoom).addUser(this.user.clientId);
  this.now.room = newRoom;
  this.now.receiveMessage("SERVER", "You're now in " + this.now.room);
}

everyone.now.distributeMessage = function(message){
  nowjs.getGroup(this.now.room).now.receiveMessage(this.now.name, message);
};
