var port = 8080;
var Gpio = require('onoff').Gpio;
var sleep = require('sleep');
var LED = new Gpio(4, 'out');

var app = require('express')();
var http = require('http').Server(app);
http.listen(port, function(){
	console.log('listening on port:' + port);
});

var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
	console.log('new request');
});


io.on('connection', function(socket){
	//socket.emit();
	//console.log('new user');
	socket.on('led', function(msg){
		console.log('func1');
		LED.writeSync(msg);
		io.emit('led', LED.readSync());
		sleep.msleep(200);
		//LED.writeSync(0);
		
		console.log('entered led event ' + msg);
		io.emit('led', LED.readSync());
		console.log('emited ' + LED.readSync());
	});
	
	socket.on('set_pin', function(msg){
		console.log('set_pin: ' + msg);
		LED.writeSync(msg);
		sleep.msleep(70);
		LED.writeSync(0);
	});
});

