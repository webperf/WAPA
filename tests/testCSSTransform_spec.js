// 1. translate/rotate/scale -> xxx3d
// 2. matrix -> xxx3d
// 3. valid css
// 4. -webkit-transform/-ms-/-moz-/-o-
var WAPA = require('../wapa').WAPA;

var fs = require('fs');

var w = new WAPA({analyzers: ['CSSTransform-analyzer']});

describe('CSSTransform-analyzer', function() {

	it('should detect 3D rotation', function (){
		var source_file = './testapps/testCSSTransform1.css';
		var source = fs.readFileSync(source_file, 'utf-8');
		var report = w.analyze('test.css', source, '.css');
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

		var winrtReport = report.filter('winrt');
		expect(winrtReport.length).toBe(1);
		winrtReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});

		var operaReport = report.filter('opera');
		expect(operaReport.length).toBe(1);
		operaReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});
	});
	
	it('should detect translate in webkit', function (){
		var source_file = './testapps/testCSSTransform2.css';
		var source = fs.readFileSync(source_file, 'utf-8');
		var report = w.analyze('test.css', source, '.css');
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

		var winrtReport = report.filter('winrt');
		expect(winrtReport.length).toBe(1);
		winrtReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});

		var operaReport = report.filter('opera');
		expect(operaReport.length).toBe(1);
		operaReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});
	});


	it('should detect translate in firefox', function (){
		var source_file = './testapps/testCSSTransform3.css';
		var source = fs.readFileSync(source_file, 'utf-8');
		var report = w.analyze('test.css', source, '.css');
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

		var winrtReport = report.filter('winrt');
		expect(winrtReport.length).toBe(1);
		winrtReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});

		var operaReport = report.filter('opera');
		expect(operaReport.length).toBe(1);
		operaReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});
	});

	it('should detect rotation', function (){
		var source_file = './testapps/testCSSTransform4.css';
		var source = fs.readFileSync(source_file, 'utf-8');
		var report = w.analyze('test.css', source, '.css');
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

		var winrtReport = report.filter('winrt');
		expect(winrtReport.length).toBe(1);
		winrtReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});

		var operaReport = report.filter('opera');
		expect(operaReport.length).toBe(1);
		operaReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});
	});

	it('should  detect translate', function (){
		var source_file = './testapps/testCSSTransform5.css';
		var source = fs.readFileSync(source_file, 'utf-8');
		var report = w.analyze('test.css', source, '.css');
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

		var winrtReport = report.filter('winrt');
		expect(winrtReport.length).toBe(1);
		winrtReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});

		var operaReport = report.filter('opera');
		expect(operaReport.length).toBe(1);
		operaReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});
	});

	it('should detect matrix', function (){
		var source_file = './testapps/testCSSTransform6.css';
		var source = fs.readFileSync(source_file, 'utf-8');
		var report = w.analyze('test.css', source, '.css');
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

		var winrtReport = report.filter('winrt');
		expect(winrtReport.length).toBe(1);
		winrtReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});

		var operaReport = report.filter('opera');
		expect(operaReport.length).toBe(1);
		operaReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});
	});

	it('should not detect anything', function (){
		var source_file = './testapps/testCSSTransform7.css';
		var source = fs.readFileSync(source_file, 'utf-8');
		var report = w.analyze('test.css', source, '.css');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		

		var winrtReport = report.filter('winrt');
		expect(winrtReport.length).toBe(0);
		

		var operaReport = report.filter('opera');
		expect(operaReport.length).toBe(0);
		
	});
	
});