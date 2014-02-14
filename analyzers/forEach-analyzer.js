

"use strict";

exports.name = 'forEach-analyzer';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'forEachTraverseArr_best',
		speedup: 8.29
	},
	'ff': {
		best: 'forEachTraverseArr_best',
		speedup: 32.09
	},
	'chrome': {
		best: 'forEachTraverseArr_best',
		speedup: 9.52
	}
};

exports.analyze = function (syntax, reporter, platform) {
	syntax.traverse(function (node, key, parent) {
		if(node.type == "CallExpression" && node.callee.type == "MemberExpression" && node.callee.property.name === "forEach"){
			var fnCaller = node.callee.object;
			var remind = false;
			switch(fnCaller.type){
				case "NewExpression": //new Array("").forEach();
					if(fnCaller.callee.name === "Array"){
						remind = true;
					}
					break;
				case "ArrayExpression": //[""].forEach();
					remind = true;
					break;
				case "Identifier": //arr.forEach();
					if(syntax.getType(fnCaller) === "Array"){
						remind = true;
					}
					break;
				case "CallExpression": 
					if(fnCaller.callee.type == "MemberExpression"){
						if(fnCaller.callee.property.name === "slice" && syntax.getType(fnCaller.callee.object) === "Array"){ //arr.slice(0).forEach();
							remind = true;
						}else if(fnCaller.callee.property.name === "call" &&  //Array.prototype.slice.call().forEach()
									fnCaller.callee.object.type === "MemberExpression" && fnCaller.callee.object.property.name === "slice" &&
									fnCaller.callee.object.object.type === "MemberExpression" && fnCaller.callee.object.object.property.name === "prototype" &&
									fnCaller.callee.object.object.object.type === "Identifier" && fnCaller.callee.object.object.object.name === "Array") {
							remind = true;
						} 
						
					}
					break;
				default:
					break;
			}
			if(remind){
				var startLocation = node.loc.start;
				reporter.log (startLocation.line, startLocation.column + 1, exports.name, exports.bests, 'find low performance api to traverse Array: ' + node.callee.property.name);
			}
		}
	});
};