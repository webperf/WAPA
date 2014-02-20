

"use strict";

exports.name = 'parseIntToNumber-analyzer';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'parseIntToNum_best',
		speedup: 25
	}
};

exports.analyze = function (syntax, reporter, platform) {
	syntax.traverse(function (node, key, parent) {
		if(node.type == "CallExpression" && node.callee.type == "Identifier" && node.callee.name == "parseInt"){
			var startLocation = node.loc.start;
			reporter.log (startLocation.line, startLocation.column + 1, exports.name, exports.bests, 'find low performance api to convert string to number: ' + node.callee.name);
		}
	});
};