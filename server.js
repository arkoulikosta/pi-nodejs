var port = 8080;
var Gpio = require('onoff').Gpio;
var sleep = require('sleep');
var LED = new Gpio(4, 'out');
var read_pin_1 = new Gpio(18, 'in');

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
	console.log('new user');
	io.emit('pin_status', read_pin_1.readSync());
	console.log('pin_status' + read_pin_1.readSync());
	
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
		LED.writeSync(1);
		sleep.msleep(70);
		LED.writeSync(0);
	});
	
	
	setInterval(function(){
	io.emit('pin_status', read_pin_1.readSync());
	//console.log('pin_status' + read_pin_1.readSync());
	}, 500);
	
});

