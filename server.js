var port = 8080;
var Gpio = require('onoff').Gpio;
var sleep = require('sleep');
var write_pin_1 = new Gpio(4, 'out');
var write_pin_2 = new Gpio(17, 'out');
var read_pin_1 = new Gpio(18, 'in');
var read_pin_2 = new Gpio(23, 'in');

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
	
	socket.on('led', function(msg){
		console.log('func1');
		write_pin_1.writeSync(msg);
		io.emit('led', write_pin_1.readSync());
		sleep.msleep(200);
		
		console.log('entered led event ' + msg);
		io.emit('led', write_pin_1.readSync());
		console.log('emited ' + write_pin_1.readSync());
	});
	
	socket.on('set_pin', function(msg){
		console.log('set_pin: ' + msg);
		
		if (msg===1){
			write_pin_1.writeSync(1);
			sleep.msleep(70);
			write_pin_1.writeSync(0);
		}
		else if (msg === 2){
			write_pin_2.writeSync(1);
			sleep.msleep(70);
			write_pin_2.writeSync(0);
		}
			
	});
	
	
	
});

setInterval(function(){
	
	io.emit('pin_status', read_pin_1.readSync(), "1");
	io.emit('pin_status', read_pin_2.readSync(), "2");
	console.log('pin_status' + read_pin_2.readSync()+ Date());

}, 1000);

