

"use strict";

exports.name = 'CSSTransform-analyzer';

exports.type = '.css';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'CSSTransform_best',
		speedup: 1
	},
	'ff': {
		best: 'CSSTransform_best',
		speedup: 1
	},
	'chrome': {
		best: 'CSSTransform_best',
		speedup: 1
	},
	'winrt': {
		best: 'CSSTransform_best',
		speedup: 1
	},
	'opera': {
		best: 'CSSTransform_best',
		speedup: 1
	}
};

exports.analyze = function (syntax, reporter, platform) {
	syntax.traverse(function (node, key, parent) {
		if(node.style && node.style.length >= 1){
			var styleLen = node.style.length;
			for(var i = 0; i < styleLen; i ++){
				var attri = node.style[i];
				var attriVal = node.style[attri];  //得到样式定义的内容，下面对内容进行正则表达式匹配

				//查找参数个数是1个的translate,scal,rotate属性的正则表达式
			    var transformRegExp1 = /(translate|scale|rotate)\b\(\s*\d*\.?\d*(px)?(deg)?\)/;

			    //查找参数个数是2个的translate,scal,rotate属性的正则表达式
			    var transformRegExp2 = /(translate|scale|rotate)\b\(\s*\d*\.?\d*(px)?(deg)?\,\s*\d*\.?\d*(px)?(deg)?\)/;

			    //查找matrix属性的正则表达式
   				var matrixRegExp = /\bmatrix\b\(\s*d*\.?\d*\,\s*d*\.?\d*\,\s*d*\.?\d*\,\s*d*\.?\d*\,\s*d*\.?\d*\,\s*d*\.?\d*\)/;

			    if(transformRegExp1.test(attriVal) || transformRegExp2.test(attriVal) || matrixRegExp.test(attriVal)){
					reporter.log (node.__line, node.__column, exports.name, exports.bests, 'find low performance style:' + attriVal);
			    }
			}
		}
		
	});

};