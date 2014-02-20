var WAPA = require('../wapa').WAPA;

var w = new WAPA({analyzers: ['addClass-jquery']});

describe('addClass-jquery', function() {

	

	it('should use jquery addClass function instead of css function', function (){
		var source = [
			    '$("#div").css("display","none");'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});
	});


	it('should use jquery addClass function instead of css function', function (){
		var source = [
			    '$("#div").append("<a></a>").css("display","none");'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});
	});


	it('should use jquery addClass function instead of css function', function (){
		var source = [
			    '$("#div").css({"display":"none"}).css("background-color","red");',
			    '$("#div").css({"display":"none"});'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(2);
		var errLogs = [{line:1,column:1},{line:2,column:1}]
		chromeReport.each(function(log, i){
			expect(log.line).toBe(errLogs[i].line);
			expect(log.column).toBe(errLogs[i].column);
		});
	});

	it('should use jquery addClass function instead of css function', function (){
		var source = [
			    '$("#div").css({"display":"none"}).css("background-color","red");',
			    '$("#div").css({"display":"none"});',
			    '$("#div").append("<a></a>").css("background-color","red");',
			    '$("#div").css({"display":"none"});'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(4);
		var errLogs = [{line:1,column:1},{line:2,column:1},{line:3,column:1},{line:4,column:1}]
		chromeReport.each(function(log, i){
			expect(log.line).toBe(errLogs[i].line);
			expect(log.column).toBe(errLogs[i].column);
		});
	});


   it('should use jquery addClass function instead of css function', function (){
		var source = [
		        'var jq = $("#div")',
			    'jq.css({"display":"none"}).css("background-color","red");',
			    'jq.css({"display":"none"});'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(2);
		var errLogs = [{line:2,column:1},{line:3,column:1}]
		chromeReport.each(function(log, i){
			expect(log.line).toBe(errLogs[i].line);
			expect(log.column).toBe(errLogs[i].column);
		});
	});

   it('should use jquery addClass function instead of css function', function (){
		var source = [
		        'var jq1 = jQuery("#div")',
			    'jq1.css({"display":"none"}).css("background-color","red");',
			    '$("#div2").css({"display":"none"});',
			    'var jq2 = $("#div3")',
			    'jq2.css({"display":"none"}).css("background-color","red");'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(3);
		var errLogs = [{line:2,column:1},{line:3,column:1},{line:5,column:1}]
		chromeReport.each(function(log, i){
			expect(log.line).toBe(errLogs[i].line);
			expect(log.column).toBe(errLogs[i].column);
		});
	});

    it('should use jquery addClass function instead of css function', function (){
		var source = [
		        'var jq = $("#div").find("a")',
			    'jq.css({"display":"none"});'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		var errLogs = [{line:2,column:1}];
		chromeReport.each(function(log, i){
			expect(log.line).toBe(errLogs[i].line);
			expect(log.column).toBe(errLogs[i].column);
		});
	});

	/**
	 * New added test cases
	 */

	
	it('should not notify if the second param is a variable', function (){
		var source = [
		        'var jq = $("#div");',
		        'var x = getX();',
			    'jq.css("font-size", x);'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
	});

	it('should not notify if the second param is a variable', function (){
		var source = [
		        'var jq = $("#div");',
		        'var x = getX();',
			    'jq.css("font-size", x + "px");'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
	});

	it('should notify if the second param is a variable but can be judged to be a literal', function (){
		var source = [
		        'var jq = $("#div");',
		        'var x = "10px";',
			    'jq.css("font-size", x);'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
	});

	it('should notify if the second param is a variable but can be judged to be a literal', function (){
		var source = [
		        'var jq = $("#div");',
		        'var x = "10";',
			    'jq.css("font-size", x + "px");'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
	});

	it('should not notify if the second param is an arr', function (){
		var source = [
		        'var jq = $("#div");',
		        'var arr = getArr();',
			    'jq.css("font-size", arr[0]);'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
	});

	it('should not notify if the second param is an arr', function (){
		var source = [
		        'var jq = $("#div");',
		        'var arr = getArr();',
			    'jq.css("font-size", arr[0] + "px");'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
	});

	it('should not notify if the second param is an object', function (){
		var source = [
		        'var jq = $("#div");',
		        'var obj = getObj();',
			    'jq.css("font-size", obj.attr);'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
	});

	it('should not notify if the second param is an object', function (){
		var source = [
		        'var jq = $("#div");',
		        'var obj = getObj();',
			    'jq.css("font-size", obj.attr + "px");'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
	});

	it('should not notify if the second param is a function', function (){
		var source = [
		        'var jq = $("#div");',
			    'jq.css("font-size", getRandom());'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
	});

	it('should not notify if the second param is a function', function (){
		var source = [
		        'var jq = $("#div");',
			    'jq.css("font-size", getRandom() + "px");'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
	});
	
	//with one param
	it('should not notify if it has only one param and the obj-value is an unknown var', function (){
		var source = [
		        'var jq = $("#div");',
		        'var x = getX();',
			    'jq.css({"font-size": x});'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
	});

	it('should not notify if it has only one param and the obj-value is an unknown var', function (){
		var source = [
		        'var jq = $("#div");',
		        'var x = getX();',
			    'jq.css({"font-size": x + "px"});'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
	});

	it('should notify if it has only one param and the obj-value is a known var', function (){
		var source = [
		        'var jq = $("#div");',
		        'var x = "10px";',
			    'jq.css({"font-size": x});'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
	});

	it('should notify if it has only one param and the obj-value is a known var', function (){
		var source = [
		        'var jq = $("#div");',
		        'var x = 10;',
			    'jq.css({"font-size": x + "px"});'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
	});

	it('should not notify if it has only one param and the obj-value is an array', function (){
		var source = [
		        'var jq = $("#div");',
		        'var arr = getArr();',
			    'jq.css({"font-size": arr[0]});'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
	});

	it('should not notify if it has only one param and the obj-value is an array', function (){
		var source = [
		        'var jq = $("#div");',
		        'var arr = getArr();',
			    'jq.css({"font-size": arr[0] + "px"});'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
	});

	it('should not notify if it has only one param and the obj-value is an obj attribute', function (){
		var source = [
		        'var jq = $("#div");',
		        'var obj = getObj();',
			    'jq.css({"font-size": obj.attr});'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
	});

	it('should not notify if it has only one param and the obj-value is an array', function (){
		var source = [
		        'var jq = $("#div");',
		        'var obj = getObj();',
			    'jq.css({"font-size": obj.attr + "px"});'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
	});

	it('should not notify if it has only one param and the obj-value is a function', function (){
		var source = [
		        'var jq = $("#div");',
			    'jq.css({"font-size": getRandom()});'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
	});

	it('should not notify if it has only one param and the obj-value is a function', function (){
		var source = [
		        'var jq = $("#div");',
			    'jq.css({"font-size": getRandom() + "px"});'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
	});

	it('should not notify if it has only one param and the obj has more than one attribute', function (){
		var source = [
		        'var jq = $("#div");',
			    'jq.css({"display": "none", "font-size": getRandom() + "px"});'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
	});

	it('should notify if it has only one param and the obj has more than one attribute', function (){
		var source = [
		        'var jq = $("#div");',
			    'jq.css({"display": "none", "font-size": "10px"});'
		].join("\n");
		var report = w.analyze('addClass-jquery.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(2);
			expect(log.column).toBe(1);
		});
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(2);
			expect(log.column).toBe(1);
		});
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(2);
			expect(log.column).toBe(1);
		});
	});


});
