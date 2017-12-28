var port = 8080;
var Gpio = require('onoff').Gpio;
var sleep = require('sleep');
var write_pin_1 = new Gpio(4, 'out');
var write_pin_2 = new Gpio(17, 'out');
var write_pin_3 = new Gpio(27, 'out');
var write_pin_4 = new Gpio(22, 'out');
var write_pin_5 = new Gpio(5, 'out');
var write_pin_6 = new Gpio(6, 'out');
var write_pin_7 = new Gpio(13, 'out');
var write_pin_8 = new Gpio(19, 'out');
var write_pin_9 = new Gpio(26, 'out');

var read_pin_1 = new Gpio(18, 'in');
var read_pin_2 = new Gpio(23, 'in');
var read_pin_3 = new Gpio(24, 'in');
var read_pin_4 = new Gpio(25, 'in');
var read_pin_5 = new Gpio(12, 'in');
var read_pin_6 = new Gpio(16, 'in');
var read_pin_7 = new Gpio(20, 'in');
var read_pin_8 = new Gpio(21, 'in');


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

//app.get('/test.js', function(req, res){
//	res.sendFile(__dirname + '/test.js');
//	console.log('new request');
//});

io.on('connection', function(socket){
	
	//socket.on('led', function(msg){
	//	console.log('func1');
	//	write_pin_1.writeSync(msg);
	//	io.emit('led', write_pin_1.readSync());
	//	sleep.msleep(200);
		
	//	console.log('entered led event ' + msg);
	//	io.emit('led', write_pin_1.readSync());
	//	console.log('emited ' + write_pin_1.readSync());
	//});
	
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
		else if (msg === 3){
			write_pin_3.writeSync(1);
			sleep.msleep(70);
			write_pin_3.writeSync(0);
		}	
		else if (msg === 4){
			write_pin_4.writeSync(1);
			sleep.msleep(70);
			write_pin_4.writeSync(0);
		}	
		else if (msg === 5){
			write_pin_5.writeSync(1);
			sleep.msleep(70);
			write_pin_5.writeSync(0);
		}	
		else if (msg === 6){
			write_pin_6.writeSync(1);
			sleep.msleep(70);
			write_pin_6.writeSync(0);
		}	
		else if (msg === 7){
			write_pin_7.writeSync(1);
			sleep.msleep(70);
			write_pin_7.writeSync(0);
		}	
		else if (msg === 8){
			write_pin_8.writeSync(1);
			sleep.msleep(70);
			write_pin_8.writeSync(0);
		}
		else if (msg === 9){
			write_pin_9.writeSync(1);
			sleep.msleep(70);
			write_pin_9.writeSync(0);
		}	
	});
	
});

setInterval(function(){
	
	io.emit('pin_status', read_pin_1.readSync(), "1");
	io.emit('pin_status', read_pin_2.readSync(), "2");
	io.emit('pin_status', read_pin_3.readSync(), "3");
	io.emit('pin_status', read_pin_4.readSync(), "4");
	io.emit('pin_status', read_pin_5.readSync(), "5");
	io.emit('pin_status', read_pin_6.readSync(), "6");
	io.emit('pin_status', read_pin_7.readSync(), "7");
	io.emit('pin_status', read_pin_8.readSync(), "8");
	
	//console.log('pin_status' + read_pin_2.readSync()+ Date());

}, 1000);
