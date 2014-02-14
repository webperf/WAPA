var WAPA = require('../wapa').WAPA;

var w = new WAPA({analyzers: ['useClassName-analyzer']});

describe('useClassName-analyzer', function() {

	it('should notify when using .style attribute to define the style at line 1, column 1', function (){
		var report = w.analyze('test.js', 'el.style.borderLeft = "1px";', '.js');
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

	/**
	 *	new Added Test Cases
	 */

	it('should notify when the right is Binary', function (){
		var source = [
			"el.style.borderLeft = '1' + 'px';"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
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

	it('should not notify when the right is a variable', function (){
		var source = [
			"var x = getBorderSize();",
			"el.style.borderLeft = x;"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		
	});

	it('should not notify when the right is a variable', function (){
		var source = [
			"var x = getBorderSize();",
			"el.style.borderLeft = x + 'px';"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		
	});

	it('should notify when the right is x but is defined as a Literal', function (){
		var source = [
			"var x = '10px';",
			"el.style.borderLeft = x;"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(2);
			expect(log.column).toBe(1);
		});
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(2);
			expect(log.column).toBe(1);
		});
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(2);
			expect(log.column).toBe(1);
		});
		
	});

	it('should notify when the right is x but is defined as a Literal', function (){
		var source = [
			"var x = '10';",
			"el.style.borderLeft = x + 'px';"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(2);
			expect(log.column).toBe(1);
		});
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(2);
			expect(log.column).toBe(1);
		});
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(2);
			expect(log.column).toBe(1);
		});
		
	});

	it('should not notify when the right is an array element', function (){
		var source = [
			"var arr = [];",
			"el.style.borderLeft = arr[0];"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		
	});
	
	it('should not notify when the right is an array element', function (){
		var source = [
			"var arr = getArray();",
			"el.style.borderLeft = arr[0];"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		
	});

	it('should not notify when the right is an array element', function (){
		var source = [
			"var arr = getArray();",
			"el.style.borderLeft = arrarr[110] + 'px';"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		
	});



	

});