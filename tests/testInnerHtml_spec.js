var WAPA = require('../wapa').WAPA;

var w = new WAPA({analyzers: ['innerHtml-analyzer']});

describe('innerHtml-analyzer', function() {

	it('should notify change createTextNode to innerHtml at line1, column 15', function (){
		var report = w.analyze('test.js', 'var newtext = document.createTextNode("First");', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(15);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(15);
		});
	});

	it('should not notify change createTextNode to innerHtml', function (){
		var report = w.analyze('test.js', 'testDiv.innerHTML = "Hello World"', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);

	});
	
});