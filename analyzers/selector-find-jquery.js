

"use strict";

exports.name = 'selector-find-jquery';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'selector-find-jquery',
		speedup: 3.06
	},
	'chrome': {
		best: 'selector-find-jquery',
		speedup: 1.63
	},
  'ff': {
    best: 'selector-find-jquery',
    speedup: 1.42
  }
};

exports.analyze = function(syntax, reporter, platform) {
  syntax.traverse(function(node, key, parent, scopes) {
       if(node.type == "CallExpression" && node.callee.type == "Identifier" && node.callee.name == "$" && node.arguments[0] && node.arguments[0].type == "Literal"){
         var str = node.arguments[0].value ;
        // var arr = str.split(/ +/);
         var lastSpaceIndex = str.lastIndexOf(" ");
         var lastIndex = str.lastIndexOf("#");
         if(lastSpaceIndex!=-1&&lastIndex!=-1&&lastIndex<lastSpaceIndex){      
            var startLocation = node.loc.start;
            reporter.log(startLocation.line, startLocation.column + 1, exports.name, exports.bests, 'find a infficient writing that you select element with jquery!');
         }
       }

  });
};