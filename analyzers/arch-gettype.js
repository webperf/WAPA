

"use strict";

exports.name = 'arch-gettype';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'chrome': {
		best: 'arch_gettype',
		speedup: 5
	}
};

exports.analyze = function (syntax, reporter, platform) {
	syntax.traverse(function (node, key, parent) {
		if (node.type === 'Identifier' && parent.type !== 'VariableDeclarator' && parent.type !== 'FunctionExpression' && parent.type !== 'FunctionDeclaration') {
			var startLocation = node.loc.start;
			reporter.log (startLocation.line, startLocation.column + 1, exports.name, exports.bests, {name: node.name, type: syntax.getType(node)});
		}
	});
};