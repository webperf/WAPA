

"use strict";

exports.name = "setImmediate-analyzer" ;

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'setImmediate-analyzer_best',
		speedup: 1
	},
	/*
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
	*/
}; 

exports.analyze = function (syntax, reporter, platform) {
	syntax.traverse(function (node, key, parent, scopes) {
		if(node.type == "CallExpression" && (node.callee.type == "Identifier" && node.callee.name === "setTimeout"  //setTimeout();
			|| node.callee.type == "MemberExpression" && node.callee.property.name === "setTimeout") //self.setTimeout(); window.setTimeout();
			&& node.arguments[0].type == "Identifier" && node.arguments[0].name != scopes.current.name){ 
			//console.log("node found!");
			var startLocation = node.loc.start;
			reporter.log (startLocation.line, startLocation.column + 1, exports.name, exports.bests, 'find low performance api: setTimeout');
		}
	});
};