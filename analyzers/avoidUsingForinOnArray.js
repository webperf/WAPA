
"use strict";

exports.name = 'avoidUsingForinOnArray';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'for-in',
		speedup: 13.71
	},
	'chrome': {
		best: 'for-in',
		speedup: 18.30
	},
  'ff': {
    best: 'for-in',
    speedup: 97.83
  }
};

exports.analyze = function(syntax, reporter, platform) {
  syntax.traverse(function(node, key, parent, scopes) {
    if (node.type == "ForInStatement") {
      if (syntax.getType(node.right) == "Array") {
        var startLocation = node.loc.start;
        reporter.log(startLocation.line, startLocation.column + 1, exports.name, exports.bests, 'find the typeof Array of a variable in forIn expression,and it is an inefficient writing');
      }
    }
  });
};