var WAPA = require('../wapa').WAPA;

var w = new WAPA({analyzers: ['forEach-analyzer']});

describe('forEach-analyzer', function() {

	it('should report using forEach to traverse an array at line 1, column 32', function (){
		var report = w.analyze('test.js', 'var arr = new Array("1", "2"); arr.forEach(function(elem){alert(elem);});', '.js');
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


	it('should report using forEach to traverse an array at line 1, column 32', function (){
		var report = w.analyze('test.js', 'var arr = new Array("1", "2"); arr.slice(1).forEach(function(elem){alert(elem);});', '.js');
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

	it('should report using forEach to traverse an array at line 1, column 1', function (){
		var report = w.analyze('test.js', 'Array.prototype.slice.call(collection).forEach(function(elem){alert(elem);});', '.js');
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

	it('should report using forEach to traverse an array at line 1, column 1', function (){
		var report = w.analyze('test.js', 'new Array("1", "2").forEach(function(elem){alert(elem);});', '.js');
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

	it('should report using forEach to traverse an array at line 1, column 1', function (){
		var report = w.analyze('test.js', '["1", "2"].forEach(function(elem){alert(elem);});', '.js');
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

	it('should not report using forEach defined by developers to do own business', function (){
		var report = w.analyze('test.js', 'function MyClass(){this.forEach = function(){}} var obj = new MyClass(); obj.forEach();', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);


		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);


		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
	});
	
});