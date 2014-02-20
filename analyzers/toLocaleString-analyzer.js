

"use strict";

exports.name = 'toLocaleString-analyzer';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'convertArrToStr_best',
		speedup: 24.84
	},
	'ff': {
		best: 'convertArrToStr_best',
		speedup: 24.48
	}
};

exports.analyze = function (syntax, reporter, platform) {
	syntax.traverse(function (node, key, parent) {
		if(node.type == "CallExpression" && node.callee.type == "MemberExpression" && node.callee.property.name === "toLocaleString"){
			var fnCaller = node.callee.object;
			var remind = false;
			switch(fnCaller.type){
				case "NewExpression": //new Array("").toLocaleString();
					if(fnCaller.callee.name == "Array"){
						remind = true;
					}
					break;
				case "ArrayExpression": //[""].toLocaleString();
					remind = true;
					break;
				case "Identifier": //arr.toLocaleString();
					if(syntax.getType(fnCaller) === "Array"){
						remind = true;
					}
					break;
				case "CallExpression": //arr.slice().toLocaleString();
					if(fnCaller.callee.type == "MemberExpression" && fnCaller.callee.property.name === "slice"){
						remind = true;
					}
					break;
				default:
					break;
			}
			if(remind){
				var startLocation = node.loc.start;
				reporter.log (startLocation.line, startLocation.column + 1, exports.name, exports.bests, 'find low performance api to convert Array to String: ' + node.callee.property.name);
			}
		}
	});
};