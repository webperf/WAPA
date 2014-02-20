

"use strict";

/**
 *	在ie和ff中，如果出现createTextNode()函数时，
 *  提示使用innerHTML进行替换
 *
 **/
exports.name = 'innerHtml-analyzer';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'innerHtml_best',
		speedup: 28.4
	},
	'ff': {
		best: 'innerHtml_best',
		speedup: 1.2
	}
};

exports.analyze = function (syntax, reporter, platform) {
	syntax.traverse(function (node, key, parent) {
		if(node.type == "CallExpression" && node.callee.type == "MemberExpression" && node.callee.property.name === "createTextNode"){ //document.createTextNode();
			var startLocation = node.loc.start;
			reporter.log (startLocation.line, startLocation.column + 1, exports.name, exports.bests, 'find low performance api: ' + node.callee.property.name);
		}
	});
};