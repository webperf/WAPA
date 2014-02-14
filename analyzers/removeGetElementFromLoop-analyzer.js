

/*
 *	将循环中出现的getElementsByName, getElementsByTagName, getElementsByClassName提示将其移除循环
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

"use strict";

exports.name = 'removeGetElementFromLoop-analyzer';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'removeGetElementFromLoop_best',
		speedup: 1
	},
	'ff': {
		best: 'removeGetElementFromLoop_best',
		speedup: 1
	},
	'chrome': {
		best: 'removeGetElementFromLoop_best',
		speedup: 1
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
            if (typeof child === 'object' && child !== null && child.type != "ForStatement" && child.type != "WhileStatement" && child.type != "DoWhileStatement") {
               traverse(child, visitor, name);
            }
        }
    }
}

/**
 *	判断param在当前的scope中是否定义过
 *	如果定义过，说明该param是变化的
 */
function isAssigned(param, scopes){
	var varArr = scopes.current.assignVarArr[scopes.current.loops];
	for(var i = 0; i < varArr.length; i++){
		if(param == varArr[i]){
			return true;
		}
	}
	return false;
}

/**
 *	初始化scopes.current.assignVarArr
 *	如果该node的值是变化的，则加入到当前assignVarArr中
 *	数据结构：assignVarArr是数组，第一个元素对应第一层loop中对应的变量，也用数组保存
 */
function initAssignmentInLoop(node, arr){
	var body = node.body.body;
	traverse(body, function(node){
		if(node && node.type == "VariableDeclarator" && node.id && node.id.type && node.id.type == "Identifier" && node.init  && node.init.type != "Literal" && !hasPushed(arr, node.id.name)){ 
			//var obj = ;
			arr.push(node.id.name);
		}else if(node && node.type == "AssignmentExpression" && node.left && node.right.type != "Literal"){
			if(node.left.type == "Identifier" && !hasPushed(arr, node.left.name)){ 
				//obj = ;
				arr.push(node.left.name);
			}else if(node.left.type == "MemberExpression" && !hasPushed(arr, getMemExpression(node.left))){ 
				//arr[0].obj = 
				arr.push(getMemExpression(node.left));
			}
		}else if(node && node.type == "UpdateExpression" && node.argument && node.argument.type == "Identifier" && !hasPushed(arr, node.argument.name)){ 
			//i++
			arr.push(node.argument.name);
		}
	});
}


/**
 *	判断该param是否在arr中定义过
 *
 */
function hasPushed(arr, param){
	for(var i = 0; i < arr.length; i++){
		if(param == arr[i]){
			return true;
		}
	}
	return false;
}


/**
 * 如果param是MemberExpression, 递归构造出该参数
 * 如：arr[0].obj
 *
 */
function getMemExpression(param){
	if(param.type != "MemberExpression"){
		return null;
	}
	var str = "";
	//构造[]或者.obj
	if(!param.computed){
		str = "." + param.property.name + str;
	}else{
		if(param.property.type == "Identifier"){
			str = "[" + param.property.name + "]" + str;
		}else if(param.property.type == "Literal"){
			str = "[" + param.property.value + "]" + str;
		}
	}
	//构造数组名arr
	if(param.object.type == "Identifier"){
		str = param.object.name + str;
	}else if(param.object.type == "MemberExpression"){
		str = getMemExpression(param.object) + str;
	}
	return str;
}


/**
 * 判断param是否是变化的
 * 需要调用isAssigned()方法
 *
 */
function isParamChangable(param, scopes){
	var changable = false;
	switch(param.type){
		case "Literal":
			break;
		case "Identifier":
			if(isAssigned(param.name, scopes)){
				changable = true;
			}
			break;
		case "MemberExpression":
			if(param.computed && param.property.type == "Identifier"){
				//优先判断对于arr[i]中的i是否有变化
				if(isAssigned(param.property.name, scopes)){
					changable = true;
					break;
				}
			} 
			//判断对于arr[0]或者arr[0].obj有没有赋值
			var arr = getMemExpression(param);
			if(isAssigned(arr, scopes)){
				changable = true;
				break;
			}
			//如果都没有，递归判断
			changable = isParamChangable(param.object, scopes); //递归对arr[0][0].b.b形式的左边判断
			break;
		case "BinaryExpression":
			if(param.right.type == "Identifier"){
				if(isAssigned(param.right.name, scopes)){
					changable = true;
					break;
				}
			}
			changable = isParamChangable(param.left, scopes); //递归对 (a + b + c)形式的左边判断
			break;
	}
	return changable;
}


exports.analyze = function (syntax, reporter, platform) {
	syntax.traverse(function(node, key, parent, scopes){
		if(node.type == "ForStatement" || node.type == "WhileStatement" || node.type == "DoWhileStatement"){
			//控制循环
			if(!scopes.current.loops){
				scopes.current.loops = 0;
			}
			scopes.current.loops++;

			//控制赋值变量的存储，使用二维数组保存
			if(!scopes.current.assignVarArr){
				scopes.current.assignVarArr = new Array();
			}
			if(!scopes.current.assignVarArr[scopes.current.loops]){
				scopes.current.assignVarArr[scopes.current.loops] = new Array();
			}		
			initAssignmentInLoop(node, scopes.current.assignVarArr[scopes.current.loops]);
			if(node.type == "ForStatement"){	//将for循环中的update中的变量保存
				if(node.update && node.update.type === "UpdateExpression" && node.update.argument && node.update.argument.type === "Identifier"){
					if(!hasPushed(scopes.current.assignVarArr[scopes.current.loops], node.update.argument.name)){ 
						scopes.current.assignVarArr[scopes.current.loops].push(node.update.argument.name);
					}
				}
			}else if(node.type == "WhileStatement" || node.type == "DoWhileStatement"){ //如果while()或者do{}while()的test中有"UpdateExpression", 保存
				if(node.test){
					traverse(node.test, function(tempNode){
						if(tempNode.type == "UpdateExpression" && tempNode.argument && tempNode.argument.type === "Identifier"){
							if(!hasPushed(scopes.current.assignVarArr[scopes.current.loops], tempNode.argument.name)){ 
								scopes.current.assignVarArr[scopes.current.loops].push(tempNode.argument.name);
							}
						}
					});
				}
			}

			//控制循环内的eval
			if(!scopes.current.hasEval){
				scopes.current.hasEval = new Array();
			}
			if(!scopes.current.hasEval[scopes.current.loops]){
				scopes.current.hasEval[scopes.current.loops] = false;
			}			

		}else if(node.type == "CallExpression" && node.callee.type == "Identifier" && node.callee.name === "eval" && scopes.current.loops > 0){ 
			//如果循环内有eval
			scopes.current.hasEval[scopes.current.loops] = true;

		}else if(node.type == "CallExpression" && node.callee.type == "MemberExpression" 
				&& (node.callee.property.name === "getElementById" || node.callee.property.name === "getElementsByName" || node.callee.property.name === "getElementsByClassName" 
						|| node.callee.property.name === "getElementsByTagName") //是getElement(s)ByXXXX();
				&& scopes.current.loops > 0){ //并且在循环中
			var remind = false;
			if(scopes.runtimeOnly){ //有with不提示
				return;
			}
			if(scopes.current.hasEval[scopes.current.loops]){ //有eval不提示
				return;
			}
			//判断函数的调用者
			var fnCaller = node.callee.object;
			if(syntax.getType(fnCaller) == "HTMLDocument"){
				//判断参数是否不变
				if(node.arguments && node.arguments.length != 0){
					var arg = node.arguments[0];
					if(!isParamChangable(arg, scopes)){
						remind = true;
					}
				}
			}
			if(remind){
				var startLocation = node.loc.start;
				reporter.log (startLocation.line, startLocation.column + 1, exports.name, exports.bests, 'find ' + node.callee.property.name + ' in loop');
			}
		}
	}, 
	function(node, key, parent, scopes){ //postvisitor
		if(node.type == "ForStatement" || node.type == "WhileStatement" || node.type == "DoWhileStatement"){
			scopes.current.loops--;
			scopes.current.assignVarArr.pop();
			scopes.current.hasEval.pop();
		}
	});
};