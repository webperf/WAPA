var WAPA = require('../wapa').WAPA;

var w = new WAPA({analyzers: ['arch-gettype']});

describe('arch-gettype', function() {

	it('should not report undefined variables', function (){
		var report = w.analyze('test.js', 'var id = 9;', '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	it('should report id as Number', function (){
		var report = w.analyze('test.js', 'var id = 9; id;', '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function (log) {
			expect(log.msg.type).toBe('Number');
		});
	});

	it('should report id as Number in binary expression (id = 9 + 5)', function (){
		var report = w.analyze('test.js', 'var id = 9 + 5; id;', '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function (log) {
			expect(log.msg.type).toBe('Number');
		});
	});

	it('should report id as Number in unary expression (var id = 9; id++;)', function (){
		var report = w.analyze('test.js', 'var id = 9; id++; id;', '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(2);
		chromeReport.each(function (log, i) {
			if (i === 0) {
				expect(log.msg.type).toBe('Number');
			} else if (i === 1) {
				expect(log.msg.type).toBe('Number');
			}
		});
	});

	it('should report id as Number in sequence expression (var id = 9, t = "this is a string.", s = (id, t); s;)', function (){
		var report = w.analyze('test.js', 'var id = 9, t = "this is a string.", s = (id, t); s;', '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(3);
		chromeReport.each(function (log, i) {
			if (i === 0) {
				expect(log.msg.name).toBe('id');		// var ... s = (id), test;
				expect(log.msg.type).toBe('Number');
			} else if (i === 1) {
				expect(log.msg.name).toBe('t');		// var ... s = id, (test);
				expect(log.msg.type).toBe('String');
			} else if (i === 2) {
				expect(log.msg.name).toBe('s');		// s;
				expect(log.msg.type).toBe('String');
			}
		});
	});

	it('should report id as Number (id += t)', function (){
		var report = w.analyze('test.js', 'var id = 9, t = "this is a string"; id += t; id; t;', '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(4);
		chromeReport.each(function (log, i) {
			if (i === 0) {
				expect(log.msg.name).toBe('t');
				expect(log.msg.type).toBe('String');
			} else if (i === 1) {
				expect(log.msg.name).toBe('id');
				expect(log.msg.type).toBe('Number');
			} else if (i === 2) {
				expect(log.msg.type).toBe('String');	// id;
			} else if (i === 3) {
				expect(log.msg.type).toBe('String');	// t;
			}
			
		});
	});

	it('should report id as String (id = "test")', function (){
		var report = w.analyze('test.js', 'var id = "test"; id;', '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function (log) {
			expect(log.msg.type).toBe('String');
		});
	});

	it('should report id as String (id = new String("test"))', function (){
		var report = w.analyze('test.js', 'var id = new String("test"); id;', '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(2);
		chromeReport.each(function (log, i) {
			if (i === 0) {
				expect(log.msg.type).toBe('Function'); // String is Function
			} else if (i === 1) {
				expect(log.msg.type).toBe('String');	// id is String
			}
		});
	});

	it('should report id as s (var s = String, id = new s())', function (){
		var report = w.analyze('test.js', 'var s = String, id = new s(); id', '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(2);
		chromeReport.each(function (log, i) {
			if (i === 0) {
				expect(log.msg.type).toBe('Function'); // String is Function
			} else if (i === 1) {
				expect(log.msg.type).toBe('s'); // id is String
			}
		});
	});

	it('should report correct identifier and types in assignment expression with correct order (id = t = 100))', function (){
		var report = w.analyze('test.js', 'var t,id; id = t = 100; id; t;', '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(4);
		chromeReport.each(function (log, i) {
			if (i == 0) {
				expect(log.msg.name).toBe('t'); // t 1st
				expect(log.msg.type).toBe('undefined'); // visitor runs before evaluating the type
			} else if (i === 1) {
				expect(log.msg.name).toBe('id'); // id 2nd
				expect(log.msg.type).toBe('undefined'); // visitor runs before evaluating the type
			} else if (i === 2) {
				expect(log.msg.type).toBe('Number'); // id is Number
			} else if (i === 3) {
				expect(log.msg.type).toBe('Number'); // t is Number
			}
		});
	});

	it('should report t as Number inside a function and as undefined out of the scope (var t; function test() {t = 2;t;} t)', function (){
		var report = w.analyze('test.js', 'var t; function test() {t = 2;t;} t;', '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(3);
		chromeReport.each(function (log, i) {
			if (i === 0) {
				expect(log.msg.name).toBe('t'); // t = 2
				expect(log.msg.type).toBe('undefined'); // visitor runs before evaluating the type
			} else if (i === 1) {
				expect(log.msg.type).toBe('Number'); // t; t is Number
			} else if (i === 2) {
				expect(log.msg.type).toBe('undefined'); // t is out of the scope
			}
		});
	});

	it('should report t as Number inside a function and as undefined out of the scope (var t; function test() {t = 2;t;} t)', function (){
		var report = w.analyze('test.js', 'var t = 2; function test() {t = "this is a string.";t;} t;', '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(3);
		chromeReport.each(function (log, i) {
			if (i === 0) {
				expect(log.msg.name).toBe('t'); // t = "this is a string."
				expect(log.msg.type).toBe('Number'); // visitor runs before evaluating the type
			} else if (i === 1) {
				expect(log.msg.type).toBe('String'); // t; t is String
			} else if (i === 2) {
				expect(log.msg.type).toBe('Number'); // t is out of the scope
			}
		});
	});

	it('should report t as "array" -> false -> false (var t = []; t; function test(t) {for(var i in t) {}})', function (){
		var report = w.analyze('test.js', 'var t = []; t; function test(t) {for(var i in t) {}}', '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(3);
		chromeReport.each(function (log, i) {
			if (i === 0) {
				expect(log.msg.name).toBe('t');
				expect(log.msg.type).toBe('Array');
			} else if (i === 1) {
				expect(log.msg.type).toEqual(false); // function test(t) , t is false
			} else if (i === 2) {
				expect(log.msg.type).toEqual(false); // for(var i in t) , t is false
			}
		});
	});

	it('should report t as false -> false -> "Array" (function test(t) {t = [];for(var i in t) {}})', function (){
		var report = w.analyze('test.js', 'function test(t) {t = [];for(var i in t) {}}', '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(3);
		chromeReport.each(function (log, i) {
			if (i === 0) {
				expect(log.msg.name).toBe('t');
				expect(log.msg.type).toEqual(false);	// function test(t) , t is false
			} else if (i === 1) {
				expect(log.msg.type).toEqual(false);	// t = [] , t is false
			} else if (i === 2) {
				expect(log.msg.type).toEqual('Array');	// for(var i in t) , t is "Array"
			}
		});
	});

    it('should report t as "Array" (var t = [1,2,3]; for(var i in t) {})', function (){
		var report = w.analyze('test.js', 'var t = [1,2,3]; for(var i in t) {}', '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function (log, i) {
			if (i === 0) {
				expect(log.msg.name).toBe('t');
				expect(log.msg.type).toEqual("Array");	// for(var i in x) , x is Array
            }
		});
	});

});
