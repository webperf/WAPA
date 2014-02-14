var WAPA = require('../wapa').WAPA;

var w = new WAPA({analyzers: ['sample-analyzer-jquery'], libraries: ['jquery']});

describe('sample-analyzer-jquery', function() {

	it('should be loaded correctly', function (){
		var analyzers = w.loadedAnalyzers();
		expect(analyzers.length).toBe(1);
		expect(analyzers[0]).toBe('sample-analyzer-jquery');
	});

	it('should report $id as type "jQuery" (var $id = $("#id");$id)', function (){
		var report = w.analyze('test.js', 'var $id = $("#id");$id', '.js');
		var jqueryReport = report.filter('chrome');
		expect(jqueryReport.length).toBe(2);
		jqueryReport.each(function (log, i){
			if (i === 1) {
				expect(log.msg.name).toBe('$id');
				expect(log.msg.type).toBe('jQuery');
			}
		});
	});

});