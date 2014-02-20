var WAPA = require('../wapa').WAPA;

var w = new WAPA({analyzers: ['revokeObjectURL']});

describe('revokeObjectURL', function() {

	
//  in the  "for( i in list)" expression,the type of the list like '{}' is object  
     it('should alarm when not calling revokeObjectURL after any vender prefixed createObjectURL', function (){
		var source = [
		'function myfunc(blob) {',
		'var url1 = webkitURL.createObjectURL(blob);',
		'var url2 = mozURL.createObjectURL(blob);',
		'var url3 = msURL.createObjectURL(blob);',
		'var url4 = oURL.createObjectURL(blob);',
		'var url5 = URL.createObjectURL(blob);',
		'}'
	    ].join('\n');
		var report = w.analyze('revokeObjectURL.js', source, '.js');
		var chromeReport = report.filter('chrome')._logs;
		expect(chromeReport.length).toBe(5);
		expect(chromeReport[0].line).toBe(2);
		expect(chromeReport[0].column).toBe(22);

		expect(chromeReport[1].line).toBe(3);
		expect(chromeReport[1].column).toBe(19);

		expect(chromeReport[2].line).toBe(4);
		expect(chromeReport[2].column).toBe(18);

		expect(chromeReport[3].line).toBe(5);
		expect(chromeReport[3].column).toBe(17);

		expect(chromeReport[4].line).toBe(6);
		expect(chromeReport[4].column).toBe(16);
		
	});


	it('should not alarm when not calling any vender prefixed revokeObjectURL after any vender prefixed createObjectURL', function(){
	var source = [
		'function myfunc(blob) {',
		'var url1 = webkitURL.createObjectURL(blob);',
		'var url2 = mozURL.createObjectURL(blob);',
		'var url3 = msURL.createObjectURL(blob);',
		'var url4 = oURL.createObjectURL(blob);',
		'var url5 = URL.createObjectURL(blob);',
		'URL.revokeObjectURL(url5);',
		'oURL.revokeObjectURL(url4);',
		'msURL.revokeObjectURL(url3);',
		'mozURL.revokeObjectURL(url2);',
		'webkitURL.revokeObjectURL(url1);',
		'}'
	].join('\n');
	var report = w.analyze('revokeObjectURL.js', source, '.js');
		var chromeReport = report.filter('chrome')._logs;
		expect(chromeReport.length).toBe(0);
	});

	it('should alarm when not calling revokeObjectURL after window.xURL.createObjectURL', function(){
	var source = [
		'function myfunc(blob) {',
		'var url1 = window.webkitURL.createObjectURL(blob);',
		'var url2 = window.mozURL.createObjectURL(blob);',
		'var url3 = window.msURL.createObjectURL(blob);',
		'var url4 = window.oURL.createObjectURL(blob);',
		'var url5 = window.URL.createObjectURL(blob);',
		'}'
	].join('\n');
	var report = w.analyze('revokeObjectURL.js', source, '.js');
		var chromeReport = report.filter('chrome')._logs;
		expect(chromeReport.length).toBe(5);

		expect(chromeReport[0].line).toBe(2);
		expect(chromeReport[0].column).toBe(29);

		expect(chromeReport[1].line).toBe(3);
		expect(chromeReport[1].column).toBe(26);

		expect(chromeReport[2].line).toBe(4);
		expect(chromeReport[2].column).toBe(25);

		expect(chromeReport[3].line).toBe(5);
		expect(chromeReport[3].column).toBe(24);

		expect(chromeReport[4].line).toEqual(6);
		expect(chromeReport[4].column).toEqual(23);
	
	});


	it('should not alarm when not calling any window.xURL.revokeObjectURL after any window.xURL.createObjectURL', function(){
	var source = [
		'function myfunc(blob) {',
		'var url1 = window.webkitURL.createObjectURL(blob);',
		'var url2 = window.mozURL.createObjectURL(blob);',
		'var url3 = window.msURL.createObjectURL(blob);',
		'var url4 = window.oURL.createObjectURL(blob);',
		'var url5 = window.URL.createObjectURL(blob);',
		'window.URL.revokeObjectURL(url5);',
		'window.oURL.revokeObjectURL(url4);',
		'window.msURL.revokeObjectURL(url3);',
		'window.mozURL.revokeObjectURL(url2);',
		'window.webkitURL.revokeObjectURL(url1);',
		'}'
	].join('\n');
	var report = w.analyze('revokeObjectURL.js', source, '.js');
		var chromeReport = report.filter('chrome')._logs;
		expect(chromeReport.length).toBe(0);
	});


	it('should not alarm when calling revokeObjectURL after createObjectURL', function(){
	var source = [
		'function myfunc(blob) {',
		'var url = URL.createObjectURL(blob);',
		'console.log(url);',
		'URL.revokeObjectURL(url);',
		'}'
	].join('\n');
	var report = w.analyze('revokeObjectURL.js', source, '.js');
		var chromeReport = report.filter('chrome')._logs;
		expect(chromeReport.length).toBe(0);
	});

	it('should alarm when not calling revokeObjectURL after createObjectURL without function', function(){
	var source = [
		'var url = URL.createObjectURL(blob);'
	].join('\n');
	var report = w.analyze('revokeObjectURL.js', source, '.js');
		var chromeReport = report.filter('chrome')._logs;
		expect(chromeReport.length).toBe(1);
		expect(chromeReport[0].line).toBe(1);
		expect(chromeReport[0].column).toBe(15);
	
	});

	it('should not alarm when calling revokeObjectURL after createObjectURL without function', function(){
	var source = [
		'var url = URL.createObjectURL(blob);',
		'console.log(url);',
		'URL.revokeObjectURL(url)'
	
	].join('\n');
	var report = w.analyze('revokeObjectURL.js', source, '.js');
		var chromeReport = report.filter('chrome')._logs;
		expect(chromeReport.length).toBe(0);
	});

	it('should alarm when a variable assigned by xURL.createObjectURL is not revoked by xURL.revokeObjectURL', function(){
	var source = [
		'function myfunc(blob) {',
		'var url1 = URL.createObjectURL(blob);',
		'var url2 = URL.createObjectURL(blob);',
		'URL.revokeObjectURL(url1);',
		'}'
	].join('\n');

	var report = w.analyze('revokeObjectURL.js', source, '.js');
		var chromeReport = report.filter('chrome')._logs;
		expect(chromeReport.length).toBe(1);
		expect(chromeReport[0].line).toBe(3);
		expect(chromeReport[0].column).toBe(16);

	});

	it('should alarm when a variable assigned by xURL.createObjectURL is revoked multiple times by xURL.revokeObjectURL', function(){
	var source = [
		'function myfunc(blob) {',
		'var url1 = URL.createObjectURL(blob);',
		'var url2 = URL.createObjectURL(blob);',
		'URL.revokeObjectURL(url1);',
		'URL.revokeObjectURL(url1);',
		'}'
	].join('\n');


	var report = w.analyze('revokeObjectURL.js', source, '.js');
		var chromeReport = report.filter('chrome')._logs;
		expect(chromeReport.length).toBe(1);
		expect(chromeReport[0].line).toBe(3);
		expect(chromeReport[0].column).toBe(16);
	
	});

	it('should alarm when general xURL.createObjectURL calls are more than xURL.revokeObjectURL calls', function(){
	var source = [
		'function myfunc(blob1) {',
		'obj.url1 = URL.createObjectURL(blob1);',
		'obj.url2 = URL.createObjectURL(blob2);',
		'URL.revokeObjectURL(obj.url1);',
		'}'
	].join('\n');
	var report = w.analyze('revokeObjectURL.js', source, '.js');
		var chromeReport = report.filter('chrome')._logs;
		expect(chromeReport.length).toBe(0);
       
	});


	it('should alarm when general xURL.createObjectURL calls are more than xURL.revokeObjectURL calls', function(){
	var source = [
		'function myfunc(blob1) {',
		'this.url1 = URL.createObjectURL(blob1);',
		'this.url2 = URL.createObjectURL(blob2);',
		'URL.revokeObjectURL(this.url1);',
		'}'
	].join('\n');
	var report = w.analyze('revokeObjectURL.js', source, '.js');
		var chromeReport = report.filter('chrome')._logs;
		expect(chromeReport.length).toBe(0);
       
	});


	it('should alarm when general xURL.createObjectURL calls are less than xURL.revokeObjectURL calls', function(){
	var source = [
		'function myfunc(blob1) {',
		'obj.url1 = URL.createObjectURL(blob1);',
		'obj.url2 = URL.createObjectURL(blob2);',
		'URL.revokeObjectURL(obj.url1);',
		'URL.revokeObjectURL(obj.url2);',
		'URL.revokeObjectURL(obj.url2);',
		'}'
	].join('\n');

	var report = w.analyze('revokeObjectURL.js', source, '.js');
		var chromeReport = report.filter('chrome')._logs;
		expect(chromeReport.length).toBe(0);
		

	
	});


	it('should not alarm when single xURL.revokeObjectURL calls', function(){
	var source = [
		'function myfunc(url) {',
		'URL.revokeObjectURL(url);',
		'}'
	].join('\n');

	var report = w.analyze('revokeObjectURL.js', source, '.js');
		var chromeReport = report.filter('chrome')._logs;
		expect(chromeReport.length).toBe(0);

	
	});

	it('should not alarm when xURL.createObjectURL and xURL.revokeObjectURL calls exist in different scope', function(){
	var source = [
		'function create(blob) {',
		'return URL.createObjectURL(blob);',
		'}',
		'function revoke(url) {',
		'URL.revokeObjectURL(url);',
		'}',
		'var url = create(blob);',
		'revoke(url);'
	].join('\n');
	var report = w.analyze('revokeObjectURL.js', source, '.js');
		var chromeReport = report.filter('chrome')._logs;
		expect(chromeReport.length).toBe(0);

	});


	it('should not alarm for multiple vendor prefix detection', function(){
	var source = [
		'var URL = window.URL || window.webkitURL || window.mozURL || window.msURL || window.oURL;',
		'var url = URL.createObjectURL(blob);',
		'URL.revokeObjectURL(url);'
	].join('\n');
	var report = w.analyze('revokeObjectURL.js', source, '.js');
		var chromeReport = report.filter('chrome')._logs;
		expect(chromeReport.length).toBe(0);

	});

	//add by ywq 2012-11-17
	it('should alarm when not calling revokeObjectURL after any vender prefixed createObjectURL', function(){
	var source = [
	    'var url1 = URL.createObjectURL(blob);',
		'var url2 = URL.createObjectURL(blob);',
		'URL.revokeObjectURL(url2)',
		'function myfunc(blob) {',
		'var url1 = webkitURL.createObjectURL(blob);',
		'var url2 = mozURL.createObjectURL(blob);',
		'var url3 = msURL.createObjectURL(blob);',
		'var url4 = oURL.createObjectURL(blob);',
		'function myfunc(blob) {',
		'var url1 = URL.createObjectURL(blob);',
		'var url2 = URL.createObjectURL(blob);',
		'URL.revokeObjectURL(url1);',
		'}',
		'var url5 = URL.createObjectURL(blob);',
		'}'

	].join('\n');


	var report = w.analyze('revokeObjectURL.js', source, '.js');
		var chromeReport = report.filter('chrome')._logs;
		expect(chromeReport.length).toBe(7);
		expect(chromeReport[0].line).toBe(11);
		expect(chromeReport[0].column).toBe(16);

		expect(chromeReport[1].line).toBe(5);
		expect(chromeReport[1].column).toBe(22);

		expect(chromeReport[2].line).toBe(6);
		expect(chromeReport[2].column).toBe(19);
		
		expect(chromeReport[3].line).toBe(7);
		expect(chromeReport[3].column).toBe(18);

		expect(chromeReport[4].line).toBe(8);
		expect(chromeReport[4].column).toBe(17);
		
		expect(chromeReport[5].line).toBe(14);
		expect(chromeReport[5].column).toBe(16);

		expect(chromeReport[6].line).toBe(1);
		expect(chromeReport[6].column).toBe(16);

	
	});


    //add by ywq 2012-11-21
	it('should alarm when general xURL.createObjectURL calls are less than xURL.revokeObjectURL calls', function(){
	var source = [
		'function myfunc(blob1) {',
		'obj.url1 = URL.createObjectURL(blob1);',
		'obj.url2 = URL.createObjectURL(blob2);',
		'URL.revokeObjectURL(obj.url1);',
		'URL.revokeObjectURL(obj.url2);',
		'}'
	].join('\n');
	var report = w.analyze('revokeObjectURL.js', source, '.js');
		var chromeReport = report.filter('chrome')._logs;
		expect(chromeReport.length).toBe(0);
	});


	it('should not alarm for multiple vendor prefix detection', function(){
	var source = [
		'function fc(){',
		'var url1 = URL.createObjectURL(blob1);',
		'URL.revokeObjectURL(url1);',
		'url1 = URL.createObjectURL(blob2);',
		'URL.revokeObjectURL(url1);',
		'}'
	].join('\n');
	var report = w.analyze('revokeObjectURL.js', source, '.js');
		var chromeReport = report.filter('chrome')._logs;
		expect(chromeReport.length).toBe(0);

	});

	it('should not alarm for multiple vendor prefix detection', function(){
	var source = [
		'function fc(){',
		'var url1 = URL.createObjectURL(blob1);',
		'URL.revokeObjectURL(url1);',
		'url1 = URL.createObjectURL(blob2);',
		'}'
	].join('\n');
	var report = w.analyze('revokeObjectURL.js', source, '.js');
		var chromeReport = report.filter('chrome')._logs;
		expect(chromeReport.length).toBe(1);
		expect(chromeReport[0].line).toBe(4);
		expect(chromeReport[0].column).toBe(12);

	});
})