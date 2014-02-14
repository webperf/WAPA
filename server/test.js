(function(){
var fs = require('fs');
var path = require('path');
var os = require('os');
var unzip = require('unzip');
var Tempdir = require('temporary/lib/dir');
var Tempfile = require('temporary/lib/file');
var wrench = require('wrench');
var http = require('http');
var wapa = require('../analyzers/wapa');
var express = require('express');
var app = express();

var UPLOAD_DIR = os.tmpDir() + '/wapa_uploads';
// create upload folder in case of not exists
fs.mkdir(UPLOAD_DIR);
console.log("TEST.js");
app.configure(function(){
	app.set('port', 8100);
	app.use(express.favicon());
	// set static files directory
	app.use(express.static(__dirname + '/static'));
	// set upload directory
	app.use(express.bodyParser({ keepExtensions: true, uploadDir: UPLOAD_DIR }));
	// // enable session
	// app.use(express.cookieParser('2do2die9#-wje;x2=3'));
	// app.use(express.session());
});


app.listen(8888);
/*http.createServer(app).listen(app.get('port'), function(){
	console.log('Listening on port %d', app.get('port'));
});*/


}());