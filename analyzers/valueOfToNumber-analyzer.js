

"use strict";

exports.name = 'valueOfToNumber-anlayzer';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'valueOfToNum_best',
		speedup: 44.72
	}
};

exports.analyze = function (syntax, reporter, platform) {
	
	syntax.traverse(function (node, key, parent) {
		if(node.type == "CallExpression" && node.callee.type == "MemberExpression" && node.callee.property.name == "valueOf"){
			var fnCaller = node.callee.object;
			var remind = false;
			switch(fnCaller.type){
				case "NewExpression": //new Number("123").valueOf();
					if(fnCaller.callee.name === "Number"){
						remind = true;
					}
					break;
				case "Identifier": //numObj.valueOf();
					if(syntax.getType(fnCaller) === "Number"){
						remind = true;
					}
					break;
				default:
					break;
			}
			if(remind){
				var startLocation = node.loc.start;
				reporter.log (startLocation.line, startLocation.column + 1, exports.name, exports.bests, 'find low performance api to convert string to number: ' + node.callee.property.name);
			}
		}
	});
};