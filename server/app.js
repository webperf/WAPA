(function(){
var fs = require('fs');
var path = require('path');
var os = require('os');
var unzip = require('unzip');
var Tempdir = require('temporary/lib/dir');
var Tempfile = require('temporary/lib/file');
var wrench = require('wrench');
var http = require('http');
var WAPA = require('../wapa/src/wapa').WAPA;
var express = require('express');
var _ = require('../wapa/src/node_modules/underscore/underscore');
var util = require('util');
var app = express();

var UPLOAD_DIR = os.tmpDir() + '/wapa_uploads';
// create upload folder in case of not exists
fs.mkdir(UPLOAD_DIR);

app.configure(function(){
	app.set('port', 8888);
	app.use(express.favicon());
	// set static files directory
	app.use(express.static(__dirname + '/static'));
	// set upload directory
	app.use(express.bodyParser({ keepExtensions: true, uploadDir: UPLOAD_DIR }));
	
});

function extract(file, dest, cb) {
	var extr = unzip.Extract({ path: dest });
	fs.createReadStream(file.path).pipe(extr);
	extr.on('close', function(){cb();});
	extr.on('error', function(e){cb(e);});
}

function analyze(extract_dir, log_file, cb) {

   var platforms = ['ie10','chrome','ff'];
   var wapa = new WAPA({'platforms': platforms});
   var fileLogs=[];
   var last = 0;
  
   wapa.analyzeDirectory(extract_dir, function (err, results) {
   	    //console.log("results:"+results.length);
      	if (err) {
			console.error('Error: %s', err);
			return;
		}
		_.each(results, function (report) {
			var fileLog = {
				"path" : null,
				"msgs" : {},
				"source": null
			};
			fileLog.path = report.name;
			fileLog.source = fs.readFileSync(extract_dir + '/'+ report.name, 'utf-8');
			_.each(wapa.platforms, function(platform){

				var platformReporter = report.filter(platform);

				if(platformReporter.length){
					platformReporter.each(function (log){
				    if(!fileLog.msgs[platform]) fileLog.msgs[platform] = [];
				       fileLog.msgs[platform].push({"line":log.line,"column":log.column,"message":log.msg,"example":WAPA.getFullBest(log.best[platform].best),"speedup":log.best[platform].speedup});
				  });
				}
			});
			fileLogs.push(fileLog);
		});	
        fs.writeFile(log_file, JSON.stringify(fileLogs), cb);
   });
   
}

function removeExtracted(extract_dir) {
	//console.log('Removed extracted files: %s', extract_dir);
	wrench.rmdirRecursive(extract_dir);
}

function analyze_post(req, res) {
	// set to plain text output
	res.set('Content-Type', 'text/plain');

	var app = req.files.app;
	if (app) {
		//console.log('File uploaded to: %s', app.path);

		var extract_dir = (new Tempdir()).path;
		//console.log('Extracting %s to %s', app.path, extract_dir);

		extract(app, extract_dir, function(err){
			fs.unlink(app.path, function(err){
				if (err) console.log(err);
			});
			//console.log('Removed file: %s', app.path);

			if (err) { // error
			//	console.log('error: %s', err);
				res.send(err);
				removeExtracted(extract_dir);
			} else {
				var log_file = (new Tempfile()).path;
				analyze(extract_dir, log_file, function(err, msg) {
					if (err) {
						res.send(err);
					} else {
						var filecode = path.basename(log_file);
						res.send(JSON.stringify({path: '/report.html?filecode='+filecode}));
						// res.redirect('/report.html?filecode='+filecode);
					}
				//	console.log("-------remove------")
					removeExtracted(extract_dir);
				});
			}
		});
	}
}

app.post('/analyze', analyze_post);

function report_get(req, res) {
	var filecode = req.query.filecode;
   // console.log("report_get:"+filecode);
	// set to JSON output
	res.set('Content-Type', 'text/json');
	if (filecode) {
		res.sendfile(os.tmpDir() + '/' + filecode);
		//console.log(os.tmpDir()+'/'+filecode);
	} else {
		error('file not found!');
	}

	function error(err) {
		res.send(JSON.stringify({err: err}));
	}
}

app.get('/report', report_get);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Listening on port %d', app.get('port'));
});
}());