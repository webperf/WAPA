var WAPA = require('../wapa').WAPA;

var w = new WAPA({analyzers: ['fragment-analyzer']});

describe('fragment-analyzer', function() {

	it('should report using div to appendChild at line 3, column 1', function (){
		var report = w.analyze('test.js', 
			["var div = document.getElementById('id');"
			 ,"for(var i = 0; i < 100; i++){"
			 ,"div.appendChild(child[i]);"
			 ,"}"
			].join("\n"), '.js');
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

	it('should report using div to appendChild in while statement', function (){
		var report = w.analyze('test.js', 
			["var div = document.getElementById('id');"
			 ,"while(i < 100){"
			 ,"div.appendChild(child[i]);"
			 ,"}"
			].join("\n"), '.js');
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

	it('should report using div to appendChild in doWhile statement', function (){
		var report = w.analyze('test.js', 
			["var div = document.getElementById('id');"
			 ,"do{"
			 ,"div.appendChild(child[i]);"
			 ,"}while(i < 100)"
			].join("\n"), '.js');
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
	

	it('should report using div to appendChild at line 2, column 1', function (){
		var report = w.analyze('test.js', 
			["for(var i = 0; i < 100; i++){"
			 ,"document.getElementById('id').appendChild(child[i]);"
			 ,"}"
			].join("\n"), '.js');
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

	it('should report using div to appendChild even define a documentFragment as the same variable in another function.', function (){
		var report = w.analyze('test.js', 
			["function test(){"
			 ,"var param = document.createDocumentFragment();"
			 ,"}"
			 ,"var param = documnet.getElementById('id');"
			 ,"for(var i = 0; i < 100; i++){"
			 ,"param.appendChild(child[i]);"
			 ,"}"
			].join("\n"), '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(6);
			expect(log.column).toBe(1);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(6);
			expect(log.column).toBe(1);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(6);
			expect(log.column).toBe(1);
		});
	});

	it('should  report when cannot know the type of div in function', function (){
		var report = w.analyze('test.js', 
			["var div = document.getElementById('idd');"
			 ,"function test(div){"
			 ,"for(var i = 0; i < 100; i++){"
			 ,"div.appendChild(child[i]);"
			 ,"}"
			 ,"}"
			 ,"test(div);"
			].join("\n"), '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(4);
			expect(log.column).toBe(1);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(4);
			expect(log.column).toBe(1);
		});
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(4);
			expect(log.column).toBe(1);
		});
	});


	it('should not report using fragment to appendChild', function (){
		var report = w.analyze('test.js', 
			["var fragment = document.createDocumentFragment();"
			 ,"for(var i = 0; i < 100; i++){"
			 ,"fragment.appendChild(child[i]);"
			 ,"}"
			].join("\n"), '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
	});

	it('should not report using div to append fragment', function (){
		var report = w.analyze('test.js', 
			["var fragment = document.createDocumentFragment();"
			 ,"for(var i = 0; i < 100; i++){"
			 ,"fragment.appendChild(child[i]);"
			 ,"}"
			 ,"var div = document.getElementById('id');"
			 ,"div.appendChild(fragment);"
			].join("\n"), '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
	});

	it('should not report using div to append fragment', function (){
		var report = w.analyze('test.js', 
			["var fragment = document.createDocumentFragment();"
			 ,"for(var i = 0; i < 100; i++){"
			 ,"fragment.appendChild(child[i]);"
			 ,"}"
			 ,"document.getElementById('id').appendChild(fragment);"
			].join("\n"), '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
	});

	it('should not report when append only once', function (){
		var report = w.analyze('test.js', 
			["var div = document.getElementById('id');"
			 ,"div.appendChild(div2);"
			].join("\n"), '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
	});

	it('should  not report when fragment is out of function', function (){
		var report = w.analyze('test.js', 
			["var fragment = document.createDocumentFragment();"
			 ,"function test(){"
			 ,"for(var i = 0; i < 100; i++){"
			 ,"fragment.appendChild(div2);"
			 ,"}"
			 ,"}"
			].join("\n"), '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
	});

	

});