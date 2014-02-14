$(function() {
	var $filelist = $('#filelist');
	var $report = $('#report');
	var $defaultLink = null;

	function getInformation(){
	$.get('report' + location.search).success(function(logs) {
		if(logs.err) {
			$('#err').show().find('.text-error').text(logs.err);
			$('#content').hide();
			return;
		}
		$filelist.empty().append($('<li>').attr('href', '#').addClass('nav-header').text('File List'));
		logs.forEach(function(log, i) {
			var path = log.path;
			var len;
			
			//editor.setValue(log.source);

			if(!log.msgs[platform])len=0;
			else len=log.msgs[platform].length;
			
			var $a = $('<a>').html('<span class="badge badge-warning">' + len + '</span><span>' + path + '</span>').attr('href', '#' + log.path).click(function() {
				$filelist.find('.active').removeClass('active');
				$(this).parent().addClass('active');
				var pos = path.lastIndexOf('.');
				var extname = '';
				if(pos >= 0) {
					extname = path.substring(pos);
				}
				
				editor.setValue(log.source);
				
				switch(extname) {
				case '.js':
					editor.setOption('mode', 'javascript');
					break;
				case '.css':
					editor.setOption('mode', 'css');
					break;
				case '.html':
				case '.htm':
					editor.setOption('mode', 'text/html');
					break;
				}
              	$report.empty().append($('<li>').attr('href', '#').addClass('nav-header').text('Messages In '+platform +' Platform'));
				log.msgs[platform].forEach(function(msg) {
					 $('<a>').attr('href', '#' + path + '|' + msg.line + '|' + msg.column).data('msg', msg).text('Message :' + msg.message +' <' + msg.line + ',' + msg.column + '>').click(function(e) {
                     
                       var $last = $report.find('.active').removeClass('active');
						
						if($last.length) {
					    $('.text1').remove();
					    $('.speedup1').remove();
     					editor.setLineClass($last.children('a').data('msg').line - 1, null, null);
						}
         
						$(this).parent().addClass('active');
						$report.find('.active').children('a').html('Message :' + msg.message +' <' + msg.line + ',' + msg.column + '>'+'<textarea class="text1" rows="10" cols="">'+'Tips :'+msg.example +'</textarea>'+'<text class="speedup1">'+'Speedup :' + msg.speedup+'</text>')
						editor.setCursor(msg.line - 1, msg.column - 1);
						editor.setLineClass(msg.line - 1, null, 'hilight');
						editor.scrollIntoView({
							line: msg.line - 1,
							ch: msg.column - 1
						});
					}).appendTo($('<li>').appendTo($report));
				});

			}).appendTo($('<li>').appendTo($filelist));

			if(i === 0) $defaultLink = $a;
		});
		var hash = location.hash;
		if(hash) {
			var route = hash.substring(1).split('|');
			var $hashLink = $filelist.find('a[href="#' + route[0].replace(/\\/g, '\\\\') + '"]');
			if($hashLink.length) $defaultLink = $hashLink;
		}

		if($defaultLink) $defaultLink.click();
	}).error(function(err) {
		var message;
		switch(err.status) {
		case 404:
			message = 'Report not found!';
			break;
		case 500:
			message = 'Server is temporarily unavailable!';
			break;
		default:
			message = err.statusText;
			break;
		}
		$('#err').show().find('.text-error').text(message);
		$('#content').hide();
	});
   }
   getInformation();	
	var $menu = $('#reports').find('.dropdown-menu');
	try {
		for(var i = 0, length = localStorage.length; i < length; i++) {
			var item = JSON.parse(localStorage.getItem(localStorage.key(i)));
			$menu.prepend($('<li>').addClass('report').append($('<a>').attr('href', item.url).html(item.title)));
		}
        if(localStorage.length>6)
        { 
            for(var j = 7, length = localStorage.length; j < length; j++) {      
        		 localStorage.removeItem(localStorage.key(j));
		         $menu.find('.report').remove(i);

        	}

        }

	} catch(e) {
		localStorage.clear();
	}
	$menu.find('.clear-reports').click(function() {
		localStorage.clear();
		$menu.find('.report').remove();
	});
    
    var platform='ie10';
    $('#ff').addClass('active').click(function(){
    	   $('#ie10').parent().removeClass('active');
    	   $('#chrome').parent().removeClass('active');
    	   $(this).parent().addClass('active');
           platform='ff'; 
           getInformation();
         
    });
    $('#ie10').click(function(){
           $('#ff').parent().removeClass('active');
    	   $('#chrome').parent().removeClass('active');
    	   $(this).parent().addClass('active');
           platform='ie10'; 
           getInformation();
           
    });
    $('#chrome').click(function(){
           $('#ie10').parent().removeClass('active');
    	   $('#ff').parent().removeClass('active');
    	   $(this).parent().addClass('active');
           platform='chrome'; 
           getInformation();
      
    });
   
	window.addEventListener('resize', function() {
		editor.setSize(width, window.innerHeight - 60);
	});

	var editor = CodeMirror.fromTextArea($('#code')[0], {
		mode: 'javascript',
		lineWrapping: true,
		lineNumbers: true,
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        matchBrackets : true,
        autofocus: true
	});

	var $wrapper = $(editor.getWrapperElement());
	var width = $wrapper.width();
     
    editor.setSize(width, window.innerHeight - 100);
   
	$wrapper.affix();
});