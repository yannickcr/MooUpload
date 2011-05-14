MooUpload
====

MooUpload is a MooTools class that help you to create a file uploader using some new features of HTML5 like multiple file selection, AJAX file upload, upload progress, etc.

How to use
----------

To use MooUpload, you need an element to use as "Upload" button.

### Example

HTML:

	<button id="myuploadbutton">Upload</button>

JavaScript:

	new MooUpload({
		buttonSubmit: 'myuploadbutton',	// Element to use as "Upload" button
		target: 'target.php'			// Server-side target
	});

This way the button will let you to choose a file and send it immediately to the server.

You can customize this behavior with the options.

For example, you can have a "Add files" button to add some images in the queue and an "Upload" button to send them:

HTML:

	<button id="myaddfilesbutton">Add images</button>
	<button id="myuploadbutton">Upload</button>

JavaScript:

	new MooUpload({
		buttonSubmit: 'myuploadbutton',	// Element to use as "Upload" button
		buttonAdd: 'myaddfilesbutton',	// Element to use as "Upload" button
		target: 'target.php'			// Server-side target
		multiple: true,					// Enable or disable multiple file selection
		accept: 'image/*',				// Accepted filetypes
	});

For more informations please read the [Documentation](https://github.com/Country/MooUpload/Docs/MooUpload.md)

### Notes

 * Currently there is no fallback if the browser do not support some HTML5 features. This class was successfuly tested under Fx 4, Chrome 11 and Safari 5.