var port = 80;
var Gpio = require('onoff').Gpio;
var iopi = require('../node_modules/iopi/iopi');
var sleep = require('sleep');

var read_bus_1 = new IoPi(0x20);//board 1
var write_bus_1 = new IoPi(0x21);//board 1
var read_bus_2 = new IoPi(0x22);//board 2
var write_bus_2 = new IoPi(0x23);//board 2

var x = 0;

read_bus_1.setPortDirection(0, 0xFF);//read bus 1,port0 = input
read_bus_1.setPortDirection(1, 0xFF);//read bus 1,port1 = input
read_bus_2.setPortDirection(0, 0xFF);//read bus 2,port0 = input
read_bus_2.setPortDirection(1, 0xFF);//read bus 2,port1 = input

read_bus_1.setPortPullups(0, 0x00);
read_bus_1.setPortPullups(1, 0x00);
read_bus_2.setPortPullups(0, 0x00);
read_bus_2.setPortPullups(1, 0x00);

write_bus_1.setPortDirection(0, 0x00);//write bus 1,port0 = output
write_bus_1.setPortDirection(1, 0x00);//write bus 1,port1 = output
write_bus_2.setPortDirection(0, 0x00);//write bus 2,port0 = output
write_bus_2.setPortDirection(1, 0x00);//write bus 2,port1 = output


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
	socket.on('set_pin', function(msg){
		//console.log('set_pin: ' + msg);
		if (msg>=1 && msg<=16){
			write_bus_1.writePin(msg, 1);
			setTimeout(function(){
				write_bus_1.writePin(msg, 0);
			},70);
		}
		else if (msg>16 && msg<=30){
			write_bus_2.writePin(msg-16, 1);
			setTimeout(function(){
				write_bus_2.writePin(msg-16, 0);
			},70);
		}	
	});
});



setInterval(function(){
	
	for (var j = 1; j<=16;j++){
	io.emit('pin_status', read_bus_1.readPin(j), j);	
	}
	for (var j = 17; j<=30;j++){
	io.emit('pin_status', read_bus_2.readPin(j-16), j);	
	}
	
}, 1000);
