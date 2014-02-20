var WAPA = require('../wapa').WAPA;

var w = new WAPA({analyzers: ['valueOfToNumber-analyzer']});

describe('valueOfToNumber-analyzer', function() {

	it('should report using valueOf to convert a String to a Number at line 1, column 1', function (){
		var report = w.analyze('test.js', 'new Number("123").valueOf();', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	it('should report using valueOf to convert a String to a Number at line 1, column 49', function (){
		var report = w.analyze('test.js', 'function test(){var numObj = new Number("123"); numObj.valueOf();}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(49);
		});
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	it('should not report using valueOf on string', function (){
		var report = w.analyze('test.js', 'function test(){var str = "123"; str.valueOf();}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	it('should not report using valueOf on the param of function', function (){
		var report = w.analyze('test.js', 'function test(numObj){numObj.valueOf();}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	it('should not report using valueOf on the param of function and also defined the same name before', function (){
		var report = w.analyze('test.js', 'var numObj = new Number("123");function test(numObj){numObj.valueOf();}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

});