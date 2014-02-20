

"use strict";

exports.name = 'sample-anlayzer';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'sample_best_1',
		speedup: 5
	},
	'chrome': {
		best: 'sample_best_1',
		speedup: 2
	}
};

exports.analyze = function (syntax, reporter, platform) {
	syntax.traverse(function (node, key, parent) {
		// find use of undefined identifier or type is number
		if (node.type === 'Identifier' && parent.type !== 'VariableDeclarator' && parent.type !== 'FunctionExpression' && parent.type !== 'FunctionDeclaration') {
			if (!syntax.isDefined(node.name) || syntax.getType(node) === 'Number') {
				var startLocation = node.loc.start;
				reporter.log (startLocation.line, startLocation.column + 1, exports.name, exports.bests, 'find undefined identifier: ' + node.name);
			}
		}
	}, function (node, key, parent) {
		if (node.type === 'Program') {
			var startLocation = node.loc.start;
			reporter.log (startLocation.line, startLocation.column + 1, exports.name, exports.bests, 'find Program');
		}
	});
};
