/**
 *	在进行div.appendChild(div)，如果在循环中，推荐使用fragment.appendChild(div). 然后div.appendChild(fragment);
 *
 *	所以，只有当在循环中由div调用appendChild()时才进行提示。
 *	如：
 *	var fragment = document.createDocumentFragment();
 *	for(var i = 0; i < 100; i++){
 *		fragment.appendChild(child[i]);
 *	}
 *	div.appendChild(fragment);	
 *	不进行提示
 *
 *  在scopes.current上挂载loop, 保存当前所在循环层数
 */

exports.name = 'fragment-analyzer';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'fragment_best',
		speedup: 1.61
	},
	'ff': {
		best: 'fragment_best',
		speedup: 3.13
	},
	'chrome': {
		best: 'fragment_best',
		speedup: 1.13
	}
};


exports.analyze = function (syntax, reporter, platform) {
	syntax.traverse(function(node, key, parent, scopes){
		if(node.type == "ForStatement" || node.type == "WhileStatement" || node.type == "DoWhileStatement"){
			if(!scopes.current.loops){
				scopes.current.loops = 0;
			}
			scopes.current.loops++;
		}else if(node.type == "CallExpression" && node.callee.type == "MemberExpression" && node.callee.property.type == "Identifier" ){
			if(node.callee.property.name === "createDocumentFragment"){ 
				syntax.setType(node, "DocumentFragment"); //将函数的返回值documentFragment保存为一种type
			}else if(node.callee.property.name === "appendChild" && scopes.current.loops > 0){
				var fnCaller = node.callee.object;
				if(syntax.getType(fnCaller) !== "DocumentFragment"){
					var startLocation = node.loc.start;
					reporter.log (startLocation.line, startLocation.column + 1, exports.name, exports.bests, 'find low performance use of ' + node.callee.property.name);
				}
			}
		}
	},
	function(node, key, parent, scopes){
		if(node.type == "ForStatement" || node.type == "WhileStatement" || node.type == "DoWhileStatement"){
			scopes.current.loops--;
		}
	});
};
