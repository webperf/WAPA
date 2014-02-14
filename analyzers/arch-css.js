

"use strict";

exports.name = 'CSSTransform-analyzer';

exports.type = '.css';

exports.dependent = false;

exports.bests = {
	'chrome': {
		best: 'arch-css',
		speedup: 1
	}
};

exports.analyze = function (syntax, reporter, platform) {
	syntax.traverse(function (node, key, parent) {
		if (node.style && node.style.length >= 1) {
			var styleLen = node.style.length;
			for(var i = 0; i < styleLen; i ++) {
				var obj = {};
				var attri = node.style[i];
				obj[attri] = node.style[attri];
				reporter.log (node.__line, node.__column, exports.name, exports.bests, obj);
			}
			return false;
		}		
	});

};