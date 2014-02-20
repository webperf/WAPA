

/**
 *
 *	在使用eval()函数的时候给出提示
 *
 *	function exec(code){
 *		eval(code);
 *	}
 *
 */

"use strict";

exports.name = 'reduceEval-analyzer';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'reduceEval_best',
		speedup: 3.17
	},
	'ff': {
		best: 'reduceEval_best',
		speedup: 2.36
	},
	'chrome': {
		best: 'reduceEval_best',
		speedup: 1.16
	}
};

exports.analyze = function (syntax, reporter, platform) {
	syntax.traverse(function (node, key, parent) {
		if(node.type == "CallExpression" && node.callee.type == "Identifier" && node.callee.name === "eval"){
			var startLocation = node.loc.start;
			reporter.log (startLocation.line, startLocation.column + 1, exports.name, exports.bests, 'find low performance api: ' + node.callee.name);
		}
	});
};