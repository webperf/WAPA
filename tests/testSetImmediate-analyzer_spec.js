var WAPA = require('../wapa').WAPA;

var w = new WAPA({analyzers: ['setImmediate-analyzer']});

describe('setImmediate-analyzer', function() {

	it('should report using setTimeout() at line 1, column 18', function (){
		var report = w.analyze('test.js', 'function test1(){setTimeout(test2, intervalTime);}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(18);
		});
	});

	it('should report using setTimeout() at line 1, column 18', function (){
		var report = w.analyze('test.js', 'function test1(){function test(){setTimeout(test1, intervalTime);}}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);

		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(34);
		});
	});

	it('should not report using setTimeout() at line 1, column 17', function (){
		var report = w.analyze('test.js', 'function test(){setTimeout(test, intervalTime);}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
	});

	it('should not report using setTimeout() at line 1, column 34', function (){
		var report = w.analyze('test.js', 'function test1(){function test(){setTimeout(test, intervalTime);}}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
	});
});