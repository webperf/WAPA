var WAPA = require('../wapa').WAPA;

var w = new WAPA({analyzers: ['reduceWith-analyzer']});

describe('reduceWith-analyzer', function() {

	it('should notify reduce using function \'with\' statement in key function or only using it when absolutely necessary.', function (){
		var report = w.analyze('test.js', 'with (document){var bd = body,links = getElementsByTagName("a");}', '.js');
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
	
});