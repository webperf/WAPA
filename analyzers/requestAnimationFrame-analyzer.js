

/*
 * 将setTimeout替换成RequestAnimationFrame
 * 主要使用于如下情况：
 *
 *
 * function test(){
 *    //do something
 *    setTimeout(test,intervalTime);
 * }
 * 
 * 这种情况将提示可以进行替换。
 *
 */
 
"use strict";

exports.name = 'requestAnimationFrame-analyzer';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'requestAnimationFrame_best',
		speedup: 1
	},
	'ff': {
		best: 'requestAnimationFrame_best',
		speedup: 1
	},
	'chrome': {
		best: 'requestAnimationFrame_best',
		speedup: 1
	},
	'winrt': {
		best: 'requestAnimationFrame_best',
		speedup: 1
	},
	'opera': {
		best: 'requestAnimationFrame_best',
		speedup: 1
	}
};

exports.analyze = function (syntax, reporter, platform) {
	syntax.traverse(function (node, key, parent, scopes) {
		if(node.type == "CallExpression" && (node.callee.type == "Identifier" && node.callee.name === "setTimeout"  //setTimeout();
			|| node.callee.type == "MemberExpression" && node.callee.property.name === "setTimeout") //self.setTimeout(); window.setTimeout();
			&& node.arguments[0].type == "Identifier" && node.arguments[0].name == scopes.current.name){ 
			var startLocation = node.loc.start;
			reporter.log (startLocation.line, startLocation.column + 1, exports.name, exports.bests, 'find low performance api: setTimeout');
		}
	});
};