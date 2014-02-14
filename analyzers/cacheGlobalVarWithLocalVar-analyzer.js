

"use strict";

exports.name = 'cacheGlobalVarWithLocalVar-analyzer';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'cacheGlobalVarWithLocalVar_best',
		speedup: 102.56
	},
	'ff': {
		best: 'cacheGlobalVarWithLocalVar_best',
		speedup: 10.83
	},
	'chrome': {
		best: 'cacheGlobalVarWithLocalVar_best',
		speedup: 98.24
	}
};

exports.analyze = function (syntax, reporter, platform) {
	syntax.traverse(function(node, key, parent, scopes){
		if(node.type == "ForStatement" || node.type == "WhileStatement" || node.type == "DoWhileStatement"){
			if(!scopes.current.loops){
				scopes.current.loops = 0;
			}
			scopes.current.loops++;
		}else if(node.type == "AssignmentExpression" && node.left.type == "Identifier"){
			var leftName = node.left.name;
			if(!syntax.isDefined(leftName, scopes.current, 1) && scopes.current.loops > 0){ //如果在当前scope没有定义并且是在循环中的
				var startLocation = node.loc.start;
				reporter.log (startLocation.line, startLocation.column + 1, exports.name, exports.bests, 'find closure variable: ' + leftName);
			}
		}		
	}, 
	
	function(node, key, parent, scopes){
		if(node.type == "ForStatement" || node.type == "WhileStatement" || node.type == "DoWhileStatement"){
			scopes.current.loops--;
		}
	});
};
