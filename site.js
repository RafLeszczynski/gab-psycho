require('newrelic');

var connect = require( 'connect' ),
	http = require( 'http'),

	port = Number( process.env.PORT || 5000 ),
	root = '/public',
	faviconPath = '/assets/images/favicon.ico';

http.createServer(
	connect()
		.use( connect.favicon( __dirname + root + faviconPath, { maxAge: 2628000000 } ) )
		.use( connect.logger() )
		.use( connect.compress() )
		.use( connect.static( __dirname + root, { redirect: true, maxAge: 2628000000 } ) )
).listen( port, function() {
	console.log( 'Listening on port: ' + port );
} );
