var path = require('path');
var fs = require('fs');
var app = require('express')();
var PeerServer = require('peer').PeerServer;

var EXPRESS_PORT = 3000,
	PEER_PORT = 3001;

var options = {
	port: PEER_PORT,
	path: '/foo',
	key: 'fun'
};

var server = new PeerServer(options);

var peers = [];

server.on('connection', function (id) {
	peers.push(id);
	console.log('[peer]','connecting peer id:', id);
});

server.on('disconnect', function (id) {
	if (peers.indexOf(id) !== -1) {
		peers.splice(peers.indexOf(id), 1);
	}
	console.log('[peer]', 'disconnecting peer id:', id);
});

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '/public/client.html'));
});

app.get('/peers', function (req, res) {
	console.log('[express]', 'peer', req.url, 'is attempting to fetch peers');
	res.json(peers);
});

app.listen(EXPRESS_PORT, function () {
	console.log('[express]', 'express server listening to:', EXPRESS_PORT);
});
