

"use strict";

exports.name = 'reduceWith-analyzer';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'reduceWith_best',
		speedup: 3.48
	},
	'ff': {
		best: 'reduceWith_best',
		speedup: 55.87
	},
	'chrome': {
		best: 'reduceWith_best',
		speedup: 89.72
	}
};

exports.analyze = function (syntax, reporter, platform) {
	syntax.traverse(function (node, key, parent) {
		if(node.type == 'WithStatement'){
			var startLocation = node.loc.start;
			reporter.log (startLocation.line, startLocation.column + 1, exports.name, exports.bests, 'find with statement');
		}
	});
};