'use strict';

var utilCacher = {

	drivers: {},
	driver: function(drive) {
		if (!this.drivers[drive]) this.drivers[drive] = new CacherDriver(drive);
		return this.drivers[drive];
	},

	get: function(drive, key, next) {
		next = next || function() {};
		this.driver(drive).get(key, function(content) {
			next(content);
		});
	},
	set: function(drive, key, value, next) {
		next = next || function() {};
		this.driver(drive).set(key, value, function(content) {
			next(content);
		});
	},
	remove: function(drive, key, next) {
		next = next || function() {};
		this.driver(drive).remove(key, function() {
			next();
		});
	},
	clear: function(drive, next) {
		next = next || function() {};
		this.driver(drive).clear(function() {
			next();
		});
	},
};

class CacherDriver {
	constructor(opt) {
		if (typeof opt === 'string') opt = {
			drive: opt
		};
		this.opt = opt;
		this._driver = null;
	}

	driver() {
		var that = this;
		if (!that._driver) {
			var CacherDump = require('./cacher_dump');
			that._driver = new CacherDump(this.opt.drive);
		}
		return that._driver;
	}

	get(key, next) {
		next = next || function() {};
		this.driver().get(key, function(content) {
			next(content);
		});
	}
	set(key, value, next) {
		next = next || function() {};
		this.driver().set(key, value, function(content) {
			next(content);
		});
	}
	remove(key, next) {
		next = next || function() {};
		this.driver().remove(key, function() {
			next();
		});
	}
	clear(next) {
		next = next || function() {};
		this.driver().clear(function() {
			next();
		});
	}
}

exports = module.exports = utilCacher;