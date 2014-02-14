

"use strict";

var fs = require('fs');
var _ = require('underscore');
var esprima = require('esprima');
var cssom = require('cssom');
var htmlparser = require('htmlparser');
//递归的查找文件目录，并过滤只搜索某些后缀的文件
var readdirp = require('readdirp');
var path = require('path');
var def = require('./shared/def');
var bests = require('./analyzers/bests').bests;

function WAPA(opts) {
	this._opts = opts || {};
	var platforms = this.platforms = opts.platforms = opts.platforms || _.keys(def.platforms);
	var libraries = this.libraries = opts.libraries = _.sortBy(opts.libraries || [], function IF(i) {return i;});
	var names = opts.analyzers || def.analyzers;
	var analyzers = this._analyzers = [];

	_.each(names, function(name) {
		var analyzer = require('./analyzers/' + name);
		if (_.some(platforms, function (platform) {
			var supportPlatform = _.has(analyzer.bests, platform);
			var supportLibrary = !analyzer.libraries || _.some(analyzer.libraries, function (lib) { return _.indexOf(libraries, lib, true) >= 0; });
			return supportPlatform && supportLibrary;
		})) {
			analyzers.push(analyzer);
		}
	});
}

WAPA.prototype.loadedAnalyzers = function () {
	return _.pluck(this._analyzers, 'name');
};

WAPA.prototype.analyze = function (name, source, type) {
	var reporter = new Reporter(name);
	var parsers = {
		'.js'	:	_jsparser,
		'.css'	:	_cssparser,
		'.html'	:	_htmlparser
	};
	var analyzers = this._analyzers;
	var platforms = this.platforms;
	var libraries = this.libraries;
	var parser = parsers[type];
	if (parser) {
		_.each(analyzers, function(analyzer) {
			if (analyzer.dependent) {
				_.each(platforms, function(platform) {
					var syntax = parser(source, platform, libraries);
					if (syntax) analyzer.analyze (syntax, reporter, platform, libraries);
				});
			} else {
				var syntax = parser(source, platforms[0], libraries);
				if (syntax) analyzer.analyze (syntax, reporter, platforms[0], libraries);
			}
		});
	}

	return reporter;
};

WAPA.prototype.analyzeDirectory = function (dir, callback, progress) {
	var results = [];
	var count = 0;
	var length = 0;

	var self = this;
	
	this._readDirectory(dir, function (err, files) {
		if (err) c(err);
        files = filterLibrary(files);
		length = count = files.length;
		_.each(files, function (entry) {
			fs.readFile(entry.fullPath, 'utf-8', function (err, source) {
				if (err) {
					c(err);
					return;
				}
				var reporter = self.analyze(entry.path, source, path.extname(entry.name));
				results.push(reporter);
				p();
			});
		});
	});

	function c(err, results) {
		callback(err, results);
	}

	function p() {
		count--;
		if (progress) progress((length - count) / length);
		if (count === 0) {
			c(null, results);
		}
	}
	function filterLibrary(files){
		var tempFiles = [];
        var exp = /jquery|prototype|dojo|mootools|yui/i;
        _.each(files,function(file){
        	if(path.extname(file.name) != ".js" ){
        		tempFiles.push(file);
        	}else{
             if(!exp.test(file.name)){
              tempFiles.push(file);
             }
        	}
        });
        return tempFiles;
    }
};

WAPA.prototype._readDirectory = function (dir, callback) {
	var files = [];
	readdirp({root: dir, fileFilter: ['*.js', '*.css', '*.html'], directoryFilter: ['!.git', '!.svn']})
	.on('data', function (entry) {
		files.push(entry);
	})
	.on('end', function () {
		callback(null, files);
	})
	.on('error', function (err){
		callback(err);
	});
};

WAPA.getFullBest = function (bestname) {
	return bestname ? bests[bestname]: bests;
};

WAPA.getPlatforms = function () {
	return def.platforms;
};

WAPA.getLibraries = function () {
	return def.libraries;
};

WAPA.getPlatforms = function () {
	return def.platforms;
};

/**
 * Wrapper class of the AST tree and scopes
 */
function JSSyntax(syntax, scopes) {
	this._syntax = syntax;
	this._scopes = scopes;
}

JSSyntax.prototype.isDefined = function () {
	return this._scopes.isDefined.apply(this._scopes, arguments);
};

JSSyntax.prototype.isStrictMode = function () {
	return this._scopes.isStrictMode.apply(this._scopes, arguments);
};

JSSyntax.prototype.isWithStatement = function () {
	return this._scopes.isRuntimeOnly;
};
/**
 * Executes visitor on the node and its children (recursively).
 *
 * @param	visitor		{Function}      Callback function before visiting the child nodes [visitor.call(this, val, key, tree, scopes)]
 * @param	postvisitor	{Function}      Callback function after visiting the child nodes [postvisitor.call(this, val, key, tree, scopes)]
 */
JSSyntax.prototype.traverse = function (visitor, postvisitor) {
	var that = this;
	_visit (this._syntax, null, this._syntax, this._scopes);

	function _traverse (syntax, scopes) {
		if (syntax && syntax.type === 'AssignmentExpression') {
			_.each(['right', 'left'], function (key) {
				_traverseChild(syntax[key], key, syntax, scopes);
			});
		} else {
			_.each(syntax, function (val, key) {
				_traverseChild(val, key, syntax, scopes);
			});
		}

	}

	function _traverseChild(val, key, syntax, scopes) {
		if (val === null)
			return;

		if (!_.isObject(val) && !_.isArray(val))
			return;

        switch(val.type) {
            case "CatchClause":
                scopes.pushCatchObject(val.param.name);
                _visit(val, key, syntax, scopes);
                scopes.popCatchObject();
                break;
            case "WithStatement":
                scopes.runtimeOnly = true;
                _visit(val, key, syntax, scopes);
                scopes.runtimeOnly = false;
                break;
			case "VariableDeclarator":
				_visit(val, key, syntax, scopes);
				if (val.init && val.id.type === 'Identifier') {
					scopes.setType(val.id.name, that.getType(val.init));
				}
				break;
			case "AssignmentExpression":
				_visit(val, key, syntax, scopes);
				if (val.left && val.left.type === 'Identifier') {
					scopes.setType(val.left.name, that.getType(val));
				}
				break;
            default:
                _visit(val, key, syntax, scopes);
            break;
        }

	}


	function _visit(val, key, syntax, scopes) {
	    if (val.type) {
	        scopes.curid = val.curid;
	    }

	    if (visitor.call(that, val, key, syntax, scopes) !== false) { // do NOT traverse children nodes if visitor returns false
	        _traverse (val, scopes);
	    }

    	postvisitor && postvisitor.call(that, val, key, syntax, scopes);

	    if (syntax.type) {
	        scopes.curid = syntax.curid;
	    }
	}

};

var _typeFunc = function (type) {
	return function () {
		return type;
	};
};

var _getLiteralType = function (jssyntax, node) {
	var literalTypes = {
		'number'	: 	'Number',
		'string'	: 	'String',
		'boolean'	: 	'Boolean',
		'object' 	: 	'Null'
	};
	return literalTypes[typeof node.value] || false;
};

var _getIdentifierType = function (jssyntax, node) {
	return jssyntax._scopes.getType(node.name);
};

var _getSequnceExpType = function (jssyntax, node) {
	return jssyntax.getType(node.expressions[node.expressions.length - 1]);
};

var _getUnaryExpType = function (jssyntax, node) {
	var unaryOps = {
		'!'	: 	'Boolean',
		'~'	: 	'Number',
		'+'	: 	'Number',
		'-'	: 	'Number',
		'typeof'	: 	'String',
		'delete'	: 	'Boolean',
		'void'		: 	'undefined'
	};

	return unaryOps[node.operator] || false;
};

var _getAdditionType = function (leftType, rightType) {
	if (leftType === false || rightType === false) {
		return false;
	} else if (leftType === 'Number') {
		if (rightType === 'Number' || rightType === 'Boolean' || rightType === 'undefined' || rightType === 'Null') {
			return 'Number';
		} else {
			return 'String';
		}
	} else if (rightType === 'Number') {
		if (leftType === 'Number' || leftType === 'Boolean' || leftType === 'undefined' || leftType === 'Null') {
			return 'Number';
		} else {
			return 'String';
		}
	} else {
		return 'Number';
	}
};

var _getBinaryExpType = function (jssyntax, node) {
	var binaryOps = {
		'*'	: 	'Number',
		'/' : 	'Number',
		'-'	: 	'Number',
		'%'	: 	'Number',
		'^' : 	'Number',
		'&' : 	'Number',
		'|' : 	'Number',
		'<' : 	'Boolean',
		'<=': 	'Boolean',
		'>=': 	'Boolean',
		'>' : 	'Boolean',
		'=='	: 	'Boolean',
		'!='	: 	'Boolean',
		'==='	: 	'Boolean',
		'!=='	: 	'Boolean',
		'<<'	: 	'Number',
		'>>'	: 	'Number',
		'>>>'	: 	'Number',
	};

	if (node.operator === '+') {
		var leftType = jssyntax.getType(node.left);
		var rightType = jssyntax.getType(node.right);
		return _getAdditionType(leftType, rightType);
	} else {
		return binaryOps[node.operator] || false;
	}
};

var _getAssignmentExpType = function (jssyntax, node) {
	var assignOps = {
		'*='	: 	'Number',
		'/='	: 	'Number',
		'-='	: 	'Number',
		'%='	: 	'Number',
		'^='	: 	'Number',
		'&='	: 	'Number',
		'|='	: 	'Number',
		'<<='	: 	'Number',
		'>>='	: 	'Number',
		'>>>='	: 	'Number',
	};

	if (node.operator === '+=') {
		var rightType = jssyntax.getType(node.right);
		var leftType = jssyntax.getType(node.left);
		var type = _getAdditionType(leftType, rightType);
		return type;
	} else if (node.operator === '=') {
		var type = jssyntax.getType(node.right);
		return type;
	} else {
		return assignOps[node.operator] || false;
	}
};

var _getConditionalExpType = function (jssyntax, node) {
	var leftType = jssyntax.getType(node.consequent);
	var rightType = jssyntax.getType(node.alternate);

	return leftType === rightType ? leftType : false;
};

var _getNewExpType = function (jssyntax, node) {
	var calleeType = jssyntax.getType(node.callee);
	if (calleeType === 'Function') {
		return node.callee.type === 'Identifier' ? node.callee.name : 'Object';
	} else {
		return 'Object';
	}
};

var _nodeGetType = {
	'Literal'		: 	_getLiteralType,
	'Identifier'	: 	_getIdentifierType,
	'ThisExpression': 	_typeFunc('undefined'),
	'ArrayExpression'	: 	_typeFunc('Array'),
	'ObjectExpression'	: 	_typeFunc('Object'),
	'FunctionExpression': 	_typeFunc('Function'),
	'SequenceExpression': 	_getSequnceExpType,
	'UnaryExpression'	: 	_getUnaryExpType,
	'BinaryExpression'	: 	_getBinaryExpType,
	'AssignmentExpression'	: 	_getAssignmentExpType,
	'UpdateExpression'	: 	_typeFunc('Number'),
	'LogicalExpression'	: 	_typeFunc('Boolean'),
	'ConditionalExpression'	: 	_getConditionalExpType,
	'NewExpression'	: 	_getNewExpType,
	'CallExpression'	: 	_typeFunc(false),
	'MemberExpression'	: 	_typeFunc(false),
};

JSSyntax.prototype.getType = function (node) {
	if (node._type) {
		return node._type;
	}

	var typeFunc = _nodeGetType[node.type];
	return typeFunc ? (node._type = typeFunc(this, node)): false;
};

JSSyntax.prototype.setType = function (node, type) {
	if (node._type) return;

	node._type = type;
};

/**
 * Wrapper class of CSSOM
 *
 * @param 	syntax 		{CSSOM}		CSSOM representation of parsed CSS file
 */
function CSSSyntax(syntax) {
	this._syntax = syntax;
}

/**
 * Executes visitor on the node and its children (recursively).
 *
 * @param	visitor	{Function}      Callback function [visitor.call(this, val, key, tree)]
 */
CSSSyntax.prototype.traverse = function (visitor) {
	var that = this;
	_traverse (this._syntax, visitor);

	function _traverse(syntax, visitor) {
		_.each(syntax, function (val, key) {
			if (val === null)
				return;

			if (!_.isObject(val) && !_.isArray(val))
				return;

			if (key === 'parentStyleSheet' || key === 'parentRule')
				return;

			if (visitor.call(that, val, key, syntax) !== false) {
				_traverse (val, visitor);
			}
		});
	}
};

/**
 * Wrapper class of HTML DOM tree
 *
 * @param 	syntax 		{DOM}		DOM representation of parsed HTML file
 */
function HTMLSyntax(syntax) {
	this._syntax = syntax;
}

/**
 * Executes visitor on the node and its children (recursively).
 *
 * @param	visitor	{Function}      Callback function [visitor.call(this, val, key, tree)]
 */
HTMLSyntax.prototype.traverse = function (visitor) {
	var that = this;
	_traverse (this._syntax, visitor);

	function _traverse(syntax, visitor) {
		_.each(syntax, function (val, key) {
			if (val === null)
				return;

			if (!_.isObject(val) && !_.isArray(val))
				return;

			if (visitor.call(that, val, key, syntax) !== false) {
				_traverse (val, visitor);
			}
		});
	}
};

// ScopeStack stores all the environments we encounter while
// traversing syntax trees. It also keeps track of all
// variables defined and/or used in these environments.
//
// We use linked-list implementation of a stack. The first
// element, representing global environment, doesn't have
// a reference to its parent.
//
// runtimeOnly means that we can't tell if identifier
// is a variable or a property by analysing the source. It
// is true only within the `with` statement.

function ScopeStack() {
	this.stack = [];
	this.curid = null;

	this.runtimeOnly = false;
	this._catchObject = [];
	this.push("(global)");
}

ScopeStack.prototype = {
	get current() {
		if (this.curid === null)
			return null;

		return this.stack[this.curid];
	},

	get parent() {
		if (this.curid === null)
			return null;

		var parid = this.current.parid;

		if (parid === null)
			return null;

		return this.stack[parid];
	},

	// Push a new environment into the stack.

	push: function (name) {
		var curid = this.curid;
		this.curid = this.stack.length;

		this.stack.push({
			parid:    curid,
			name:     name,
			strict:   false,
			// switches: {},
			// ignores:  {},
			vars:     {},
			// uses:     {},
			types:    {}
		});
	},

	// Exit from the current environment. Even though
	// this method is called `pop` it doesn't actually
	// delete the environment--it simply jumps into the
	// parent one.

	pop: function () {
		this.curid = this.current.parid;
	},

	any: function (cond, env, limit) {
		env = env || this.current;
        limit = limit || -1;

		while (env && limit) {
			if (cond.call(env))
				return true;

			env = this.stack[env.parid];
            limit--;
		}

		return false;
	},

	isDefined: function (name, env, limit) {
		name = _safe(name);
		return this.any(function () { return _.has(this.vars, name); }, env, limit) || _.indexOf(this._catchObject, name) >= 0;
	},

	isStrictMode: function (env) {
		return this.any(function () { return this.strict; }, env);
	},

	// isSwitchEnabled: function (name, env) {
	// 	return this.any(function () { return this.switches[name]; }, env);
	// },

	// isMessageIgnored: function (code, env) {
	// 	return this.any(function () { return this.ignores[code]; }, env);
	// },

	// addUse: function (name, range) {
	// 	name = _safe(name);

	// 	if (this.runtimeOnly)
	// 		return;

	// 	if (this.current.uses[name] === undefined)
	// 		this.current.uses[name] = [range];
	// 	else
	// 		this.current.uses[name].push(range);
	// },

	setType: function (name, type) {
		name = _safe(name);

		this.current.types[name] = type;
	},

	getType: function (name) {
		var type = false;
		name = _safe(name);
		this.any(function() {var t = this.types[name]; if (!_.isUndefined(t)) { type = t; return true; }});
		return type;
	},

	addVariable: function (opts) {
		this.current.vars[_safe(opts.name)] = {
			writeable: opts.writeable || false
		};
	},

	pushCatchObject: function (name) {
		return this._catchObject.push(_safe(name)) - 1;
	},

	popCatchObject: function () {
		this._catchObject.pop();
		return this._catchObject.length;
	},

	addGlobalVariable: function (opts) {
		this.stack[0].vars[_safe(opts.name)] = {
			writeable: opts.writeable || false
		};
	}/*,

	addSwitch: function (name) {
		this.current.switches[name] = true;
	},

	addIgnore: function (name) {
		this.current.ignores[name] = true;
	}*/
};

/**
 * Reporter Class
 *
 **/
function Reporter(name, _logs) {
	//name是分析的文件的名字。
	this._name = name;
	this._logs = _logs || [];
}

Reporter.prototype = {
	get length() {
		return this._logs.length;
	},
	get name() {
		return this._name;
	},
	/**
	 * Log the message
	 *
	 * @param 	line 	{Number}	Line number of the message starting from 1.
	 * @param 	column	{Number}	Column number of the message starting from 1.
	 * @param 	rule	{String}	Name of the rule
	 * @param 	best	{Object}	Best practices with platform and speed-ups ({"name-of-platform": {"best": "name of the best", "speedup": x}})
	 * @param 	msg 	{String}	(Optional) Customized message for this log
	 * @return  {Object} 	Return the single message just logged
	 */
	log: function (line, column, rule, best, msg) {
		return this._logs.push({line: line, column: column, rule: rule, best: best, msg: msg});
	},
	/**
	 * Filter out the logs
	 * 
	 * @param 	platform 		{String}	Platform to retrieve
	 * @param 	nameOfAnalyzer	{String}	Name of the analyzer
	 * @return 	{Reporter}		Filtered reporter containing: line, column, rule, best, msg
	 */
	filter: function (platform, nameOfAnalyzer) {
		var logs = [];
		_.each(this._logs, function(log) {
			var included = true;
			var best = null;
			if (platform) {
				best = log.best[platform];
				included = !!best;
			}
			if (included && nameOfAnalyzer) {
				if (log.rule !== nameOfAnalyzer) {
					included = false;
				}
			}
			if (included) {
				log = _.clone(log);
				if (best) {
					log.best = {};
					log.best[platform] = best;
				}
				logs.push(log);
			}
		});
		return new Reporter(this._name, logs);
	},
	/**
	 * Iterate the logs
	 * 
	 * @param 	iterator	{Function}	Iterator of the messages. iterator (log): log - line, column, rule, best, msg
	 */
	each: function (iterator){
		if (!_.isFunction(iterator)) throw new TypeError('Iterator function is required');

		_.each(this._logs, iterator);
	},
	objectize: function () {
		return {name: this._name, logs: this._logs};
	},
	toJSON: function() {
		return JSON.stringify(this.objectize());
	}
};

//////////////////////////////////////////////////////////
// PRIVATE SECTION
//////////////////////////////////////////////////////////
function _jsparser(source, platform, libraries) {
    var scopes = new ScopeStack();
    _addGlobals(def.vars.reservedVars);
    _addGlobals(def.vars.ecmaIdentifiers);
    _addGlobals({"undefined": false});

    var p = def.platforms[platform];
    if (p) {
        _.each(p.vars, function(v){
            _addGlobals(def.vars[v]);
        });
    }

    _.each(libraries, function (library) {
    	var l = def.libraries[library];
    	if (l) {
    		_.each(l.vars, function(v){
	            _addGlobals(def.vars[v]);
    		});
    	}
    });

	try{
		var tree = esprima.parse(source, {
			tolerant: true,
			loc: true
		});
		_parse(tree);

		return new JSSyntax(tree, scopes);
	} catch (e) {
		return null;
	}

    function _addGlobals(globals) {
        _.each(globals, function(val, name) {
            scopes.addGlobalVariable({
                name: name,
                writeable: val.writeable
            });
            scopes.setType(name, val.type);
        });
    }

    // Walk the tree using recursive* depth-first search
    //
    // * - and probably horribly inefficient.
    function _parse(tree) {
        if (tree.type) {
            tree.curid = scopes.curid;
       	}

        _.each(tree, function(val) {
            if(val === null) return;

            if(!_.isObject(val) && !_.isArray(val)) return;

            switch(val.type) {
            case "ExpressionStatement":
                if(val.expression.type === "Literal" && val.expression.value === "use strict") scopes.current.strict = true;
                _parse(val);
                break;
            case "FunctionDeclaration":
                scopes.addVariable({
                    name: val.id.name
                });
                scopes.setType(val.id.name, "Function");
                scopes.push(val.id.name);
                _.each(val.params, function(param) {
                    scopes.addVariable({
                        name: param.name
                    });
                    scopes.setType(param.name, false);
                });
                scopes.addVariable({name: "arguments"});
                scopes.setType("arguments", "Arguments");
                _parse(val);
                scopes.pop();
                break;
            case "FunctionExpression":
                if(val.id && val.id.type === "Identifier"){
                	scopes.push(val.id.name);
                	scopes.addVariable({
                    	name: val.id.name
                	});
                	scopes.setType(val.id.name, "Function");
                } else {
	                scopes.push("(anon)");
                }
                _.each(val.params, function(param) {
                    scopes.addVariable({
                        name: param.name
                    });
                    scopes.setType(param.name, false);
                });
                scopes.addVariable({name: "arguments"});
                scopes.setType("arguments", "Arguments");
                _parse(val);
                scopes.pop();
                break;
            case "VariableDeclarator":
                scopes.addVariable({
                    name: val.id.name
                });
                scopes.setType(val.id.name, "undefined");
                _parse(val);
                break;
            default:
                _parse(val);
            }
        });
    }
}

function _safe(name) {
	if(name === "__proto__") return "(__proto__)";

	var special = Object.getOwnPropertyNames(Object.prototype);
	for(var i = 0; i < special.length; i++) {
		if(name === special[i]) return "(" + name + ")";
	}

	return name;
}

function _htmlparser(source, platform) {
	var handler = new htmlparser.DefaultHandler(function(err, dom) {});
	new htmlparser.Parser(handler, {
		includeLocation: true
	}).parseComplete(source);
	return new HTMLSyntax(handler.dom);
}

function _cssparser(source, platform) {
	return new CSSSyntax (cssom.parse(source));
}
//////////////////////////////////////////////////////////
// END OF PRIVATE SECTION
//////////////////////////////////////////////////////////

exports.WAPA = WAPA;
