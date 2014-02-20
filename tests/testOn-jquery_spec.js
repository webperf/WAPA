var WAPA = require('../wapa').WAPA;

var w = new WAPA({analyzers: ['on-event-jquery']});

describe('on-event-jquery', function() {

	

	it('should listen parent node with jQuery "on" function', function (){
		var source = [
		        'var trs = $("#table tr")', 
			    'for(var i=0;i<trs.length;i++){',
                '$(trs[i]).on("click",function(){})',
			    '}'
		].join("\n");
		var report = w.analyze('on-event-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(3);
		});
	});

	it('should listen parent node with jQuery "on" function', function (){
		var source = [
		        'var trs = $("#table tr")', 
			    'for(var i=0;i<trs.length;i++){',
                '$("#table td").on("click",function(){})',
			    '}'
		].join("\n");
		var report = w.analyze('on-event-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
	});

	it('should listen parent node with jQuery "on" function', function (){
		var source = [
		        'var trs = jQuery("#table tr")', 
			    'for(var i=0;i<trs.length;i++){',
                '$(trs[i]).on("click",function(){})',
			    '}'
		].join("\n");
		var report = w.analyze('on-event-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(3);
		});
	});


	it('should listen parent node with jQuery "on" function', function (){
		var source = [
		        'var trs = jQuery("#table").find("tr")', 
			    'for(var i=0;i<trs.length;i++){',
                '$(trs[i]).on("click",function(){})',
			    '}'
		].join("\n");
		var report = w.analyze('on-event-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(3);
		});
	});

    it('should listen parent node with jQuery "on" function', function (){
		var source = [
		        'var trs = jQuery("#table")', 
			    'for(var i=0;i<trs.length;i++){',
                '$(trs[i]).on("click",function(){})',
			    '}'
		].join("\n");
		var report = w.analyze('on-event-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(3);
		});
	});

	
	it('should not report listen parent node not in loop', function () {
		var source = [
		        'var trs = jQuery("#table")', 
                '$(trs).on("click",function(){})'
		].join("\n");
		var report = w.analyze('on-event-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

});
