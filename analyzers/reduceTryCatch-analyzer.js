

/**
 *	代码中出现try-catch-finally语句时，给出提示
 *
 *	try{
 *		statementsMayThrowExpection();
 *	}catch(ex){
 *
 *	}finally{
 *
 *	}
 *
 */

"use strict";

exports.name = 'reduceTryCatch-analyzer';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'reduceTryCatch_best',
		speedup: 28.45
	},
	'ff': {
		best: 'reduceTryCatch_best',
		speedup: 15.81
	},
	'chrome': {
		best: 'reduceTryCatch_best',
		speedup: 4.99
	}
};

exports.analyze = function (syntax, reporter, platform) {
	syntax.traverse(function (node, key, parent) {
		if(node.type == 'TryStatement'){
			var startLocation = node.loc.start;
			reporter.log (startLocation.line, startLocation.column + 1, exports.name, exports.bests, 'find try-catch-finally statement');
		}
	});
};