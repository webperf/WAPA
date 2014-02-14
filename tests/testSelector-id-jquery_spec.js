var WAPA = require('../wapa').WAPA;

var w = new WAPA({analyzers: ['selector-id-jquery']});

describe('selector-id-jquery', function() {

	it('should report to reduce redundant selector around #id', function (){
		var source = [
			    'var e = $("#div1 a");'
		].join("\n");
		var report = w.analyze('selector-id-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	it('should report to reduce redundant selector around #id', function (){
		var source = [
			    'var e = $("ul #div1 a");'
		].join("\n");
		var report = w.analyze('selector-id-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(9);
		});
	});

	it('should report to reduce redundant selector around #id', function (){
		var source = [
			    'var e = $("#div #div1 a");'
		].join("\n");
		var report = w.analyze('selector-id-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(9);
		});
	});

	it('should not report to reduce redundant selector around #id', function (){
		var source = [
			  ' function fc(){',
			  'var e = $("#div1 a")',
			  '}',
		].join("\n");
		var report = w.analyze('selector-id-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	it('should report to reduce redundant selector around #id', function (){
		var source = [
		        'function fc(){',
			    'var e = $("ul #div1 a");',
			    '}',
		].join("\n");
		var report = w.analyze('selector-id-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(2);
			expect(log.column).toBe(9);
		});
	});

	it('should report to reduce redundant selector around #id', function (){
		var source = [
		         'function fc(){',
			     'var e = $("#div #div1 a");',
			     '}',
		].join("\n");
		var report = w.analyze('selector-id-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(2);
			expect(log.column).toBe(9);
		});
	});

});
