

"use strict";

exports.name = 'addClass-jquery';

exports.type = '.js';
//
exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'addClass-jquery',
		speedup: 4.03
	},
	'chrome': {
		best: 'addClass-jquery',
		speedup: 5.80
	},
  'ff': {
    best: 'addClass-jquery',
    speedup: 5.97
  }
};

exports.analyze = function(syntax, reporter, platform) {

  var logStruct = {
    isInCallExpression : false,
    isJQueryObject : false,
    isRecorded : false,
    isRightCSS : false,
    startLocation : null
  }
  var jqueryStruct = {
    isInCallExpression : false,
    isJQueryObject : false

  }
  syntax.traverse(function(node, key, parent, scopes) {

    if (node.type == "CallExpression" && !logStruct.isInCallExpression) {
        node.flag = true;
        logStruct.isInCallExpression = true;
        
    }
    if(node.type == "CallExpression" && !jqueryStruct.isInCallExpression){
        jqueryStruct.isInCallExpression = true;
        node.judge = true;
  }
},function(node, key, parent, scopes){  
     saveJqueryVariables(node);
      
     logCss(node,parent);

    
  });

 function logCss(node,parent){
     if(logStruct.isInCallExpression && node.type == "Identifier"){
      if(node.name == "$" || node.name == "jQuery" || syntax.getType(node) == "jQuery"){
        logStruct.isJQueryObject = true;
        logStruct.startLocation = node.loc.start;
       }
     }
     //console.log('[%s]\tisJQueryObject: %s', node.type, isJQueryObject);
     if(node.type == "MemberExpression" && node.property.type == "Identifier" && node.property.name == "css" && !logStruct.isRecorded && logStruct.isJQueryObject){
          logStruct.isRightCSS = true;
          var args = parent.arguments;
          if(args.length == 1 && args[0].type == "ObjectExpression"){
            var argObjs = args[0].properties;
            for(var j =0;j<argObjs.length;j++){
              if(argObjs[j].type == "Property" && argObjs[j].value.type != "Literal"){
                var temp = argObjs[j].value;
                if(!((temp.type == "Identifier" && (syntax.getType(temp) == "String"||syntax.getType(temp) == "Number")) ||
                 (temp.type == "BinaryExpression" &&  (syntax.getType(temp) == "String"||syntax.getType(temp) == "Number"))) ){
                    logStruct.isRightCSS = false;
                  logStruct.isRecorded = true;
                }
              }
            }
          }else{
              if(args.length == 2 && args[1].type != "Literal"){
                 if(!(( args[1].type == "Identifier" && (syntax.getType( args[1]) == "String"||syntax.getType( args[1]) == "Number")) ||
                 ( args[1].type == "BinaryExpression" &&  (syntax.getType( args[1]) == "String"||syntax.getType( args[1]) == "Number"))) ){
                    logStruct.isRightCSS = false;
                  logStruct.isRecorded = true;
                }
                
              }

        }
          
          
          
     }
     if(node.flag){
    //  console.log('clear');
      if(logStruct.isInCallExpression&&logStruct.isJQueryObject&&logStruct.isRightCSS)
      reporter.log(logStruct.startLocation.line, logStruct.startLocation.column + 1, exports.name, exports.bests, 'find an inefficient writing that using the css method of jquery to add the style of an element!' );
      node.flag = false;
      logStruct.isInCallExpression = false;
      logStruct.isRecorded = false;
      logStruct.isJQueryObject = false;
      logStruct.isRightCSS = false;
     }
  }

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

  
};
