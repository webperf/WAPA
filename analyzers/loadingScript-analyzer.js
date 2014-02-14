

"use strict";

/*
 * 把HTML文件中<script>标签放到最底部：
 * 遍历<body>元素的子元素（线性访问，不访问子元素的子元素）,找到最后一个非<script>节点,记录它的位置
 * 再次遍历<body>元素的子元素（到最后一个非<script>节点的前一个节点），过程中遇到所有的<script>标记都提出建议：“移到<body>底部”。
 *
 *
 * 访问body子元素而不是递归访问所有body内元素的原因：
 * 所有应该最后加载的脚本都应该是<body>的直接子元素。而一些body子元素内嵌的<script>元素应该和其他页面元素一起加载
 * 
 * 
 */

exports.name = 'loadingScript-analyzer';

exports.type = '.html';

exports.dependent = false;

exports.bests = {
	'ie10': {
		best: 'loadingScript_best',
		speedup: 1
	},
	'ff': {
		best: 'loadingScript_best',
		speedup: 1
	},
	'chrome': {
		best: 'loadingScript_best',
		speedup: 1
	},
    'winrt': {
        best: 'loadingScript_best',
        speedup: 1
    },
    'opera': {
        best: 'loadingScript_best',
        speedup: 1
    }
};

function traverse(object, visitor) {
    var key, child;

    if (visitor.call(null, object) === false) {
        return;
    }
    for (key in object) {
        if (object.hasOwnProperty(key)) {
           child = object[key];
            if (typeof child === 'object' && child !== null) {
               traverse(child, visitor);
            }
        }
    }
}


exports.analyze = function (syntax, reporter, platform) {
	syntax.traverse(function (node, key, parent) {
		if(node.type == 'tag' && node.name == 'body'){
			var child = node.children;
			var lastNonscript = 0;
    		for(var index = 0 ;index < child.length; index ++){
    			if(child[index].type == 'tag' && child[index].name != 'script'){
    				lastNonscript = index;
    			}
    		}
    		for(var index = 0; index < lastNonscript; index ++){
                traverse(child[index], function(node){
            		if(node.type == 'script' && node.name == 'script'){
                        var startLocation = node.location;
						reporter.log (startLocation.line, startLocation.col - 1, exports.name, exports.bests, 'find <script> tag which is not at the bottom of the <body> tag.');
                	}
                });
    		}
		}
	});
	
};