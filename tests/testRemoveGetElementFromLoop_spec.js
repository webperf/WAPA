var WAPA = require('../wapa').WAPA;

var w = new WAPA({analyzers: ['removeGetElementFromLoop-analyzer']});

describe('removeGetElementFromLoop-analyzer', function() {

	it('should notify when using getElementsByName in for loop at line 1, column 30', function (){
		var report = w.analyze('test.js', 'for(var i = 0; i < 100; i++){document.getElementById("test");}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(30);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(30);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(30);
		});
	});

	it('should notify when using getElementsByName in for loop at line 1, column 30', function (){
		var report = w.analyze('test.js', 'for(var i = 0; i < 100; i++){document.getElementsByName("test");}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(30);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(30);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(30);
		});
	});

	it('should not notify when using getElementsByName out of for loop', function (){
		var report = w.analyze('test.js', 'for(var i = 0; i < 100; i++){}document.getElementsByName("test");', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);


		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);

	});

	it('should notify when using getElementsByTagName in for loop at line 1, column 30', function (){
		var report = w.analyze('test.js', 'for(var i = 0; i < 100; i++){document.getElementsByTagName("test");}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(30);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(30);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(30);
		});
	});

	it('should notify when using getElementsByClassName in for loop at line 1, column 30', function (){
		var report = w.analyze('test.js', 'for(var i = 0; i < 100; i++){document.getElementsByClassName("test");}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(30);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(30);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(30);
		});
	});

	it('should notify when using getElementsByName in while loop at line 1, column 20', function (){
		var report = w.analyze('test.js', 'while(i < 10){i++; document.getElementsByName("test");}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(20);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(20);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(20);
		});
	});



	it('should notify when using getElementsByName in while loop at line 1, column 9', function (){
		var report = w.analyze('test.js', 'do{i++; document.getElementsByName("test");}while(i < 10)', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(9);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(9);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(9);
		});
	});

	it('should notify when using getElementsByName then do other thing in while loop at line 1, column 9', function (){
		var report = w.analyze('test.js', 'do{i++; document.getElementsByName("test").innerHTML = "test";}while(i < 10)', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(9);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(9);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(9);
		});

	});

	it('should notify when using getElementsByName in more than one loops', function (){
		var report = w.analyze('test.js', 'while(i > 0){while(j > 0){i--; j--;document.getElementsByName("test");}}', '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(36);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(36);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(36);
		});
	});


	/**
	 *	New Added Test Cases
	 *	Take the param of getElementBy into consideration.
	 */

	it('should not notify if there is a \'with()\' statement', function (){
		var source = [
			"for(var i = 0; i < arr.length; i++){",
			"with(obj){",
			"document.getElementById(id).innerHTML = 'Hello World';",
			"}",	
			"}"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	
	it('should not notify if getElement caller is a variable not changed but has a \'eval()\' statement in loop', function (){
		var source = [
			"for(var i = 0; i < arr.length; i++){",
			"eval('id=(' + arr[i] + ')');",
			"document.getElementById(id).innerHTML = 'Hello World';",	
			"}"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	it('should not notify if the param of getElement changes in while loop', function (){
		var source = [
			"while(i<100){",
			"document.getElementById(i).innerHTML = 'Hello World';",
			"i++;",
			"}"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
	});

	it('should notify if the caller of getElement does not change', function (){
		var source = [
			"while(i<100){",
			"j = 0;",
			"document.getElementById(j).innerHTML = 'Hello World';",
			"i++;",
			"}"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
	});

	it('should not notify if the param of getElement changes', function (){
		var source = [
			"for(var i = 0; i < 100; i++){",
			"document.getElementById(i).innerHTML = 'Hello World';",	
			"}"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
	});

	it('should not notify if the param of getElement is mixed and changes', function (){
		var source = [
			"for(var i = 0; i < 100; i++){",
			"document.getElementById('id' + i + j).innerHTML = 'Hello World';",	
			"}"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
	});

	it('should notify if getElement caller is HTMLDocument type but not \'document\' ', function (){
		var source = [
			"var doc = document;",
			"for(var i = 0; i < 100; i++){",
			"doc.getElementById('id').innerHTML = 'Hello World';",	
			"}"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
	});


	/**
	 * The follows are about array.
	 *
	 */
	it('should not notify if getElement params are array that changed in every loop', function (){
		var source = [
			"for(var i = 0; i < 100; i++){",
			"document.getElementById(arr[i]).innerHTML = 'Hello World';",	
			"}"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
	});

	it('should not notify if getElement params are array that changes in every loop', function (){
		var source = [
			"for(var i = 0; i < 100; i++){",
			"arr = fnGetArr(i);",
			"document.getElementById(arr[0].obj).innerHTML = 'Hello World';",	
			"}"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
	});

	it('should not notify if getElement params are array that changes in every loop', function (){
		var source = [
			"for(var i = 0; i < 100; i++){",
			"arr[0] = fnGetObj(i);",
			"document.getElementById(arr[0]).innerHTML = 'Hello World';",	
			"}"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
	});

	it('should not notify if getElement params are array that changes in every loop', function (){
		var source = [
			"for(var i = 0; i < 100; i++){",
			"arr[0] = fnGetObj(i);",
			"document.getElementById(arr[0].obj).innerHTML = 'Hello World';",	
			"}"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
	});

	it('should not notify if getElement params are array that changes in every loop', function (){
		var source = [
			"for(var i = 0; i < 100; i++){",
			"arr[0].obj = fnGetObj(i);",
			"document.getElementById(arr[0].obj).innerHTML = 'Hello World';",	
			"}"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
	});

	it('should notify if getElement params are array that not changes', function (){
		var source = [
			"for(var i = 0; i < 100; i++){",
			"arr[0].obj = fnGetObj(i);",
			"document.getElementById(arr[1].obj).innerHTML = 'Hello World';",	
			"}"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
		

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
	});

	it('should notify if getElement params are array that not change', function (){
		var source = [
			"for(var i = 0; i < 100; i++){",
			"document.getElementById(arr[1]).innerHTML = 'Hello World';",	
			"}"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(2);
			expect(log.column).toBe(1);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(2);
			expect(log.column).toBe(1);
		});

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(2);
			expect(log.column).toBe(1);
		});
	});


	it('should not notify if the param of getElement changes in while loop', function (){
		var source = [
			"while(i<100){",
			"document.getElementById(arr[i]).innerHTML = 'Hello World';",
			"i++;",
			"}"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
	});

	it('should not notify if the param of getElement changes in while loop', function (){
		var source = [
			"while(i<100){",
			"document.getElementById(arr[i].obj).innerHTML = 'Hello World';",
			"i++;",
			"}"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
	});

	it('should not notify if the param of getElement changes in while loop', function (){
		var source = [
			"var i = 0;",
			"while(i++<100){",
			"document.getElementById(arr[i].obj).innerHTML = 'Hello World';",
			"}"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
	});

	it('should not notify if the param of getElement changes in while loop', function (){
		var source = [
			"var i = 0;",
			"do{",
			"document.getElementById(arr[i].obj).innerHTML = 'Hello World';",
			"}while(i++<100)"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
	});

	it('should not notify if the param of getElement changes in while loop', function (){
		var source = [
			"var i = 0;",
			"do{",
			"document.getElementById(arr[i].obj).innerHTML = 'Hello World';",
			"}while(i--)"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(0);
		

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(0);
		

		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
		
	});

	it('should notify if the param of getElement does not change in while loop', function (){
		var source = [
			"var i = 100;",
			"do{",
			"document.getElementById(arr[i].obj).innerHTML = 'Hello World';",
			"}while(i > 0)"
		].join("\n");
		var report = w.analyze('test.js', source, '.js');
		var ieReport = report.filter('ie10');
		expect(ieReport.length).toBe(1);
		ieReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});

		var ffReport = report.filter('ff');
		expect(ffReport.length).toBe(1);
		ffReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
		
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
		
	});

	


});