
"use strict";

exports.name = 'childNodesToNextSibling-analyzer';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'ff': {
		best: 'childNodesToNextSibling_best',
		speedup: 2.06
	},
	'chrome': {
		best: 'childNodesToNextSibling_best',
		speedup: 1.4
	}
};

exports.analyze = function (syntax, reporter, platform) {
	syntax.traverse(function (node, key, parent) {
		if(node.type == "MemberExpression" && node.property.name === "childNodes"){
			var startLocation = node.loc.start;
			reporter.log (startLocation.line, startLocation.column + 1, exports.name, exports.bests, 'find low performance api: ' + node.property.name);
		}
	});
};