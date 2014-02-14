

"use strict";

/*
 *	将循环中出现的getElementsByName, getElementsByTagName, getElementsByClassName获得的结果转化为Array
 *
 *	for(var i = 0; i < 10; i++){
 *		var coll = getElementsByName("test");
 *	}
 *
 *	while(i < 100){
 *		getElementsByTagName("test");
 *	}
 *	都需要作出提示
 *
 */

exports.name = 'putCollectionToArray-analyzer';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'putCollectionToArray_best',
		speedup: 1.15
	}
};

function traverse(object, visitor, name) {
    var key, child;
    if (visitor.call(null, object) === false) {
        return;
    }
    for (key in object) {
        if (object.hasOwnProperty(key)) {
           child = object[key];
            if (typeof child === 'object' && child !== null) {
               traverse(child, visitor, name);
            }
        }
    }
}

exports.analyze = function (syntax, reporter, platform) {
	syntax.traverse(function(node, key, parent, scopes){
		if(node.type == "VariableDeclarator" &&  node.init && node.init.type == "CallExpression" && node.init.callee.type == "MemberExpression"){
			if(node.init.callee.property == "getElementsByName" ||node.init.callee.property == "getElementsByTagName" ||node.init.callee.property == "getElementsByClassName") {
				syntax.setType(node.init, "Collection");
				//console.log(node.init);
				//console.log('-----------------------------------------------------\n');
			}
		}
		/*
		if(node.type == "ForStatement" || node.type == "WhileStatement" || node.type == "DoWhileStatement"){
			if(!scopes.current.loops){
				scopes.current.loops = 0;
			}
			scopes.current.loops++;
		}else if(node.type == "CallExpression" && node.callee.type == "MemberExpression" 
				&& (node.callee.property.name === "getElementsByName" || node.callee.property.name === "getElementsByClassName" 
					|| node.callee.property.name === "getElementsByTagName") //是getElementsByXXXX();
				&& scopes.current.loops > 0){ //并且在循环中
			var startLocation = node.loc.start;
			reporter.log (startLocation.line, startLocation.column + 1, exports.name, exports.bests, 'find ' + node.callee.property.name + ' in loop');
		}	
		*/
	}, 
	function(node, key, parent, scopes){
		if(node.type == "ForStatement" || node.type == "WhileStatement" || node.type =="DoWhileStatement"){
			traverse(node.body, function(node){
				if(node.type == "Identifier"){
					if(syntax.getType(node) == "Collection"){
						var startLocation = node.loc.start;
						reporter.log (startLocation.line, startLocation.column + 1, exports.name, exports.bests, 'find bad usage of nodeList.');
					}
				}
			});
		}
		/*
		if(node.type == "ForStatement" || node.type == "WhileStatement" || node.type == "DoWhileStatement"){
			scopes.current.loops--;
		}
		*/
	});
};