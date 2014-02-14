var WAPA = require('../wapa').WAPA;

var w = new WAPA({analyzers: ['putCollectionToArray-analyzer']});

describe('putCollectionToArray-analyzer', function() {

	it('should notify when using getElementsByName in for loop at line 1, column 77', function (){
		var report = w.analyze('test.js', 'var arr = document.getElementsByName(); for(var i = 0; i < arr.length; i++){arr[i].innerHTML = content;}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(77);
		});
	});

	it('should notify when using getElementsByName in for loop at line 1, column 80', function (){
		var report = w.analyze('test.js', 'var arr = document.getElementsByTagName(); for(var i = 0; i < arr.length; i++){arr[i].innerHTML = content;}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(80);
		});
	});

	it('should notify when using getElementsByName in for loop at line 1, column 82', function (){
		var report = w.analyze('test.js', 'var arr = document.getElementsByClassName(); for(var i = 0; i < arr.length; i++){arr[i].innerHTML = content;}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(82);
		});
	});

	it('should notify when using getElementsByName in for loop at line 1, column 63', function (){
		var report = w.analyze('test.js', 'var arr = document.getElementsByName(); while(i < arr.length){arr[i].innerHTML = content;}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(63);
		});
	});

	it('should notify when using getElementsByName in for loop at line 1, column 44', function (){
		var report = w.analyze('test.js', 'var arr = document.getElementsByName(); do{arr[i].innerHTML = content;}while(i < arr.length)', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(44);
		});
	});
});