var app = require('http').createServer(handler)
, io = require('socket.io').listen(app)
, xml2js = require('xml2js')
, parser = new xml2js.Parser()
, fs = require('fs');

app.listen(8000);

function handler (req, res) {
    fs.readFile( __dirname + '/client.html' , 
    function (err, data) {
    	if ( err) {
	    console.log(err);
	    res.writeHead(500);
	    return res.end( 'Error loading client.html' );
	    }
	res.writeHead( 200 );
	res.end ( data );
	});
};

io.sockets.on( 'connection', function ( socket ) {
    console.log(__dirname);

    fs.watch( _dirname + '/example.xml', function ( curr, prev) {
	fs.readFile( __dirname + '/example.xml', function ( err, data) {
	    if ( err ) throw err;
	    parser.parseString( data);
	    });
	});

    parser.addListener('end', function( result ) {

	result.time = new Date();
	socket.volatile.emit( 'notification', result );
	});
    });
