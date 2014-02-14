var WAPA = require('../wapa').WAPA;

var w = new WAPA({analyzers: ['sample-analyzer']});

describe('sample-analyzer', function() {

	it('should report undefined identifier at line 1, column 30', function (){
		var report = w.analyze('test.js', 'var id=999; function test() {id = 10*10;}', '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(2);
		chromeReport.each(function(log, i){
			if (i === 0) {
				expect(log.line).toBe(1);
				expect(log.column).toBe(30);
			}
		});
	});

	it('should report undefined identifier at line 1, column 30', function (){
		var report = w.analyze('test.js', 'var id=999; function test() {id = new Number(10);}', '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(2);
		chromeReport.each(function(log, i){
			if (i === 0) {
				expect(log.line).toBe(1);
				expect(log.column).toBe(30);
			}
		});
	});
});
