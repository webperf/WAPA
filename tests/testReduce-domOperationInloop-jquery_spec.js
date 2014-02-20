var WAPA = require('../wapa').WAPA;

var w = new WAPA({analyzers: ['reduce-domOperationInloop-jquery']});

describe('reduce-domOperationInloop-jquery', function() {

	

	it('should use batch operation  in out of the loop', function (){
		var source = [
			    'for(var i=0;i<10;i++){',
			    '$("#div").find("a").append("<a>"+i+"</a>");',
			    '}'
		].join("\n");
		var report = w.analyze('reduce-domOperationInloop-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(2);
			expect(log.column).toBe(1);
		});
	});

	it('should use batch operation  in out of the loop', function (){
		var source = [
		        'var body = $("body")',
			    'for(var i=0;i<10;i++){',
			    '$("<a>"+i+"</a>").appendTo(body);',
			    '}'
		].join("\n");
		var report = w.analyze('reduce-domOperationInloop-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
	});


	it('should use batch operation  in out of the loop', function (){
		var source = [
			    'for(var i=0;i<10;i++){',
			    '$("p").after("<a>"+i+"</a>");',
			    '}'
		].join("\n");
		var report = w.analyze('reduce-domOperationInloop-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(2);
			expect(log.column).toBe(1);
		});
	});

	it('should use batch operation  in out of the loop', function (){
		var source = [
			    'for(var i=0;i<10;i++){',
			    '$("p").before("<a>"+i+"</a>");',
			    '}'
		].join("\n");
		var report = w.analyze('reduce-domOperationInloop-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(2);
			expect(log.column).toBe(1);
		});
	});

	it('should not report use batch operation out of the loop', function (){
		var source = [
			    '$("#div").append("<a>abcd</a>");',
		].join("\n");
		var report = w.analyze('reduce-domOperationInloop-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});



   it('should use batch operation  in out of the loop', function (){
		var source = [
		        'var i = 10;',
			    'do{',
			    '$("#div").append("<a>"+i+"</a>");',
			    '}while(i--)'
		].join("\n");
		var report = w.analyze('reduce-domOperationInloop-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
	});

    it('should use batch operation  in out of the loop', function (){
		var source = [
		        'var i = 10;',
			    'while(i--){',
			    '$("#div").append("<a>"+i+"</a>");',
			    '}'
		].join("\n");
		var report = w.analyze('reduce-domOperationInloop-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
	});
    

    it('should use batch operation  in out of the loop', function (){
		var source = [
		        'var i = 10;',
			    'while(i--){',
			    '$("#div").css({}).append("<a>"+i+"</a>");',
			    '}',
			    '$("#div").append("<a>"+i+"</a>");',
			    'for(var i=0;i<10;i++){',
			    '$("p").append("<a></a>").before("<a>"+i+"</a>");',
			    '}',
			    'for(var i=0;i<10;i++){',
			    '$("p").before("<a>"+i+"</a>");',
			    '}'
		].join("\n");
		var report = w.analyze('reduce-domOperationInloop-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		var errLogs = [{line:3,column:1},{line:7,column:1},{line:10,column:1}]
		expect(chromeReport.length).toBe(3);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(errLogs[i].line);
			expect(log.column).toBe(errLogs[i].column);
		});
	});

     it('should use batch operation  in out of the loop', function (){
		var source = [
		        'function fc(){',
		        'var i = 10;',
		        'var jq=$("#div");',
			    'while(i--){',
			    'jq.append("<a>"+i+"</a>");',
			    '}',
                '}'
		].join("\n");
		var report = w.analyze('reduce-domOperationInloop-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(5);
			expect(log.column).toBe(1);
		});
	});

      it('should use batch operation  in out of the loop', function (){
		var source = [
		        'function fc(){',
		        'var i = 10;',
		        'var jq=$("#div1").find("a");',
			    'while(i--){',
			    'jq.append("<a>"+i+"</a>");',
			    '}',
                '}'
		].join("\n");
		var report = w.analyze('reduce-domOperationInloop-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(5);
			expect(log.column).toBe(1);
		});
	});

	it('should report move dom operation out of loop', function (){
		var source = [
			   'var table = $("table></table>");',  
			   'for (var i = 0; i < 10; i++) {',    
			   'var tr = $("tr></tr>");',    
			   'for (var j = 0; j < 5; j++) {',     
			   'tr.append("<td>"+i+"</td>");',   
			   '} ',  
			   'table.append(tr);', 
			   '}'
		].join("\n");
		var report = w.analyze('reduce-domOperationInloop-jquery.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(2);
	    var errLogs = [{line:5,column:1},{line:7,column:1}]
		chromeReport.each(function(log, i){
			expect(log.line).toBe(errLogs[i].line);
			expect(log.column).toBe(errLogs[i].column);
		});
	});

});
