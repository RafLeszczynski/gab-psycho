var connect = require( 'connect' ),
	http = require( 'http'),

	port = Number( process.env.PORT || 5000 ),
	root = '/public';

http.createServer(
	connect()
		.use( connect.logger() )
		.use( connect.static( __dirname + root ) ),
	{
		redirect: true
	}
).listen( port, function() {
	console.log( 'Listening on port: ' + port );
} );
