

"use strict";

exports.name = 'each-analyzer-jquery';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'eachTraverseArr_best',
		speedup: 64.11
	},
	'ff': {
		best: 'eachTraverseArr_best',
		speedup: 75.90
	},
	'chrome': {
		best: 'eachTraverseArr_best',
		speedup: 26.43
	}
	
};

exports.libraries = ['jquery'];

exports.analyze = function (syntax, reporter, platform) {
	syntax.traverse(function (node, key, parent) {
	
		if(node.type == "CallExpression" && node.callee.type == "MemberExpression" && node.callee.property.name === "each"){
			
			if(node.callee.object.name === "$" || node.callee.object.name === "jQuery"){ //如果是jQuery
				if(node.arguments.length == 2){ //如果有两个参数
					var remind = false;
					var param = node.arguments[0];
					switch(param.type){
						case "NewExpression": //$.each(new Array(""), function(){});
							if(param.callee.name === "Array"){
								remind = true;
							}
							break;
						case "ArrayExpression": //$.each([""], function(){});
							remind = true;
							break;
						case "Identifier": //$.each(arr, function(){});
							if(syntax.getType(param) === "Array"){
								remind = true;
							}
							break;
						case "CallExpression": 
							if(param.callee.type == "MemberExpression"){
								if(param.callee.property.name === "slice" && syntax.getType(param.callee.object) === "Array"){ //$.each(arr.slice(0), function(){});
									remind = true;
								}else if(param.callee.property.name === "call" &&  //$.each(Array.prototype.slice.call(), function(){});
											param.callee.object.type === "MemberExpression" && param.callee.object.property.name === "slice" &&
											param.callee.object.object.type === "MemberExpression" && param.callee.object.object.property.name === "prototype" &&
											param.callee.object.object.object.type === "Identifier" && param.callee.object.object.object.name === "Array") {
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
			}
		}
	});
};