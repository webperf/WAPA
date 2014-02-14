

/**
 * 在定义元素的样式时，对使用el.style.xxx的定义方式给出提示
 *
 * div.style.border = "1px, solid, red";
 *
 *
 *
 */

"use strict";

exports.name = 'useClassName-analyzer';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'useClassName_best',
		speedup: 54.72
	},
	'ff': {
		best: 'useClassName_best',
		speedup: 418.94
	},
	'chrome': {
		best: 'useClassName_best',
		speedup: 26.1
	}
};

function isArrayElement(node){
	if(node.type == "MemberExpression" && node.computed == true){
		return true;
	}
	return false;
}

exports.analyze = function (syntax, reporter, platform) {
	syntax.traverse(function (node, key, parent) {
		if(node.type == "VariableDeclarator" && node.init && (node.init.type == "MemberExpression" && node.init.computed == true || syntax.getType(node.init) == "ArrayElement")){
			syntax.setType(node.init, "ArrayElement");
			syntax.setType(node.id, "ArrayElement");
		}

		if(node.type == "AssignmentExpression" && (node.right.type == "MemberExpression" && node.right.computed == true || syntax.getType(node.right) == "ArrayElement")){
			syntax.setType(node.right,"ArrayElement");
			if(node.left.type == "Identifier"){
				syntax.setType(node.left, "ArrayElement");
			}
		}
		
		
		if(node.type == 'AssignmentExpression' && node.left.type == 'MemberExpression'){
            if(node.left.object.type == 'MemberExpression' && node.left.object.property.type == 'Identifier' && node.left.object.property.name === 'style'){
            	if(node.right.type == "Identifier" && !syntax.getType(node.right)) {
            		return;
            	}

            	if(node.right.type == "BinaryExpression"  && (node.right.left.type == "Identifier" || isArrayElement(node.right.left)) && node.right.right.type == "Literal"){
            		
            		if(!syntax.getType(node.right.left) || isArrayElement(node.right.left)){
            			return;
            		}
            	}

            	if(syntax.getType(node.right) == "ArrayElement"){
            		return;
            	}

                var startLocation = node.loc.start;
				reporter.log (startLocation.line, startLocation.column + 1, exports.name, exports.bests, 'find low performance api: ' + node.left.object.property.name);
            }
        }
	});
};