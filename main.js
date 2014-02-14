

'use strict'
var fs = require('fs');
var util = require('util');
var _ = require('underscore');
var path = require('path');
var excelbuilder = require('./node_modules/msexcel-builder/lib/msexcel-builder');
var WAPA = require('./wapa').WAPA;

function analyzeFile(wapa, filename, source, type) {
	return wapa.analyze(filename, source, type);
}

function main (filePath) {
	if(typeof filePath == "undefined"){
		console.log("please enter your project,such as 'node main.js  myproject' ");
		return
	}
   if(!fs.existsSync(filePath)){
        console.log("you enter the path didn't exist,please check it and try again!");
        return;
   }
   if(!fs.lstatSync(filePath).isDirectory()){
      console.log("please enter your project Directory,not a file! ");
   	  return;
   }
	var platforms = ['ie10','chrome','ff'];
	var fileName = "WapaAnalyzeResult.xlsx";
    var absolutePath = path.resolve(filePath);
	var last = 0;
	var wapa = new WAPA({'platforms': platforms});
	var excel =absolutePath + "/" + fileName;
	var errflag = false;
    if(fs.existsSync(excel)){
    	try{
    	  fs.unlinkSync(excel);
    	}catch(e){
    		 console.log("WapaAnalyzeResult.xlsx has existed and it can't be deleted because of its open,please close it and try again");
    		 errflag = true;
    	}
    }

    if (errflag) return;
	var workbook = excelbuilder.createWorkbook(absolutePath, fileName);
	var sheets = [];
	var currentSheet;
	wapa.analyzeDirectory(absolutePath, function (err, results) {
		if (err) {
			console.error('Error: %s', err);
			return;
		}
		_.each(results, function (report) {
			_.each(wapa.platforms, function(platform){
                if (platform == "ff") platform = "firefox";
				if(!sheets[platform]) {

					sheets[platform] = workbook.createSheet(platform, 7,1000);
					sheets[platform].currentRow = 0;
                    appendExcel(sheets[platform],0,"Path","Line","Column","Message","the example of useage","SpeedUp");    
				}
                currentSheet = sheets[platform];
				//console.log('===================== %s =====================', platform);
				if (platform == "firefox") platform = "ff";
				var platformReporter = report.filter(platform);
				if(platformReporter.length){
					platformReporter.each(function (log){
					appendExcel(currentSheet,currentSheet.currentRow,platformReporter.name,log.line,log.column,log.msg,WAPA.getFullBest(log.best[platform].best),log.best[platform].speedup);
				  });
				}
			});
		});
		workbook.save(function(ok){
         if (!ok) 
           workbook.cancel();
         else
           console.log('\ncongratulations, wapa analysis have completed successfully!\nsee the wapa analysis report in the root directory of your project! ');
        });
		function appendExcel(sheet,currentRow,fileName,line,column,msg,example,speedup){
		   sheet.currentRow = currentRow+1;
		   if(sheet.currentRow == 1){
		   	 setHead(sheet);
		   }
           sheet.set(1,sheet.currentRow,fileName);
          // sheet.set(2,sheet.currentRow,rule);
           sheet.set(2,sheet.currentRow,line);
           sheet.set(3,sheet.currentRow,column);
           sheet.set(4,sheet.currentRow,msg);
           sheet.set(5,sheet.currentRow,example);
           sheet.set(6,sheet.currentRow,speedup);
           if(sheet.currentRow>1) setStyle(sheet,sheet.currentRow,10);
           
		}
		function setHead(sheet){
            sheet.width(1, 30);
			//sheet.width(2, 36);
			sheet.width(2, 8);
			sheet.width(3, 9);
			sheet.width(4, 40);
			sheet.width(5, 100);
			sheet.width(6, 12);
			setCenter(sheet,1);
			//sheet.align(7, 1, 'center');
            setFont(sheet,1,14)
		}
		function setStyle(sheet,row,size){
            setFont(sheet,row,size);
            setCenter(sheet,row);
		}
		function setFont(sheet,row,size){
            sheet.font(1, row, {name:'黑体',sz:size,family:'2',scheme:'-',bold:'true'});
            sheet.font(2, row, {name:'黑体',sz:size,family:'2',scheme:'-',bold:'true'});
            sheet.font(3, row, {name:'黑体',sz:size,family:'2',scheme:'-',bold:'true'});
            sheet.font(4, row, {name:'黑体',sz:size,family:'2',scheme:'-',bold:'true'});
            sheet.font(5, row, {name:'黑体',sz:size,family:'2',scheme:'-',bold:'true'});
            sheet.font(6, row, {name:'黑体',sz:size,family:'2',scheme:'-',bold:'true'});
           // sheet.font(7, row, {name:'黑体',sz:size,family:'2',scheme:'-',bold:'true'});
		}
		function setCenter(sheet,row){
			if(row == 1) sheet.align(1, row, 'center');
			sheet.align(2, row, 'center');
			sheet.align(3, row, 'center');
			if(row == 1) sheet.align(4, row, 'center');
			if(row == 1) sheet.align(5, row, 'center');
			sheet.align(6, row, 'center');
		}
	}, function (p) {
		p = ~~(p*60);
		for(var i = last; i < p; i++) {
			util.print('*');
		}
		last = p;
	});
	
 
}

main(process.argv[2]);
