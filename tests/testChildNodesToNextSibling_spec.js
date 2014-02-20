var WAPA = require('../wapa').WAPA;

var w = new WAPA({analyzers: ['childNodesToNextSibling-analyzer']});

describe('childNodesToNextSibling-analyzer', function() {

	it('should notify when using childNodes to traverse child nodes at line 1, column 16', function (){
		var report = w.analyze('test.js', 'var children = document.getElementById("testDiv").childNodes;', '.js');

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(16);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(16);
		});
	});
	
});