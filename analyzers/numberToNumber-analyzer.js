

"use strict";

exports.name = 'numberToNumber-anlayzer';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'numberToNum_best',
		speedup: 23.51
	}
};

exports.analyze = function (syntax, reporter, platform) {
	syntax.traverse(function (node, key, parent) {
		if(node.type == "CallExpression" && node.callee.type == "Identifier" && node.callee.name === "Number"){
			var startLocation = node.loc.start;
			reporter.log (startLocation.line, startLocation.column + 1, exports.name, exports.bests, 'find low performance api to convert string to number: ' + node.callee.name);
		}
	});
};