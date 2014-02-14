var WAPA = require('../wapa').WAPA;

var w = new WAPA({analyzers: ['requestAnimationFrame-analyzer']});

describe('requestAnimationFrame-analyzer', function() {

	it('should report using setTimeout() at line 1, column 17', function (){
		var report = w.analyze('test.js', 'function test(){setTimeout(test, intervalTime);}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(17);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(17);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(17);
		});

		var rtReport = report.filter('winrt');
		expect(rtReport.length).toBe(1);
		rtReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(17);
		});

		var operaReport = report.filter('opera');
		expect(operaReport.length).toBe(1);
		operaReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(17);
		});
	});

	it('should report using setTimeout() at line 1, column 17', function (){
		var report = w.analyze('test.js', 'function test(){self.setTimeout(test, intervalTime);}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(17);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(17);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(17);
		});

		var rtReport = report.filter('winrt');
		expect(rtReport.length).toBe(1);
		rtReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(17);
		});

		var operaReport = report.filter('opera');
		expect(operaReport.length).toBe(1);
		operaReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(17);
		});
	});
	

	it('should not report using setTimeout()', function (){
		var report = w.analyze('test.js', 'function test(){setTimeout(test1, intervalTime);}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		

		var rtReport = report.filter('winrt');
		expect(rtReport.length).toBe(0);
		

		var operaReport = report.filter('opera');
		expect(operaReport.length).toBe(0);
	});


	it('should not report using setTimeout() if there is more than one function', function (){
		var report = w.analyze('test.js', 'function test1(){function test(){setTimeout(test1, intervalTime);}}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		

		var rtReport = report.filter('winrt');
		expect(rtReport.length).toBe(0);
		

		var operaReport = report.filter('opera');
		expect(operaReport.length).toBe(0);
	});


	it('should report using setTimeout() at line 1, column 34', function (){
		var report = w.analyze('test.js', 'function test1(){function test(){setTimeout(test, intervalTime);}}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(34);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(34);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(34);
		});

		var rtReport = report.filter('winrt');
		expect(rtReport.length).toBe(1);
		rtReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(34);
		});

		var operaReport = report.filter('opera');
		expect(operaReport.length).toBe(1);
		operaReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(34);
		});
	});
	
});