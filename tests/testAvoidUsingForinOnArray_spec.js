var WAPA = require('../wapa').WAPA;

var w = new WAPA({analyzers: ['avoidUsingForinOnArray']});

describe('savoidUsingForinOnArray', function() {

	
//  in the  "for( i in list)" expression,the type of the list like '{}' is object  
    it('should not be alarmed', function (){
		var source = [

			    'for(i in {}){',
			    'alert(i + obj1[i]);',
			    '}'
			    
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	it('should not be alarmed', function (){
		var source = [
			   
			    'obj2 = {x:"1", y:"2"};',
			    'for(i in obj2){',
			    'alert(i + obj1[i]);',
			    '}'
			    
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	it('should not be alarmed', function (){
		var source = [
			   
			    'var obj2 = {x:"1", y:"2"};',
			    'for(i in obj2){',
			    'alert(i + obj1[i]);',
			    '}'
			    
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

    it('should not be alarmed', function (){
		var source = [
			    'function test(obj4){',
			    'var obj1 = {x:"1", y:"2"};',
			    'for(i in obj1){',
			    'alert(i + obj1[i]);',
			    '}',
		        '}'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	it('should not be alarmed', function (){
		var source = [
			    'function test(obj4){',
			    'obj1 = {x:"1", y:"2"};',
			    'for(i in obj1){',
			    'alert(i + obj1[i]);',
			    '}',
		        '}'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	it('should not be alarmed', function (){
		var source = [
		        'obj1={x:"1",y:"2"}',
			    'function test(obj4){',
			    'for(i in obj1){',
			    'alert(i + obj1[i]);',
			    '}',
		        '}'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	it('should not be alarmed', function (){
		var source = [
		        'var obj1={x:"1",y:"2"}',
			    'function test(obj4){',
			    'for(i in obj1){',
			    'alert(i + obj1[i]);',
			    '}',
		        '}'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	it('should not be alarmed', function (){
		var source = [
		        'var obj1=[]',
			    'function test(obj4){',
			    'var obj1={x:"1",y:"2"}',
			    'for(i in obj1){',
			    'alert(i + obj1[i]);',
			    '}',
		        '}'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});


    


    
    //  in the  "for( i in list)" expression,the type of the list like 'new Object' is object  
    it('should not be alarmed', function (){
		var source = [

			    'for(i in new Object){',
			    'alert(i + obj1[i]);',
			    '}'
			    
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	it('should not be alarmed', function (){
		var source = [
			   
			    'obj2 = new Object();',
			    'for(i in obj2){',
			    'alert(i + obj1[i]);',
			    '}'
			    
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	it('should not be alarmed', function (){
		var source = [
			   
			    'var obj2 = new Object();',
			    'for(i in obj2){',
			    'alert(i + obj1[i]);',
			    '}'
			    
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

    it('should not be alarmed', function (){
		var source = [
			    'function test(obj4){',
			    'var obj1 = new Object();;',
			    'for(i in obj1){',
			    'alert(i + obj1[i]);',
			    '}',
		        '}'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	it('should not be alarmed', function (){
		var source = [
			    'function test(obj4){',
			    'obj1 = new Object();;',
			    'for(i in obj1){',
			    'alert(i + obj1[i]);',
			    '}',
		        '}'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	it('should not be alarmed', function (){
		var source = [
		        'obj1=new Object();',
			    'function test(obj4){',
			    'for(i in obj1){',
			    'alert(i + obj1[i]);',
			    '}',
		        '}'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	it('should not be alarmed', function (){
		var source = [
		        'var obj1=new Object();',
			    'function test(obj4){',
			    'for(i in obj1){',
			    'alert(i + obj1[i]);',
			    '}',
		        '}'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	it('should not be alarmed', function (){
		var source = [
		        'var obj1=[]',
			    'function test(obj4){',
			    'var obj1=new Object();',
			    'for(i in obj1){',
			    'alert(i + obj1[i]);',
			    '}',
		        '}'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});



//  in the  "for( i in list)" expression,the type of the list like '[]' is Array 

     it('should not use Array in for-in expression', function (){
		var source = [
			  
			    'for(i in [1,2,3]){',
			    'alert(i);',
			    '}'
			    
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});
	});

    it('should not use Array in for-in expression', function (){
		var source = [
			   
			    'obj2 = [1,3,5];',
			    'for(i in obj2){',
			    'alert(i + obj1[i]);',
			    '}'
			    
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(2);
			expect(log.column).toBe(1);
		});
	});

   
    it('should not use Array in for-in expression', function (){
		var source = [
			   
			   
			    'for(i in obj2=[1,2,3]){',
			    'alert(i + obj1[i]);',
			    '}'
			    
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(1);
			expect(log.column).toBe(1);
		});
	});
	  

	it('should not use Array in for-in expression', function (){
		var source = [
			   
			    'var obj2 = [1,3,5];',
			    'for(i in obj2){',
			    'alert(i + obj1[i]);',
			    '}'
			    
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(2);
			expect(log.column).toBe(1);
		});
	});

    it('should not use Array in for-in expression', function (){
		var source = [
			    'function test(obj4){',
			    'var obj1 = [1,3,5];',
			    'for(i in obj1){',
			    'alert(i + obj1[i]);',
			    '}',
		        '}'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
	});

	it('should not use Array in for-in expression', function (){
		var source = [
			    'function test(obj4){',
			    'obj1 =  [1,3,5];',
			    'for(i in obj1){',
			    'alert(i + obj1[i]);',
			    '}',
		        '}'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
	});

	it('should not use Array in for-in expression', function (){
		var source = [
		        'obj1= [1,3,5]',
			    'function test(obj4){',
			    'for(i in obj1){',
			    'alert(i + obj1[i]);',
			    '}',
		        '}'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
	});

	it('should not use Array in for-in expression', function (){
		var source = [
		        'var obj1= [1,3,5]',
			    'function test(obj4){',
			    'for(i in obj1){',
			    'alert(i + obj1[i]);',
			    '}',
		        '}'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
	});

	it('should not use Array in for-in expression', function (){
		var source = [
		        'var obj1={}',
			    'function test(obj4){',
			    'var obj1= [1,3,5]',
			    'for(i in obj1){',
			    'alert(i + obj1[i]);',
			    '}',
		        '}'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(4);
			expect(log.column).toBe(1);
		});
	});










//  in the  "for( i in list)" expression,the type of the list like 'new Array' is Array 

it('should not use Array in for-in expression', function (){
		var source = [
			   
			    'obj2 = new Array();',
			    'for(i in obj2){',
			    'alert(i + obj1[i]);',
			    '}'
			    
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(2);
			expect(log.column).toBe(1);
		});
	});

	it('should not use Array in for-in expression', function (){
		var source = [
			   
			    'var obj2 = new Array();',
			    'for(i in obj2){',
			    'alert(i + obj1[i]);',
			    '}'
			    
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(2);
			expect(log.column).toBe(1);
		});
	});

    it('should not use Array in for-in expression', function (){
		var source = [
			    'function test(obj4){',
			    'var obj1 = new Array();',
			    'for(i in obj1){',
			    'alert(i + obj1[i]);',
			    '}',
		        '}'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
	});

	it('should not use Array in for-in expression', function (){
		var source = [
			    'function test(obj4){',
			    'obj1 =  new Array();',
			    'for(i in obj1){',
			    'alert(i + obj1[i]);',
			    '}',
		        '}'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
	});

	it('should not use Array in for-in expression', function (){
		var source = [
		        'obj1= new Array()',
			    'function test(obj4){',
			    'for(i in obj1){',
			    'alert(i + obj1[i]);',
			    '}',
		        '}'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
	});

	it('should not use Array in for-in expression', function (){
		var source = [
		        'var obj1= new Array()',
			    'function test(obj4){',
			    'for(i in obj1){',
			    'alert(i + obj1[i]);',
			    '}',
		        '}'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(3);
			expect(log.column).toBe(1);
		});
	});







	it('should not use Array in for-in expression', function (){
		var source = [
		        'var obj1={}',
			    'function test(obj4){',
			    'var obj1= new Array()',
			    'for(i in obj1){',
			    'alert(i + obj1[i]);',
			    '}',
		        '}'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(4);
			expect(log.column).toBe(1);
		});
	});







   
	

	it('should not be alarmed', function (){
		var source = [
		        'var obj1= this.arr',
			    'function test(obj4){',
			    'for(i in obj1){',
			    'alert(i + obj1[i]);',
			    '}',
		        '}'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});


	it('should not be alarmed', function (){
		var source = [
			    'function test(obj4){',
			    'for(i in this.obj1){',
			    'alert(i + obj1[i]);',
			    '}',
		        '}'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

    it('should not be alarmed', function (){
		var source = [
			    'function test(obj){',
			    'for(i in obj){',
			    '}',
		        '}'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

	it('should not be alarmed', function (){
		var source = [
		        'obj={}',
			    'function test(obj){',
			    'for(i in obj){',
			    '}',
		        '}',
		        'test(obj)'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});



	it('should not be alarmed', function (){
		var source = [
		     
		        'obj=[]',
			    'function test(obj){',
			    'for(i in obj){',
			    '}',
		        '}',
		        
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});


	it('should not be alarmed', function (){
		var source = [
		        'obj=[]',
			    'function test(obj){',
			    'obj={}',
			    'for(i in obj){',
			    '}',
		        '}',
		        'test(obj)'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(0);
	});

    it('should not be alarmed', function (){
		var source = [
		        'obj={}',
			    'function test(obj){',
			    'obj=[]',
			    'for(i in obj){',
			    '}',
		        '}',
		        'test(obj)'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(4);
			expect(log.column).toBe(1);
		});
	});



	it('should not use Array in for-in expression', function (){
		var source = [
		        'function fc(){',
			    'function fc1(){',
			    'function fc3(){',
			    'var arr =123',
			    '}',
			    'function fc4(){',
			    'var arr=[1,2,3]',  
			    'for(var i in arr);',
			    '}',
			    'function fc5(){',
			    '}',
			    '}',
			    'function fc2(){',

			    'var arr =123',
                '}',
		        '}'
		].join("\n");
		var report = w.analyze('avoidUsingForinOnArray.js', source, '.js');
		var chromeReport = report.filter('chrome');
		expect(chromeReport.length).toBe(1);
		chromeReport.each(function(log, i){
			expect(log.line).toBe(8);
			expect(log.column).toBe(1);
		});
	});
});