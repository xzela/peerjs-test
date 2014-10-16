var PeerServer = require('peer').PeerServer;
var server = new PeerServer({port: 3001, path: '/foo', key: 'fun'});

server.on('connection', function (id) {
	console.log('connecting', id);
});

server.on('disconnect', function (id) {
	console.log('disconnecting', id);
});
