'use strict';

var __fs = require('fs');
var __path = require('path');
var __basename = __path.basename;

String.prototype.r = function(v, p, n) {
	return str_replace(v, p, this, n);
};

var utilFile = {

	// flag
	read: function(path, opt, next) {
		if (next) return this.readAsync(path, opt, next);
		else return this.readSync(path, opt);
	},
	// flag
	readSync: function(path, opt) {
		if (!path) return next(null, {
			status: 'read.path'
		});
		opt = ox({}, opt);
		return __fs.readFileSync(path, opt).toString();
	},
	// flag
	readAsync: function(path, opt, next) {
		if (!path) return next(null, {
			status: 'read.path'
		});
		opt = ox({
			path: path,
			charset: 'utf8'
		}, opt);
		return __fs.readFile(path, opt.charset, function(err, result) {
			if (err) {
				// if (vdcs.ISDEV) vdcs.log.local_err('utilFile.readAsync', err);
				return next(null, err, opt);
			}
			next(result, err, opt);
		});
	},

	// flag
	writeOptions: function(opt) {
		opt = opt || {};
		switch (opt.flag) {
			case 'w':
			case 'write':
				opt.flag_value = 'w';
				break;
			case '+':
			case 'a':
			case 'append':
				opt.flag_value = 'a';
				break;
			default:
				opt.flag_value = 'w';
				break;
		}
		switch (opt.mode) {
			case 777:
			case 'run':
				opt.mode_value = '0777';
				break;
			case 438:
			case 'base':
				opt.mode_value = 438;
				break;
			case 'def':
			default:
				opt.mode_value = '0666';
				break; // 0o666
		}
		opt.encoding_value = opt.charset || 'utf-8';
		return opt
	},
	// flag
	write: function(path, content, opt, next) {
		if (next) return this.writeAsync(path, content, opt, next);
		else return this.writeSync(path, content, opt);
	},
	// flag
	writeSync: function(path, content, opt) {
		opt = this.writeOptions(opt);
		this.dirCreated(path, true);
		__fs.writeFileSync(path, content, {
			encoding: opt.encoding_value,
			flag: opt.flag_value,
			mode: opt.mode_value
		});
		return true
	},
	// flag
	writeAsync: function(path, content, opt, next) {
		if (typeof next === 'undefined') {
			next = opt;
			opt = {};
		}
		opt = this.writeOptions(opt);
		this.dirCreated(path, true);
		return __fs.writeFile(path, content, {
			encoding: opt.encoding_value,
			flag: opt.flag_value,
			mode: opt.mode_value
		}, next);
	},

	// flag
	dirCreated: function(path, isfile) {
		var _path = isfile ? __path.dirname(path) : path;
		if (__fs.existsSync(_path)) return;
		return this.mkdirsSync(_path);
		// if (!this.mkdirp) this.mkdirp = vdcs.requirer('support/mkdirp'); // ??????
		// return this.mkdirp(_path);
	},

	// flag
	mkdirs: function(dirpath, mode, next) {
		if (next) return this.mkdirsAsync(dirpath, mode, next);
		else this.mkdirsSync(dirpath, mode);
	},
	// flag
	mkdirsSync: function(dirpath, mode) {
		var that = this;
		var _create = function(tmpath, next) {
			// logi('mkdirsSync',tmpath);
			if (__fs.existsSync(tmpath)) return next();
			// logi('mkdirsSync','next');
			_create(__path.dirname(tmpath), function() {
				// logi('mkdirSync',tmpath);
				__fs.mkdirSync(tmpath, mode);
				next();
			});
		};
		_create(dirpath, function() {});
	},
	// flag
	mkdirsAsync: function(dirpath, mode, next) {
		var that = this;
		__fs.exists(dirpath, function(exists) {
			if (exists) return next(dirpath);
			// 尝试创建父目录，然后再创建当前目录
			that.mkdirsAsync(__path.dirname(dirpath), mode, function() {
				__fs.mkdir(dirpath, mode, next);
			});
		});
	},

};

function ox() {
	var re = {};
	for (var i = 0; i < arguments.length; i++) {
		if (arguments[i]) {
			for (var k in arguments[i]) {
				re[k] = arguments[i][k];
			}
		}
	}
	return re;
}

function str_replace(search, replace, subject, count) {
	var i = 0,
		j = 0,
		temp = '',
		repl = '',
		sl = 0,
		fl = 0,
		f = [].concat(search),
		r = [].concat(replace),
		s = subject,
		ra = Object.prototype.toString.call(r) === '[object Array]',
		sa = Object.prototype.toString.call(s) === '[object Array]';
	s = [].concat(s);
	// if (count) this.window[count] = 0;
	for (i = 0, sl = s.length; i < sl; i++) {
		if (s[i] === '') continue;
		for (j = 0, fl = f.length; j < fl; j++) {
			temp = s[i] + '';
			repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
			s[i] = (temp).split(f[j]).join(repl);
			if (count && s[i] !== temp) {
				// this.window[count] += (temp.length - s[i].length) / f[j].length;
			}
		}
	}
	return sa ? s : s[0];
}

exports = module.exports = utilFile;