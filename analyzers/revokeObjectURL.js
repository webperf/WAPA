

"use strict";

exports.name = 'avoidUsingForinOnArray';

exports.type = '.js';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'revokeObjectURL',
		speedup: 0
	},
	'chrome': {
		best: 'revokeObjectURL',
		speedup: 0
	},
   'ff': {
    best: 'revokeObjectURL',
    speedup: 0
  }
};

exports.analyze = function(syntax, reporter, platform) {

  syntax.traverse(function(node, key, parent, scopes) {
    var name = null,
        loc = null;
    if (node.type == "VariableDeclarator" && node.init && node.init.callee && node.init.callee.property && node.init.callee.property.name && node.init.callee.property.name == "createObjectURL") {
      loc = node.init.callee.property.loc;
      if (node.id && node.id.type == "Identifier") {
        name = node.id.name;
        handle(name, "create");
      }
    } else if (node.type == "AssignmentExpression" && node.right && node.right.callee && node.right.callee.property && node.right.callee.property.name && node.right.callee.property.name == "createObjectURL") {
      loc = node.right.callee.property.loc;
      if (node.left && node.left.type == "Identifier") {
        name = node.left.name;
        handle(name, "create")
      }
    }

    if (node.type == "CallExpression" && node.callee && node.callee.property && node.callee.property.name && node.callee.property.name == "revokeObjectURL") {
      if (node.arguments && node.arguments[0].type == "Identifier") {
        name = node.arguments[0].name;
        handle(name);
      }
    }

    function handle(name, flag) {
      var name = name + "_$CROU";
      // console.log(name)
      if (scopes.current.types[name]) {
        var obj = scopes.getType(name);
        if (flag == "create") {
          obj.create_Revokes.push("create");
          obj.locs.push(loc);
        } else {
          obj.create_Revokes.push("revoke");
          obj.locs.push("");
        }
        //  console.log('ywq')
      }

      if (flag == "create" && !scopes.current.types[name]) {
        var obj = {
          create_Revokes: [],
          locs: []
        };
        obj.create_Revokes.push("create");
        obj.locs.push(loc);
        scopes.setType(name, obj);
        // console.log(name)
      }
    }

  }, function(node, key, parent, scopes) {
    if (node.type == "Program" || node.type == "FunctionDeclaration" || node.type == "FunctionExpression") {
      var types = scopes.current.types;
      // console.log(types)
      for (var e in types) {
        if (types[e] && types[e].create_Revokes) {
          // console.log(types[e])
          recordHintInfo(types[e]);
        }
      }
    }
  });


  //console.log(syntax._syntax)

  function recordHintInfo(obj) {
    var create_Revokes = obj.create_Revokes;
    var locs = obj.locs;
    var position = null;
    for (var i = 0; i <= create_Revokes.length; i++) {
      // console.log(create_Revokes[0])
      if (i < create_Revokes.length) {
        if (position && create_Revokes[i] == "revoke") {
          position = null;
          // console.log(0)
        } else if (position && create_Revokes[i] == "create") {
          reporter.log(position.line, position.column + 1, exports.name, exports.bests, 'find a not revoking variable assigned by URL.createObjectURL ');
          // console.log(1)
          position = locs[i].start;
        } else if (create_Revokes[i] == "create") {
          // if(locs[i])
          position = locs[i].start;
        }

      } else if (i == create_Revokes.length && position) {

        reporter.log(position.line, position.column + 1, exports.name, exports.bests, 'find a not revoking variable assigned by URL.createObjectURL');
        // console.log(position)
      }

    }
  }

}