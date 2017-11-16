'use strict';

// ------------------ 依赖utilUpload -------------------
var utilUpload = require('../util_upload');
var toObject = function(re, real) {
	if (typeof re === 'object') return re;
	var json = null;
	try {
		json = JSON.parse(re);
	} catch (err) {
		if (real) json = {};
	}
	return json;
};
var toString = function(o, real) {
	if (typeof o === 'string') return o;
	var re = '';
	try {
		re = JSON.stringify(o);
	} catch (err) {
		if (real) re = JSON.stringify({
			err: err || 'JSON.stringify'
		});
	}
	return re;
};
class CacherDump {
	constructor(file) {
		this.file = file || 'tmp';
		this.values = {};
	}


	get(key, next) {
		var that = this;
		var _next = function() {
			var re = that.values[key];
			// if(isun(re)) re='';
			next(re);
		};
		this.reader(_next);
		return this;
	}
	set(key, value, next) {
		var that = this;
		var _next = function() {
			that.values[key] = value;
			// debugx('this.values',that.values);
			that.data_save(that.values, next);
		};
		this.reader(_next);
		return this;
	}
	remove(key, next) {
		var that = this;
		var _next = function() {
			delete that.values[key];
			// debugx('this.values',that.values);
			that.data_save(that.values, next);
		};
		this.reader(_next);
		return this;
	}
	clear(next) {
		this.values = {};
		next();
	}


	reader(next) {
		var that = this;
		if (this.is_read) {
			next();
		} else {
			this.data_read(function(json) {
				that.values = json;
				that.is_read = true;
				next();
			});
		}
	}


	// upload/temp
	data_dir() {
		return 'dump/';
	}
	data_name() {
		return this.data_dir() + this.file + '.json';
	}
	data_mkdir(next) {
		utilUpload.dirCreated(this.data_dir(), next)
	}
	data_save(json, next) {
		var filename = this.data_name();
		this.data_mkdir(function() {
			return utilUpload.content_write(filename, toString(json), next || function() {});
		});
	}
	data_read(next) {
		var filename = this.data_name();
		this.data_mkdir(function() {
			utilUpload.content_read(filename, function(content, err) {
				// debugx('err',err);debugx('content',content);
				next(toObject(err ? '' : content, true));
			});
		});
	}

}

exports = module.exports = CacherDump;