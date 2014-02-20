var WAPA = require('../wapa').WAPA;

var fs = require('fs');

var w = new WAPA({analyzers: ['arch-css']});

describe('arch-css', function() {

	it('should report correct position', function (){
		var source = '.my-style {color: red;}';
		var report = w.analyze('test.css', source, '.css');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});
	});

	it('should skip single line comment', function (){
		var source = '/* test */.my-style {color: red;}';
		var report = w.analyze('test.css', source, '.css');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(11);
		});
	});

	it('should skip multiple line comment', function (){
		var source = '/* test comment \n test comment\n test comment\n*/\n.my-style {color: red;}';
		var report = w.analyze('test.css', source, '.css');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(5);
			expect(log.column).toBe(1);
		});
	});

});