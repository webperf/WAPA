var WAPA = require('../wapa').WAPA;

var fs = require('fs');

var w = new WAPA({analyzers: ['loadingScript-analyzer']});

describe('loadingScript-analyzer', function() {

	it('should notify move the <script> tag to the bottom of <body> tag', function (){
		var source_file = './testapps/testLoadingScripts1.html';
		var source = fs.readFileSync(source_file, 'utf-8');
		var report = w.analyze('test.html', source, '.html');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(2);
		ieReport.each(function(log, i){
			if(i === 0){
				expect(log.line).toBe(14);
				expect(log.column).toBe(5);
			}else if(i === 1){
				expect(log.line).toBe(17);
				expect(log.column).toBe(5);
			}
			
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(2);
		ffReport.each(function(log, i){
			if(i === 0){
				expect(log.line).toBe(14);
				expect(log.column).toBe(5);
			}else if(i === 1){
				expect(log.line).toBe(17);
				expect(log.column).toBe(5);
			}
			
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(2);
		chromeReport.each(function(log, i){
			if(i === 0){
				expect(log.line).toBe(14);
				expect(log.column).toBe(5);
			}else if(i === 1){
				expect(log.line).toBe(17);
				expect(log.column).toBe(5);
			}
			
		});

		var winrtReport = report.filter('winrt');
		expect(winrtReport.length).toBe(2);
		winrtReport.each(function(log, i){
			if(i === 0){
				expect(log.line).toBe(14);
				expect(log.column).toBe(5);
			}else if(i === 1){
				expect(log.line).toBe(17);
				expect(log.column).toBe(5);
			}
			
		});

		var operaReport = report.filter('opera');
		expect(operaReport.length).toBe(2);
		operaReport.each(function(log, i){
			if(i === 0){
				expect(log.line).toBe(14);
				expect(log.column).toBe(5);
			}else if(i === 1){
				expect(log.line).toBe(17);
				expect(log.column).toBe(5);
			}
			
		});
	});

	it('should notify move the <script> tag to the bottom of <body> tag', function (){
		var source_file = './testapps/testLoadingScripts2.html';
		var source = fs.readFileSync(source_file, 'utf-8');
		var report = w.analyze('test.html', source, '.html');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(12);
			expect(log.column).toBe(13);
		});
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(12);
			expect(log.column).toBe(13);
		});
		

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(12);
			expect(log.column).toBe(13);
		});

		var winrtReport = report.filter('winrt');
		expect(winrtReport.length).toBe(1);
		winrtReport.each(function(log, i){
			expect(log.line).toBe(12);
			expect(log.column).toBe(13);
		});

		var operaReport = report.filter('opera');
		expect(operaReport.length).toBe(1);
		operaReport.each(function(log, i){
			expect(log.line).toBe(12);
			expect(log.column).toBe(13);
		});
		
	});
	
	it('should not notify because <script> is at the bottom of <body>', function (){
		var source_file = './testapps/testLoadingScripts3.html';
		var source = fs.readFileSync(source_file, 'utf-8');
		var report = w.analyze('test.html', source, '.html');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);

		var winrtReport = report.filter('winrt');
		expect(winrtReport.length).toBe(0);

		var operaReport = report.filter('opera');
		expect(operaReport.length).toBe(0);
		
	});
});