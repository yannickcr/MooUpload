Class: MooUpload {#MooUpload}
=========================================

MooUpload is a MooTools class that help you to create a file uploader using some new features of HTML5 like multiple file selection, AJAX file upload, upload progress, etc.

### Implements:

[Options][options], [Events][events]

MooUpload Method: constructor {#MooUpload:constructor}
-------------------------------------------------------------------

### Syntax:

	var myMooUpload = new MooUpload(options);

### Arguments:

1. options - (object) Options for the class.

### Options:

* buttonSubmit - (mixed) A CSS selector or an Element reference for the "Upload" button
* buttonAdd - (mixed) A CSS selector or an Element reference for the "Add file" button
* multiple - (boolean: defaults to false) Enable or disable multiple file selection
* inject - (object) where to inject the upload input. If not specified, the input is injected after the upload button. Example: *inject: { target: element, where: 'after' }*
* accept (string: defaults to `*/*`) The filetypes accepted by the upload input
* target - (string) The server-side script who will receive the files
* data - (function) a function who will return the data to send to the server-side script. Useful if you want to send some other data with your file. Default to *function(file) { return { 'file':file } }*

### Events:

* onBeforeAdd (function) Callback to execute before the file selection.
* onAfterAdd (function) Callback to execute after the file selection.
* onBeforeRemove (function) Callback to execute before removing a file from the queue; passed the key of the file in the file list.
* onAfterRemove (function) Callback to execute after removing a file from the queue; passed the key of the file in the file list.
* onBeforeEmpty (function) Callback to execute before emptying the queue.
* onAfterEmpty (function) Callback to execute after emptying the queue.
* onRequestStart (function) Callback to execute at the start of the request.
* onUploadQueueStart (function) Callback to execute at the start of the queue.
* onUploadStart (function) Callback to execute at the start of the file upload; passed the loadstart event.
* onUploadProgress (function) Callback to execute during upload progress; passed the progress event.
* onUploadAbort (function) Callback to execute if the upload is aborted; passed the abort event.
* onUploadError (function) Callback to execute if an upload error occure; passed the error event.
* onUploadFinish (function) Callback to execute at the end of the file upload; passed the load event.
* onRequestFinish (function) Callback to execute at the end of the request; passed the readystatechange event.
* onUploadQueueFinish (function) Callback to execute at the end of the queue.

### Example:

#### HTML:

	<button id="myaddfilesbutton">Add images</button>
	<button id="myuploadbutton">Upload</button>

#### JavaScript:

	new MooUpload({
		buttonSubmit: 'myuploadbutton',	// Element to use as "Upload" button
		buttonAdd: 'myaddfilesbutton',	// Element to use as "Upload" button
		target: 'target.php'			// Server-side target
		multiple: true,					// Enable or disable multiple file selection
		accept: 'image/*',				// Accepted filetypes
	});

MooUpload Method: send {#MooUpload:send}
-------------------------------------------------------------------

Send all files.

### Syntax:

	myMooUpload.send();

### Returns:

* (object) This MooUpload instance.

### Example:

#### JavaScript:

    var myMooUpload = new MooUpload('#button1');
    
    var button2 = new Element('button', {id: 'button2', text: 'Copy', 'data-source': 'Copy me !'}).inject(document.id('button1'), 'after');

    myMooUpload.addElements('#button2');

MooUpload Method: remove {#MooUpload:remove}
-------------------------------------------------------------------

Remove a file from the upload list.

### Syntax:

	myMooUpload.remove(key);

### Arguments:

1. key - (string) The key of the file to remove.

### Returns:

* (object) This MooUpload instance.

MooUpload Method: empty {#MooUpload:empty}
-------------------------------------------------------------------

Empty the upload list.

### Syntax:

	myMooUpload.empty();

### Returns:

* (object) This MooUpload instance.

MooUpload Method: length {#MooUpload:length}
-------------------------------------------------------------------

Return the number of selected files.

### Syntax:

	myMooUpload.length();

### Returns:

* (integer) The number of selected files.

[options]:http://mootools.net/docs/core/Class/Class.Extras#Options
[events]:http://mootools.net/docs/core/Class/Class.Extras#Events