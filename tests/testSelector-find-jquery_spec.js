var WAPA = require('../wapa').WAPA;

var w = new WAPA({analyzers: ['selector-find-jquery']});

describe('selector-find-jquery', function() {

	

	it('should report using $().find', function (){
		var source = [
			    'var e = $("#div1  a");'
		].join("\n");
		var report = w.analyze('selector-find-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		  chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(9);
		});
	});

	it('should report using $().find', function (){
		var source = [
			    'var e = $("ul #div1 a");'
		].join("\n");
		var report = w.analyze('selector-find-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(9);
		});
	});



	it('should report using $().find', function (){
		var source = [
			  'function fc(){',
			  'var e = $("#div1 a")',
			  '}',
		].join("\n");
		var report = w.analyze('selector-find-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		  chromeReport.each(function(log, i){
			expect(log.line).toBe(2);
			expect(log.column).toBe(9);
		});
	});

	it('should report using $().find', function (){
		var source = [
		        'function fc(){',
			    'var e = $("ul #div a");',
			    '}',
		].join("\n");
		var report = w.analyze('selector-find-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(2);
			expect(log.column).toBe(9);
		});
	});

});
