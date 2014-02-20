

"use strict";

exports.bests = {
	"sample_best_1": ["This is a sample best description. You can add your own descriptions of the best practice."  
 	, "The best practice should be illustrated with sample code like this:"  
 	, "```javascript"  
 	, "document.getElementById('elementId')"  
 	, "```"  
 	, "The format follows the **Github Favored Markdown (GFM)**. You can refer [this link](https://help.github.com/articles/github-flavored-markdown) for more formats."  
 	].join('\n')

	,"sample_best_2": "This is another sample best description."

	,"arch-css": "Architecture CSSOM sample best description"

	,"valueOfToNum_best":[
	  "To convert a String to Number, `str | 0` is more efficient than `.valueOf()`. For example:"
	  ,"```javascript"
	  ,"var num = numberObject.valueOf();"
	  ,"```"
	  ,"should be rewritten as below:"
	  ,"```javascript"
	  ,"var num = str | 0;"
	  ,"```"
	  ,"You can refer [this link](http://jsperf.com/date-type-conversion-number-1) for more information."
	].join("\n")

	,"parseIntToNum_best":[
	  "To convert a String to Number, `str | 0` is more efficient than `parseInt(str)`. For example:"
	  ,"```javascript"
	  ,"var num = parseInt(str);"
	  ,"```"
	  ,"should be rewritten as below:"
	  ,"```javascript"
	  ,"var num = str | 0;"
	  ,"```"
	  ,"You can refer [this link](http://jsperf.com/date-type-conversion-number-1) for more information."
	].join("\n")

	,"numberToNum_best":[
	  "To convert a String to Number, `str | 0` is more efficient than `Number(str)`. For example:"
	  ,"```javascript"
	  ,"var num = Number(str);"
	  ,"```"
	  ,"should be rewritten as below:"
	  ,"```javascript"
	  ,"var num = str | 0;"
	  ,"```"
	  ,"You can refer [this link](http://jsperf.com/date-type-conversion-number-1) for more information."
	].join("\n")

	,"convertArrToStr_best":[
	  "To convert an Array to String, `arr.join()` is more efficient than `arr.toLocaleString()`. For example:"
	  ,"```javascript"
	  ,"var str = arr.toLocaleString();"
	  ,"```"
	  ,"should be rewritten as below:"
	  ,"```javascript"
	  ,"var str = arr.join();"
	  ,"```"
	  ,"You can refer [this link](http://jsperf.com/array-content-into-string/2) for more information."
	].join("\n")

	,"forEachTraverseArr_best":[
	  "To traverse an Array, a `while` loop is more efficient than `arr.forEach()`. For example:"
	  ,"```javascript"
	  ,"arr.forEach(function(elem){});"
	  ,"```"
	  ,"should be rewritten as below:"
	  ,"```javascript"
	  ,"var i = 0; while(i < arr.length){i++;}"
	  ,"```"
	  ,"You can refer [this link](http://jsperf.com/loop-for-while-each/4) for more information."
	].join("\n")

	,"eachTraverseArr_best":[
	  "To traverse an Array, a `while` loop is more efficient than `$.each()`. For example:"
	  ,"```javascript"
	  ,"$.each(arr, function(index, elem){});"
	  ,"```"
	  ,"should be rewritten as below:"
	  ,"```javascript"
	  ,"var i = 0; while(i < arr.length){i++;}"
	  ,"```"
	  ,"You can refer [this link](http://jsperf.com/loop-for-while-each/4) for more information."
	].join("\n")

	,"requestAnimationFrame_best":[
	  "`requestAnimationFrame` (rAF) is more efficient in performance and power than `setTimeout()` for animating. For example:"
	  ,"```javascript"
	  ,"function animate(){"
	  ,"\t//animating();"
	  ,"\tsetTimeout(animate, 15);"
	  ,"}"
	  ,"```"
	  ,"should be rewritten as below:"
	  ,"```javascript"
	  ,"function animate(){"
	  ,"\t//animating();"
	  ,"\twebkitRequestAnimationFrame(animate);"
	  ,"}"
	  ,"```"
	].join("\n")

	,"innerHtml_best":[
	  "To insert texts in DOM tree, `elem.innerText = text` is more efficient than `elem.createTextNode(text)`. For example:"
	  ,"```javascript"
	  ,"var txtNode = document.createTextNode('Hello World.');"
	  ,"elem.appendChild(txtNode);"
	  ,"```"
	  ,"should be rewritten as below:"
	  ,"```javascript"
	  ,"elem.innerHTML = 'Hello World.';"
	  ,"```"
	  ,"You can refer [this link](http://jsperf.com/createtextnode-vs-innerhtm) for more information."
	].join("\n")

	,"putLengthIntoLocalVar_best":[
	  "Caching `arr.length` to local variable is more efficient than testing it in each loop. For example:"
	  ,"```javascript"
	  ,"for(var i = 0; i < arr.length; i++){"
	  ,"\tdoSomething();"
	  ,"}"
	  ,"```"
	  ,"should be rewritten as below:"
	  ,"```javascript"
	  ,"for(var i = 0, len = arr.length; i < len; i++){"
	  ,"\tdoSomething();"
	  ,"}"
	  ,"```"
	  ,"You can refer [this link](http://jsperf.com/length-in-local-var/3) for more information."
	].join("\n")

	,"putCollectionToArray_best":[
	  "To traverse a NodeList, convert it into an Array is more efficient than traverse on the list. For example:"
	  ,"```javascript"
	  ,"var nodeList = document.getElementsByTagName('li');"
	  ,"for(var i = 0, length = nodeList.length; i < length; i++){"
	  ,"\tdoSomething(nodeList[i])"
	  ,"}"
	  ,"```"
	  ,"The best practice is to convert the collection to array and should be illustrated with sample code like this:"
	  ,"```javascript"
	  ,"var nodeList = document.getElementsByTagName('li');"
	  ,"var arr = Array.prototype.slice.call(nodeList);"
	  ,"for(var i = 0, lenght = arr.length; i < length; i++){"
	  ,"\tdoSomething(nodeList[i])"
	  ,"}"
	  ,"```"
	  ,"You can refer [this link](http://jsperf.com/convert-html-collection-into-array/10) for more information."
	].join("\n")

	,"childNodesToNextSibling_best":[
	  "To traverse among child nodes, `nextSibling` is more efficient than `childNodes`. For example:"
	  ,"```javascript"
	  ,"var children = parentNode.childNodes;"
	  ,"var i = 0;"
	  ,"while(i < children.length){"
	  ,"\tdoSomething(children[i])"
	  ,"i++;"
	  ,"}"
	  ,"```"
	  ,"should be rewritten as below:"
	  ,"```javascript"
	  ,"var firstChild = parentNode.firstChild;"
	  ,"while(firstChild){"
	  ,"\tdoSomething(firstChild);"
	  ,"\tfirstChild = firstChild.nextSibling;"
	  ,"}"
	  ,"```"
	  ,"You can refer [this link](http://jsperf.com/childnodes-vs-nextsibling) for more information."	
	].join("\n")

	,"useClassName_best":[
	  "To modify the CSS styles statically, `elem.className` is more efficient than `elem.style.XXXX`. For example:"
	  ,"```javascript"
	  ,"div.style.backgroundColor = 'red';"
	  ,"```"
	  ,"should be rewritten as below:"
	  ,"```javascript"
	  ,"div.className = 'bgRedCSS';"
	  ,"```"
	  ,"You can refer [this link](http://jsperf.com/csstext-vs-style-attribut/2) for more information."
	].join("\n")

	,"reduceEval_best":[
	  "To convert JSON string into Object, `JSON.parse` is more efficient than `eval`. For example:"
	  ,"```javascript"
	  ,"var jsonstr = '{\"name\": \"Jason\", \"age\": 25}';"
	  ,"var obj = eval('(' + jsonstr + ')');"
	  ,"```"
	  ,"should be rewritten as below:"
	  ,"```javascript"
	  ,"var jsonstr = '{\"name\": \"Jason\", \"age\": 25}';"
	  ,"var obj = JSON.parse(jsonstr);"
	  ,"```"
	  ,"You can refer [this link](http://jsperf.com/deduce-use-of-eval/3) for more information."
	].join("\n")

	,"reduceWith_best":[
	  "Do not use `with` statement since it greatly slow down the performance. For example:"
	  ,"```javascript"
	  ,"var sum = 0;"
	  ,"for(var i = 0; i < 10; i++){"
	  ,"\twith(Math){"
	  ,"\t\tsum += cos(i * PI);"
	  ,"\t}"
	  ,"}"
	  ,"```"
	  ,"should be rewritten as below:"
	  ,"```javascript"
	  ,"var sum = 0;"
	  ,"for(var i = 0; i < 10; i++){"
	  ,"\tsum += Math.cos(i * Math.PI);"
	  ,"}"
	  ,"```"
	  ,"You can refer [this link](http://jsperf.com/reduce-use-of-with) for more information."
	].join("\n")

	,"reduceTryCatch_best":[
	  "Be careful of using `try-catch-finally` statement since it will greatly slow down the performance. For example:"
	  ,"```javascript"
	  ,"function test(){"
	  ,"\ttry{"
	  ,"\t\tvar sum = 0;"
	  ,"\t\tfor(var i = 0; i < 100; i++){"
	  ,"\t\t\tsum++;"
	  ,"\t\t}"
	  ,"\t}catch(e){"
	  ,"\t\treturn -1;"
	  ,"\t}finally{}"
	  ,"}"
	  ,"```"
	  ,"should be rewritten as below:"
	  ,"```javascript"
	  ,"function test(){"
	  ,"\tvar sum = 0;"
	  ,"\tfor(var i = 0; i < 100; i++){"
	  ,"\t\tsum++;"
	  ,"\t}"
	  ,"}"
	  ,"```"
	  ,"You can refer [this link](http://jsperf.com/try-catch-finally-t/2) for more information."
	].join("\n")

	,"removeGetElementFromLoop_best":[
	  "Hoist the static DOM query out of loop is more efficient than query it in each loop. For example:"
	  ,"```javascript"
	  ,"for(var i = 0; i < 100; i++){"
	  ,"\tvar div = document.getElementById('id'); // query statically"
	  ,"\tdiv.innerHTML += '<b>' + i + '</b> ';"
	  ,"}"
	  ,"```"
	  ,"should be rewritten as below:"
	  ,"```javascript"
	  ,"var div = document.getElementById('id'); // hoisted out of loop"
	  ,"for(var i = 0; i < 100; i++){"
	  ,"\tdiv.innerHTML += '<b>' + i + '</b> ';"
	  ,"}"
	  ,"```"
	].join("\n")

	,"loadingScript_best":[
	  "Put `<script>` tag at the bottom of the `<body>` script improves the page's loading performance. For example:"
	  ,"```html"
	  ,"<body>"
	  ,"<script src=\"js/jquery.js\"></script>"
	  ,"<div></div>"
	  ,"..."
	  ,"</body>"
	  ,"```"
	  ,"There is a better practice of using `<script>` tag at the bottom of `<body>` tag and it should be illustrated with sample code like this:"
	  ,"```html"
	  ,"<body>"
	  ,"<div></div>"
	  ,"..."
	  ,"<script src=\"js/jquery.js\"></script>"
	  ,"</body>"
	  ,"```"
	].join("\n")

	,"CSSTransform_best":[
	  "3D transform is more efficient than 2D transform. For example:"
	  ,"```css"
	  ,".tr{"
	  ,"\ttransform: rotate(degree);"
	  ,"}"
	  ,"```"
	  ,"should rewritten as below:"
	  ,"```css"
	  ,".tr{"
	  ,"\ttransform: rotate3d(0, 0, 1, degree);"
	  ,"}"
	  ,"```"
	].join("\n")

	,"cacheGlobalVarWithLocalVar_best":[
	  "Batching the access to closure variable is more efficient than access them all the time. For example:"
	  ,"```javascript"
	  ,"var closure = 0;"
	  ,"function test() {"
	  ,"\tfor(var i = 0; i < 100; i++){"
	  ,"\t\tclosure += i; // read-write x 100"
	  ,"\t}"
	  ,"}"
	  ,"```"
	  ,"should be rewritten as below:"
	  ,"```javascript"
	  ,"var closure = 0;"
	  ,"function test() {"
	  ,"\tvar local = closure; // cache closure variable to local (read x 1)"
	  ,"\tfor(var i = 0; i < 100; i++){"
	  ,"\t\tlocal += i;"
	  ,"\t}"
	  ,"\tclosure = local; // batch the access (write x 1)"
	  ,"}"
	  ,"```"
	  ,"You can refer [this link](http://jsperf.com/lov-replace-fglobalv/3) for more information."
	].join("\n")
   ,"for-in": [
   	  "To loop an Array, `for(i = 0; i < length; i++)` is more efficient than `for-in` statement. For example:"
	  , "```javascript"
	  , "var arr = [1, 2, 3, 4, 5, 6, 7];"
	  , "for(var i in arr){"
	  , "\tdoSomething(arr[i]);"
	  , "}"
	  , "```"
	  , "should be rewritten as below:"
	  , "```javascript"
	  , "var arr = [1, 2, 3, 4, 5, 6, 7];"
	  , "for(var i = 0, length = arr.length; i < length; i++){"
	  , "\tdoSomething(arr[i]);"
	  , "}"
	  , "```"
	  ,"You can refer [this link](http://jsperf.com/loop-for-while-each/4) for more information."
	  ].join('\n')
   ,"revokeObjectURL":[
   	  "Always call `URL.revokeObjectURL` after `URL.createObjectURL` to prevent potential memory leak. For example: "
      , "```javascript"
      , "var urlObj=URL.createObjectURL(url);"
      , "...... "
      , "URL.revokeObjectURL(urlObj);"
      , "```"
      ,"You can refer [this link](http://jsperf.com/createobjecturl-revokeobjecturl) for more information."
      ].join('\n')

    ,"selector-id-jquery":[
   	  "when use id to select element with jquery,id should use only one and place it in first position of a string in order to improve efficience. For example: "
      , "```javascript"
      , "var div1=$('ul li #div');"
      , "...... "
      , "should rewritten as below:"
      , "var div1=$('#div');"
      , "```"
      ,"You can refer [this link](http://jsperf.com/selector-id-ywq1) for more information."
      ].join('\n')
     ,"selector-find-jquery":[
   	  "when use the string combined by id and other mark with jquery to select element,it should use jquery and find function in order to improve efficience.  For example: "
      , "```javascript"
      , "var as=$('#div1 a');"
       , "...... "
      , "should rewritten as below:"
      , "var as=$('#div1').find('a');"
      , "```"
      ,"You can refer [this link](http://jsperf.com/selector-find-jquery-ywq) for more information."
      ].join('\n')
     ,"reduce-domOperationInloop-jquery":[
   	  "should not dom operation in loops with jquery in order to improve efficience. For example: "
      , "```javascript"
      , "var table=$('<table></table>');"
      , "for(var i=0;i<10;i++){"
      , "var tr=$('<tr></tr>');"
      , "for(var j=0;j<5;j++){"
      , "tr.append('<td>'+i+'</td>');"
      , "}"
      , "table.append(tr);"
      , "}"
      , "should rewritten as below:"
      , "var table='<table>';"
      , "for(var i=0;i<10;i++){"
      , "var tr='<tr>';"
      , "for(var j=0;j<5;j++){"
      , "tr+='<td>'+i+'</td>';"
      , "}"
      , "tr+='</tr>';"
      , "table+=tr;"
      , "}"
      , "table=$(table);"
      , "```"
      ,"You can refer [this link](http://jsperf.com/createtable-ywq) for more information."
      ].join('\n')
     ,"addClass-jquery":[
   	  "should use addClass function of jquery instead of css function to add style to element in order to improve efficience. For example: "
      , "```javascript"
      , "var div=$('#div').css({})"
      , "...... "
      , "```"
      , "should rewritten as below:"
      , "var div=$('#div').addClass()"
      , "```"
      ,"You can refer [this link](http://jsperf.com/class-ywq) for more information."
      ].join('\n')
     ,"on-event-jquery":[
   	  "when attach event to parent node only once instead of to children nodes in loops with on function of jquery in order to improve efficience  For example: "
      , "```javascript"
      , "var tr=$(tr).on('click',function);"
      , "...... "
      , "shuld rewritten as below:"
      , "$('table').on('click','tr',function(){})"
      , "...... "
      , "```"
      ,"You can refer [this link](http://jsperf.com/event-bubble-ywq1) for more information."
      ].join('\n')
     ,"setImmediate-analyzer_best":[" 'setImmeidiate()' is more efficient in performance and power than `setTimeout()` in IE."].join('\n')

};
