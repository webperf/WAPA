var WAPA = require('../wapa').WAPA;

var w = new WAPA({analyzers: ['toLocaleString-analyzer']});

describe('toLocaleString-analyzer', function() {

	it('should report using toLocaleString to convert a array to String at line 1, column 11', function (){
		var report = w.analyze('test.js', 'var str = new Array("1", "2").toLocaleString();', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(11);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(11);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});



	it('should report using toLocaleString to convert a array to String at line 1, column 11', function (){
		var report = w.analyze('test.js', 'var str = ["1", "2"].toLocaleString();', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(11);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(11);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	it('should report using toLocaleString to convert a array to String at line 1, column 43', function (){
		var report = w.analyze('test.js', 'var array = new Array("1","2"); var str = array.toLocaleString();', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(43);
		});


		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(43);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});


	it('should report using toLocaleString to convert a array to String at line 1, column 35', function (){
		var report = w.analyze('test.js', 'var array = ["1", "2"]; var str = array.toLocaleString();', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(35);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(35);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});


	it('should report using toLocaleString to convert a array to String at line 1, column 35', function (){
		var report = w.analyze('test.js', 'var array = ["1", "2"]; var str = array.slice(0).toLocaleString();', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(35);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(35);
		});


		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);

	});



	it('should not report using toLocaleString to convert date to String', function (){
		var report = w.analyze('test.js', 'var v_date = new Date(); var str = v_date.toLocaleString();', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	it('should not report if toLocaleString is used on the param of a function', function (){
		var report = w.analyze('test.js', 'function test(param){param.toLocaleString();}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	it('should not report if toLocaleString is used on the param of a function even if there is a same param defined before', function (){
		var report = w.analyze('test.js', 'var param = new Array("1");function test(param){param.toLocaleString();}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

});