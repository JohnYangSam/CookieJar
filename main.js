/* JavaScript for Cookie Jar main.html fileUpload */

/*
 * NOTE - References for File and DnD APIs
 * HTML5 Rocks Tutorials - http://www.html5rocks.com/
 * DZone tutorials - http://www.dzone.com
 */

/* Correct JLint for the browser and Google libraries */
/*jslint browser: true, devel: true, plusplus: true, vars: true*/
/*global getElementById: true*/

/* Globals */

/* Initialize drop file element variables */
var fileDropArea = document.getElementById('fileDropArea');
//Playing with the new CSS3 selectors!
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d'); //Get the 2d API for the canvas element
var fileCount = document.getElementById('fileCount');
var uploadUrl = document.getElementById('uploadUrl');
var uploadStatus = document.getElementById('uploadStatus');

/* Initialize standard file input element variables */
var standardUploadArea = document.getElementById('standardUploadedArea');
var standardFiles = document.getElementById('standardFiles');
var standardFilesUploaded = document.getElementById('standardFilesUploaded');



var fileSelectHandler = function () {
	'use strict';
	//Get a FileList Object
	var files, file, output, outputStr, i;
	files = event.target.files;

	//Display file list properties
	output = [];
	for (i = 0; i < files.length; ++i) {
		file = files[i];
		//Note: array.push allows you to add multiple elements to the end of an array
		//with commas. Cool array command for Javascript!	
		output.push('<li>');
		output.push('File: ' + file.name,
					' File type: ' + file.type,
					' File size: ' + file.size,
					' Modified on: ' + file.lastModifiedDate.toDateString()
				   );
	}
	//String conversations for the entire array are joined together by
	//the passed in variable (a space in this case)
	outputStr = '<ul>' + output.join(' ') + '</ul>';
	
	standardFilesUploaded.innerHTML = outputStr;
};


var initStandardUploadAreaHandlers = function () {
	'use strict';
	standardFiles.addEventListener('change', fileSelectHandler, false);
};



var initFileDropAreaHandlers = function () {
	'use strict';
	fileDropArea.addEventListener(
	fileDropArea.addEventListener(
	fileDropArea.addEventListener(
	fileDropArea.addEventListener(
};


/* Checks if there is File API support in the browser */
var checkForFileAPISupport = function () {
	if (window.File && window.FileReader && window.FileList && window.Blod) {
		//Browser supports file reading APIs
	} else {
		alert('This browser does not completely support HTML5 file reading APIs please switch to a more updated browser');
	}
};

var handleDrop = function (event) {
	'use strict';
	var i, file;
	event.stopPropogation(); //Stops redirection to the file when dropped
	event.preventDefault();

	var files = event.dataTransfer.files;
	for(i = 0; i < files.length; ++i) {
		file = files[i];

	}
};


/* Init the Javacscipt attached to the body onload */
var init() = function () {
	checkFileAPISupport();
	initStandardUploadAreaHandlers();
	initFileDropAreaHandlers();

};

