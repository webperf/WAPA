

var fs = require('fs');
var util = require('util');
var _ = require('underscore');
var WAPA = require('../wapa').WAPA;

function analyzeFile(wapa, filename, source, type) {
	return wapa.analyze(filename, source, type);
}

function main (filename, platforms) {
	var last = 0;
	var wapa = new WAPA({platforms: platforms});
	util.print('[');
	wapa.analyzeDirectory(filename, function (err, results) {
		if (err) {
			console.error('Error: %s', err);
			return;
		}

		util.print(']\n');
		_.each(results, function (report) {
			_.each(wapa.platforms, function(platform){
				console.log('===================== %s =====================', platform);
				var platformReporter = report.filter(platform);
				platformReporter.each(function (log){
					console.log('%s (%d, %d): %s', filename, log.line, log.column, WAPA.getFullBest(log.best[platform].best));
				});
			});
		});
	}, function (p) {
		p = ~~(p*60);
		for(var i = last; i < p; i++) {
			util.print('=');
		}
		last = p;
	});
}

main(process.argv[2]);
