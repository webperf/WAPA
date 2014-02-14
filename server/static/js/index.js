(function() {
	// initialize drop zone
	$(function() {
		$('.uploader').filedrop({
			fallback_id: 'app',
			paramname: 'app',
			url: 'analyze',
			// allowedfiletypes: ['application/zip', 'application/x-zip-compressed', 'application/octet-stream'],
			maxfiles: 1,
			maxfilesize: 2000,
			error: function(err, file) {
				switch(err) {
				case 'BrowserNotSupported':
					$('.alert').show().find('.error').html('browser does not support html5 drag and drop');
					break;
				case 'TooManyFiles':
					// user uploaded more than 'maxfiles'
					$('.alert').show().find('.error').html('Too many files!');
					break;
				case 'FileTooLarge':
					// program encountered a file whose size is greater than 'maxfilesize'
					// FileTooLarge also has access to the file which was too large
					// use file.name to reference the filename of the culprit file
					$('.alert').show().find('.error').html('File is larger than 20M!');
					break;
				case 'FileTypeNotAllowed':
					// The file type is not in the specified list 'allowedfiletypes'
					$('.alert').show().find('.error').html('Only zip file is allowed to upload!');
				default:
					break;
				}
				$('.uploader').removeClass('over');
			},
			dragOver: function() {
				$('.uploader').addClass('over');
			},
			dragLeave: function() {
				$('.uploader').removeClass('over');
			},
			uploadStarted: function(i, file, len) {
				// a file began uploading
				// i = index => 0, 1, 2, 3, 4 etc
				// file is the actual file of the index
				// len = total files user dropped
				$('.alert').hide();
				$('.uploading').show();
				$('.uploader').hide();
				$('.uploaded').hide();
			},
			uploadFinished: function(i, file, response, time) {
				// response is the data you got back from server in JSON format.
				var item = {title: new Date().toString(), url: response.path};
				
				localStorage.setItem(Date.now(), JSON.stringify(item));

				$('.uploading').hide();
				$('.uploader').hide();
				$('.uploaded').show().find('.path').html(item.title).attr('href', item.url);

				countdown(function(s){
					$('.time').html(s);
					if (s <= 0) {
						//console.log('REPSONSE :'+response);
						location = item.url;
					}
				}, 5);

				function countdown(cb, s) {
					cb(s--);
					if (s < 0) return;
					setTimeout(function(){countdown(cb, s);}, 1000);
				}
			},
			progressUpdated: function(i, file, progress) {
				// this function is used for large files and updates intermittently
				// progress is the integer value of file being uploaded percentage to completion
				$('.uploading').find('.bar').css('width', progress + '%');
			}
		});
	});

	// fetch reports
	var $menu = $('#reports').find('.dropdown-menu');
	try{
		for(var i = 0, length = localStorage.length; i < length; i++) {
			var item = JSON.parse(localStorage.getItem(localStorage.key(i)));
			$menu.prepend($('<li>').addClass('report').append($('<a>').attr('href', item.url).html(item.title)));
		}
	} catch (e) {
		localStorage.clear();
	}
	$menu.find('.clear-reports').click(function(){
		localStorage.clear();
		$menu.find('.report').remove();
	});

})();
