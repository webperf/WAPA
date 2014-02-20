

"use strict";

exports.name = 'sample-analyzer-jquery';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'chrome': {
		best: 'sample_best_jquery',
		speedup: 5
	}
};

exports.libraries = ['jquery'];

exports.analyze = function (syntax, reporter, platform) {
	syntax.traverse(function (node, key, parent) {
		// find use of undefined identifier or type is number
		if (node.type === 'Identifier' && parent.type !== 'VariableDeclarator' && parent.type !== 'FunctionExpression' && parent.type !== 'FunctionDeclaration') {
			var startLocation = node.loc.start;
			reporter.log (startLocation.line, startLocation.column + 1, exports.name, exports.bests, {name: node.name, type: syntax.getType(node)});
		} if (node.type === 'CallExpression' && node.callee.type === 'Identifier' && node.callee.name === '$') {
			syntax.setType(node, 'jQuery');
		}
	});
};