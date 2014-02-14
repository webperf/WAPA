

"use strict";

exports.name = 'selector-id-jquery';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'selector-id-jquery',
		speedup: 11.54
	},
	'chrome': {
		best: 'selector-id-jquery',
		speedup: 5.60
	},
  'ff': {
    best: 'selector-id-jquery',
    speedup: 4.79
  }
};

exports.analyze = function(syntax, reporter, platform) {
  syntax.traverse(function(node, key, parent, scopes) {
       if(node.type == "CallExpression" && node.callee.type == "Identifier" && node.callee.name == "$" && node.arguments[0] && node.arguments[0].type == "Literal"){
         var str = node.arguments[0].value ;
         var lastIndex = str.lastIndexOf("#") ;
         if(lastIndex != -1 && lastIndex != 0){
           var startLocation = node.loc.start ;
            reporter.log(startLocation.line, startLocation.column + 1, exports.name, exports.bests, 'find a infficient writing when select elements with jquery!');


         }

       }

  });
};