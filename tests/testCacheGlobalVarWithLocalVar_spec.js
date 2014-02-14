var WAPA = require('../wapa').WAPA;

var fs = require('fs');

var w = new WAPA({analyzers: ['cacheGlobalVarWithLocalVar-analyzer']});

describe('cacheGlobalVarWithLocalVar-analyzer', function() {

	it('should notify cache global variable with local variable.', function (){
		var source_file = './testapps/testDataAccess4.js';
		var source = fs.readFileSync(source_file, 'utf-8');
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(5);
			expect(log.column).toBe(5);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(5);
			expect(log.column).toBe(5);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(5);
			expect(log.column).toBe(5);
		});
	});

	it('should not notify cache global variable with local variable.', function (){
		var source_file = './testapps/testDataAccess4-2.js';
		var source = fs.readFileSync(source_file, 'utf-8');
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		
	});

	it('should not notify cache global variable with local variable.', function (){
		var source_file = './testapps/testDataAccess4-3.js';
		var source = fs.readFileSync(source_file, 'utf-8');
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		
	});

	it('should notify cache global variable with local variable.', function (){
		var source_file = './testapps/testDataAccess4-4.js';
		var source = fs.readFileSync(source_file, 'utf-8');
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(5);
			expect(log.column).toBe(5);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(5);
			expect(log.column).toBe(5);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(5);
			expect(log.column).toBe(5);
		});
	});

	it('should not notify cache global variable with local variable.', function (){
		var source_file = './testapps/testDataAccess4-5.js';
		var source = fs.readFileSync(source_file, 'utf-8');
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		
	});


	it('should notify cache global variable with local variable.', function (){
		var source_file = './testapps/testDataAccess4-6.js';
		var source = fs.readFileSync(source_file, 'utf-8');
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(2);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(2);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(2);
		});
	});

	it('should notify cache global variable with local variable.', function (){
		var source_file = './testapps/testDataAccess4-7.js';
		var source = fs.readFileSync(source_file, 'utf-8');
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(2);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(2);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(2);
		});
	});

	it('should not notify cache global variable with local variable.', function (){
		var source_file = './testapps/testDataAccess4-8.js';
		var source = fs.readFileSync(source_file, 'utf-8');
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		
	});
	
});