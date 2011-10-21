/*
---
script: MooUpload.js

description: HTML5 Uploader

license: MIT-style license.

authors:
- Yannick Croissant

requires:
core/1.3: '*'

provides: [MooUpload]

...
*/

var MooUpload = new Class({
	
	Implements: [Options, Events],

	options: {/*
		onBeforeAdd: function(){},
		onAfterAdd: function(){},
		onBeforeRemove: function(key){},
		onAfterRemove: function(key){},
		onBeforeEmpty: function(){},
		onAfterEmpty: function(){},
		onRequestStart: function(){},
		onUploadQueueStart: function(){},
		onUploadStart: function(event){},
		onUploadProgress: function(event){},
		onUploadAbort: function(event){},
		onUploadError: function(event){},
		onUploadFinish: function(event){},
		onRequestFinish: function(event){},
		onUploadQueueFinish: function(event){},
		inject: {							// Place to put the upload input
			target: element,
			where: 'after',
		},*/
		buttonSubmit: null,					// An element to use as "Upload" button
		buttonAdd: null,					// An element to use as "Add file" button
		multiple: false,					// Enable or disable multiple file selection
		accept: '*/*',						// Accepted filetypes
		target: '',							// Server-side target
		data: function(file){				// Data to send
			return {
				'file': file
			}
		}
	},

	/*
	 * Contructor
	 */
	initialize: function(options){
		this.setOptions(options);
		this.buttonSubmit = document.id(this.options.buttonSubmit);
		this.buttonAdd = document.id(this.options.buttonAdd);
		this.files = {};
		this.key = null;
		this.index = 0;
		
		var target = (this.options.inject && this.options.inject.target) || this.buttonSubmit;
		var where = (this.options.inject ? this.options.inject.where : '') || (target == document.body ? 'inside' : 'after');
		
		// Create the file input
		this.input = new Element('input[type=file]', {
			multiple: this.options.multiple,
			accept: this.options.accept,
			styles: {
				position: 'absolute',
				left: '-9999px',
			},
			title: this.buttonAdd && this.buttonAdd.title ? this.buttonAdd.title : '',
			events: {
				change: function(){
					this.fireEvent('onBeforeAdd');
					// Add the file to the list
					if (!this.options.multiple) this.files = [];
					Array.from(this.input.files).forEach(function(file){
						this.files[String.uniqueID()] = file;
					}.bind(this));
					// Get the file keys
					this.filesKeys = Object.keys(this.files);
					this.fireEvent('onAfterAdd');
					// Send files if queuing is disabled
					if (!this.buttonAdd) this.send();
				}.bind(this)
			}
		}).inject(target, where);
		
		// Send button
		if (this.buttonSubmit) {
			this.buttonSubmit.addEvent('click', function(e){
				e.stop();
				// Ask for file if queuing is disabled
				if (!this.buttonAdd) this.input.click();
				else this.send();
			}.bind(this));
		}
		
		// Add button
		if (this.buttonAdd) {
			this.buttonAdd.addEvent('click', function(e){
				e.stop();
				// Ask for files
				this.input.click();
			}.bind(this));
		}
		
		// Create the upload request
		this.request = new XMLHttpRequest();
		
		// Watch events
		this.request.upload.addEventListener('loadstart', function(e) { this.fireEvent('onUploadStart', e); }.bind(this), false);
		this.request.upload.addEventListener('progress', function(e) { this.fireEvent('onUploadProgress', e); }.bind(this), false);
		this.request.upload.addEventListener('abort', function(e) { this.fireEvent('onUploadAbort', e); }.bind(this), false);
		this.request.upload.addEventListener('error', function(e) { this.fireEvent('onUploadError', e); }.bind(this), false);
		this.request.upload.addEventListener('load', function(e) { this.fireEvent('onUploadFinish', e); }.bind(this), false);
		this.request.addEventListener('readystatechange', function(e){
			if (this.request.readyState != 4 || this.request.status != 200) return;
			this.fireEvent('onRequestFinish', e);
			// Send the next file
			var key = this.filesKeys[++this.index];
			if (key) return this._sendFile(key);
			// End of the file list
			this.files = {};
			this.index = 0;
			this.fireEvent('onUploadQueueFinish', e);
			
		}.bind(this), false);
	},
	
	/*
	 * Remove a file from the upload list
	 */
	remove: function(key){
		this.fireEvent('onBeforeRemove', key);
		delete this.files[key];
		// Get the file keys
		this.filesKeys = Object.keys(this.files);
		this.fireEvent('onAfterRemove', key);
	},
	
	/*
	 * Empty the upload list
	 */
	empty: function(){
		this.fireEvent('onBeforeEmpty');
		this.files = {};
		// Get the file keys
		this.filesKeys = [];
		this.fireEvent('onAfterEmpty');
	},
	
	/*
	 * Send all files
	 */
	send: function(){
		// Event
		this.fireEvent('onUploadQueueStart');
		// Send the first file
		this._sendFile(this.filesKeys[this.index]);
		return this;
	},
	
	/*
	 * Return the number of selected files
	 */
	length: function(){
		return this.filesKeys ? this.filesKeys.length : 0;
	},
	
	/*
	 * Send a file
	 */
	_sendFile: function(key){
		this.formdata = new FormData();
		this._appendData(this.options.data.apply(this, [this.files[key]]));
		this.request.open('POST', this.options.target);
		this.fireEvent('onRequestStart');
		this.request.send(this.formdata);
		delete this.formdata;
	},
	
	_appendData: function(data, parent){
		Object.each(data, function(value, key){
			if (parent) key = parent + '[' + key + ']';
			if (typeOf(value) == 'object' && !instanceOf(value, File)) this._appendData(value, key);
			else this.formdata.append(key, value);
		}.bind(this));
	}
	
});