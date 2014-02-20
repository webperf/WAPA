var WAPA = require('../wapa').WAPA;

var w = new WAPA({analyzers: ['numberToNumber-analyzer']});

describe('numberToNumber-analyzer', function() {

	it('should report using Number() to convert a String to a Number at line 1, column 12', function (){
		var report = w.analyze('test.js', 'var num1 = Number("123");', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(12);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	it('should report using Number() to convert a String to a Number at line 1, column 29', function (){
		var report = w.analyze('test.js', 'var str = "123"; var num1 = Number(str);', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(29);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});


});