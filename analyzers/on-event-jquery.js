

"use strict";

exports.name = 'selector-find-jquery';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'on-event-jquery',
		speedup: 1.53
	},
	'chrome': {
		best: 'on-event-jquery',
		speedup: 4.95
	},
  'ff': {
    best: 'on-event-jquery',
    speedup: 5.21
  }
};

exports.analyze = function(syntax, reporter, platform) {
 var logStruct = {
    loops : 0,
    isInCallExpression : false,
    isJQueryObject : false,
    isRecorded : false,
    startLocation : null
  }

  var jqueryStruct = {
    isInCallExpression : false,
    isJQueryObject : false

  }


  syntax.traverse(function(node, key, parent, scopes) {
    if (node.type == "ForStatement" || node.type == "WhileStatement" || node.type == "DoWhileStatement") {
     logStruct.loops++;
    }
    if (logStruct.loops > 0 && node.type == "CallExpression" && !logStruct.isInCallExpression) {
        node.flag = true;
        logStruct.isInCallExpression = true;
        
    }
    if(node.type == "CallExpression" && !jqueryStruct.isInCallExpression){
        jqueryStruct.isInCallExpression = true;
        node.judge = true;
   }
    
  },function(node, key, parent, scopes){
     
     logOnEvent(node,parent);
     saveJqueryVariables(node);
  });



function saveJqueryVariables(node){
    if(node.judge){
      if(jqueryStruct.isJQueryObject){
        syntax.setType(node,"jQuery");
      }
      node.judge = false;
      jqueryStruct.isInCallExpression = false;
      jqueryStruct.isJQueryObject = false;
     }

     if(jqueryStruct.isInCallExpression && node.type == "Identifier" && (node.name == "$" || node.name =="jQuery")){
      jqueryStruct.isJQueryObject = true;
      //console.log(2)
     }
  }

function logOnEvent(node,parent){
   if(node.type == "ForStatement" || node.type == "WhileStatement" || node.type == "DoWhileStatement"){
      logStruct.loops--;
     }
     if(logStruct.loops>0 && logStruct.isInCallExpression && node.type == "Identifier"){
     // console.log(scopes.getType(node.name))
      if(node.name =="$" || node.name == "jQuery" || syntax.getType(node) == "jQuery"){
        logStruct.isJQueryObject = true;
        logStruct.startLocation = node.loc.start;
        }
     }
     if(logStruct.loops>0 && node.type == "MemberExpression" && node.property.type == "Identifier" && !logStruct.isRecorded && logStruct.isJQueryObject){
          var name = node.property.name;
          if(name == "on" && parent.arguments.length == 2){
             logStruct.isRecorded = true;
           //  console.log(isJQueryObject)

             reporter.log(logStruct.startLocation.line, logStruct.startLocation.column + 1, exports.name, exports.bests, 'find an inefficient writing that using the css method of jquery to add the style of an element!' );
        }
     }
     if(logStruct.loops > 0 && node.flag){
      node.flag = false;
      logStruct.isInCallExpression = false;
      logStruct.isRecorded = false;
      logStruct.isJQueryObject = false;
     }
}
};


