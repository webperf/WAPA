

/**
 *	在for或者while循环中，如果.length出现在test中，则提示将其保存至局部变量
 *
 *	for(var i = 0; i < arr.length; i++){}
 *
 *	do{}while(i < arr.length)
 *
 **/

"use strict";

exports.name = 'putLengthIntoLocalVar-analyzer';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'putLengthIntoLocalVar_best',
		speedup:1.31
	},
	'ff': {
		best: 'putLengthIntoLocalVar_best',
		speedup: 1.29
	},
	'chrome': {
		best: 'putLengthIntoLocalVar_best',
		speedup: 1.95
	}
};

exports.analyze = function (syntax, reporter, platform) {
	syntax.traverse(function (node, key, parent) {
		if((node.type == "ForStatement" || node.type == "WhileStatement" || node.type == "DoWhileStatement")
			&& node.test && node.test.type === "BinaryExpression" && node.test.right.type == "MemberExpression" && node.test.right.property.name === "length"){
			var startLocation = node.test.right.property.loc.start;
			reporter.log (startLocation.line, startLocation.column + 1, exports.name, exports.bests, 'find .' + node.test.right.property.name + ' in test block of loop.');
		}
	});
};
