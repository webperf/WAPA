var WAPA = require('../wapa').WAPA;

var w = new WAPA({analyzers: ['each-analyzer-jquery'], libraries: ['jquery']});

describe('each-analyzer-jquery', function() {

	it('should report using $.each() to traverse an array at line 1, column 32', function (){
		var report = w.analyze('test.js', 'var arr = new Array("1", "2"); $.each(arr, function(index, elem){alert(elem);});', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(32);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(32);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(32);
		});
	});

	it('should report using $.each() to traverse an array at line 1, column 32', function (){
		var report = w.analyze('test.js', 'var arr = new Array("1", "2"); jQuery.each(arr, function(index, elem){alert(elem);});', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(32);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(32);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(32);
		});
	});

	it('should report using $.each() to traverse an array at line 1, column 1', function (){
		var report = w.analyze('test.js', '$.each(new Array("1", "2"), function(index, elem){alert(elem);});', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});
	});

	it('should report using $.each() to traverse an array at line 1, column 1', function (){
		var report = w.analyze('test.js', '$.each(["1", "2"], function(index, elem){alert(elem);});', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});
	});

	it('should report using $.each() to traverse an array at line 1, column 24', function (){
		var report = w.analyze('test.js', 'var arr = new Array(); $.each(arr.slice(0), function(){});', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(24);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(24);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(24);
		});
	});

	it('should report using $.each() to traverse an array at line 1, column 1', function (){
		var report = w.analyze('test.js', '$.each(Array.prototype.slice.call(collection), function(){});', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});
	});

	it('should not report using each function defined by developers', function (){
		var report = w.analyze('test.js', 'function MyClass(){this.each = function(arr, callback){}} var obj = new MyClass(); obj.each(["a", "b"], callback);', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);


		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);


		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);

	});

	it('should not report using $.each() to traverse an Object', function (){
		var report = w.analyze('test.js', 'var obj = {name: "anmingyang", age: 24}; $.each(obj, function(){});', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);


		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);


		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);

	});

	it('should not report using $.each() to traverse a sliced string', function (){
		var report = w.analyze('test.js', 'var str = "123"; $.each(str.slice(2), function(index, elem){});', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);


		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);


		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);

	});

	it('should not report using $.each() to traverse a param of a function', function (){
		var report = w.analyze('test.js', 'function test(param){$.each(param, function(index, elem){})}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);


		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);


		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);

	});

	it('should not report using $.each() to traverse a param of a function even if there is a same param defined before.', function (){
		var report = w.analyze('test.js', 'var param = new Array("1");function test(param){$.each(param, function(index, elem){})}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);


		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);


		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);

	});

});