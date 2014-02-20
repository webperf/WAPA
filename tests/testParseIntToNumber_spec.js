var WAPA = require('../wapa').WAPA;

var w = new WAPA({analyzers: ['parseIntToNumber-analyzer']});

describe('parseIntToNumber-analyzer', function() {

	it('should report using valueOf to convert a String to a Number at line 1, column 12', function (){
		var report = w.analyze('test.js', 'var num1 = parseInt("123");', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(12);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});


	it('should report using valueOf to convert a String to a Number at line 1, column 12', function (){
		var report = w.analyze('test.js', 'var num1 = parseInt("123", 10);', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(12);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

});