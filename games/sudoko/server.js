/**
 * Server node js for computing Sudoku logic.
 * 
 */

var events = require('events'),
	http = require('net'),
	port = 8123;

net.createServer(function(socket) {
	console.log('new client connected');
	
	socket.on('data', function(data) {
        console.log('Data received from client : '+data);
    });
    
	socket.on('close', function(data) {
        console.log('A client disconnected');
    });
     
}).listen(port, 'localhost');

console.log('server starting on ' + port);
