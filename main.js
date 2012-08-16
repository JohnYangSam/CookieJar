/* JavaScript for Cookie Jar main.html fileUpload */

/*
 * NOTE - References for File and DnD APIs
 * HTML5 Rocks Tutorials - http://www.html5rocks.com/
 * DZone tutorials - http://www.dzone.com
 * MDN Mozilla Developer Netork - http://developer.mozilla.org
 */

/* Correct JLint for the browser and Google libraries */
/*jslint browser: true, devel: true, plusplus: true, vars: true*/
/*global getElementById: true*/

/* Globals */
var serverURL = "http://example.com";

var fileList;


/* Initialize drop file element variables */
var fileDropArea = document.getElementById('fileDropArea');
//Playing with the new CSS3 selectors!
var dropAreaUploadStatus = document.getElementById('uploadStatus');

/* Initialize standard file input element variables */
var standardUploadArea = document.getElementById('standardUploadedArea');
var standardFiles = document.getElementById('standardFiles');
var standardFilesUploaded = document.getElementById('standardFilesUploaded');

/* 
 * Takes in a FileList (files) and returns a string list of
 * the information related to the files that can be placed inside a
 * containing element.
 */
var getFileInformationList = function (files) {
	'use strict';
	var output, outputStr, file, i;
	//Display file list properties
	output = [];
	for (i = 0; i < files.length; ++i) {
		file = files[i];
		//Note: array.push allows you to add multiple elements to the end of an array
		//with commas. Cool array command for Javascript!	
		output.push('<li>File: ' + file.name + '</li>',
					'<li>File type: ' + file.type + '</li>',
					'<li>File size: ' + file.size + '</li>',
					'<li>Modified on: ', file.hasOwnProperty('lastModifiedDate') === true ? file.lastModifiedDate.toDateString() + '</li>' : 'n/a' + '</li>'
			   );
	}
	//String conversations for the entire array are joined together by
	//the passed in variable (a space in this case)
	outputStr = "<strong>You downloaded: </strong>" + '<ul>' + output.join(' ') + '</ul>';
	return outputStr;
};

/* 
 * Handle actual file uploading to a server through XMLHttpRequest()
 * object.
 */
var uploadFile = function (file, statusElement) {
	'use strict';
	//Create an XML object
	var request = new XMLHttpRequest();
	//console.log(file);
	//Open a new post request to the server
	request.open('POST', serverURL);
	
	//When the XMLHttpRequest loads, set a new element on the
	//statusElement to show that the file has been uploaded
	request.onload = function () {
		'use strict';
		var newStatus =	document.createElement('p');
		newStatus.innerHTML = this.responseText;
		console.log("status");
		statusElement.append(newStatus);
	};
	
	/*request.onerror = function () {
		var newStatus = document.creatElemnt('p');
		newStatus.innerHTML = this.responseText;
	};
	request.upload.onprogress = function (event) {
		handleProgress(event);
	}
	*/
};


/*
 * Handler to deal with standard file selection
 */
var fileSelectHandler = function (event) {
	'use strict';
	//Stop standard propagation	
	event.stopPropagation();
	event.preventDefault();
	//Get a FileList Object

	var files;
	files = event.target.files;
	//Do something with the files

	uploadFile(files[0], dropAreaUploadStatus);
	//replace the standard files uploaded information with the currently loaded files	
	standardFilesUploaded.innerHTML = getFileInformationList(files);
	console.log(getFileInformationList(files));
};

/* init standard file upload / file selection */
var initStandardUploadAreaHandlers = function () {
	'use strict';
	standardFiles.addEventListener('change', fileSelectHandler, false);
};


/*
 * Stope the propagation and default action of a drop in the area,
 * makes a helper call to give data about the item. It sets up the 
 * FileList array so that it can be read into a server.
 */
var fileDropHandler = function (event) {
	'use strict';
	var files;
	event.stopPropagation();
	event.preventDefault();

	files = event.dataTransfer.files; // FileList object

	//Set the files array to the global object so files can begin to be
	//read to the server from it.
	fileList = files;
	//loadNextFile();
	uploadFile(files[0], dropAreaUploadStatus);
	dropAreaUploadStatus.innerHTML = getFileInformationList(files);
	console.log(getFileInformationList(files));
};


/*
 * Stops the propagation of a drag over on the area (i.e. so when you
 * drag a file over the area, it doesn't just go straight to that place)
 * Also, the handler sets the 'copy' drop effect (see MDN for a list).
 * This adds the '+' to cursor with a file over the area and specified
 * that a drop will copy (versus moving, etc.).
 */
var dragOverHandler = function (event) {
	'use strict';
	var files;

	//Stops redirection to the file when dropped
	event.stopPropagation();
	event.preventDefault();

	event.dataTransfer.dropEffect = 'copy';
};



/*
 * Init the handlers for the fileDropArea
 */
var initFileDropAreaHandlers = function () {
	'use strict';
	fileDropArea.addEventListener('dragover', dragOverHandler, false);
	fileDropArea.addEventListener('drop', fileDropHandler, false);
};


/* Checks if there is File API support in the browser */
var checkForFileAPISupport = function () {
	'use strict';
	if (window.File && window.FileReader && window.FileList && window.Blod) {
		//Browser supports file reading APIs
	} else {
		console.log('This browser does not completely support HTML5 file reading APIs please switch to a more updated browser');
	}
};


/* Init the Javacscipt attached to the body onload */
var init = function () {
	'use strict';
	checkForFileAPISupport();
	initStandardUploadAreaHandlers();
	initFileDropAreaHandlers();

};


/*
 * File upload structure:
 *
 * 1) Handlers listen for drag and drop and/or standard input.
 * 2) These set a files (FileList) to the fileList global variable.
 * loadNextFile() reads one thing from the global file, shrinking the
 * array
 *
 */
 

