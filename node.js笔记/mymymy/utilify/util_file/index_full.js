'use strict';

var __fs = require('fs');
var __path = require('path');
var __basename = __path.basename;

var ox = function() {
	var re = {};
	for (var i = 0; i < arguments.length; i++) {
		if (arguments[i]) {
			for (var k in arguments[i]) {
				re[k] = arguments[i][k];
			}
		}
	}
	return re;
};

var str_replace = function(search, replace, subject, count) {
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
	if (count) this.window[count] = 0;
	for (i = 0, sl = s.length; i < sl; i++) {
		if (s[i] === '') continue;
		for (j = 0, fl = f.length; j < fl; j++) {
			temp = s[i] + '';
			repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
			s[i] = (temp).split(f[j]).join(repl);
			if (count && s[i] !== temp) {
				this.window[count] += (temp.length - s[i].length) / f[j].length;
			}
		}
	}
	return sa ? s : s[0];
};

String.prototype.r = function(v, p, n) {
	return str_replace(v, p, this, n);
};

var utilFile = {
	//path.sep		'\\' or '/'
	//path.delimiter	:=*nix, ;=win

	// logi:function(){
	// 	arguments[0]='File@'+arguments[0];
	// 	return vdcs.loger('util',arguments)
	// },


	// driver
	newDriver: function(path, opt) {
		this.utilFileDriver = this.utilFileDriver || require('./src/utilFileDriver.js');
		return new this.utilFileDriver(path, opt);
	},
	newDriverINI: function(path, opt) {
		this.utilINIDriver = this.utilINIDriver || require('./src/utilINIDriver.js');
		return new this.utilINIDriver(path, opt);
	},


	// path
	pathinfo: function(path) {
		var ext = __path.extname(path).substring(1).toLowerCase();
		return {
			filename: __path.basename(path),
			name: __basename(path, '.' + ext),
			ext: ext,
			path: path,
			dirpath: __path.dirname(path) + '/',
		};
	},
	dirpath: function(path) {
		return __path.dirname(path) + '/'
	},
	filename: function(path) {
		return __path.basename(path)
	},
	ext: function(path) {
		return __path.extname(path).substring(1).toLowerCase()
	},

	is: function(path) {
		return __fs.existsSync(path)
	},
	isAsync: function(path, next) {
		return __fs.exists(path, next)
	},


	toRealFilepath: function(file, basefile, ext) {
		var re = file;
		if (file.substr(0, 1) != '/') {
			if (basefile.substr(0, 1) != '/') basefile = '/' + basefile;
			re = __path.dirname(basefile) + '/' + file;
		}
		if (!__path.extname(re)) re += (__path.extname(basefile) || ('.' + (ext || 'html')));
		return re
	},
	realPath: function(filename, patha, opt) {
		opt = ox({
			charset: 'utf8',
			ext: '.js',
			ispath: false
		}, opt);
		var re = '';
		var n = -1;
		var _read = function() {
			n++;
			var basepath = patha[n];
			if (!basepath) return '';
			var filepath = basepath + filename + opt.ext;
			if (!__fs.existsSync(filepath)) return _read();
			return opt.ispath ? filepath : __fs.readFileSync(filepath, opt);
		};
		return _read();
	},


	path_link: function(filename, paths) {
		if (!filename) return paths;
		var rea = [];
		eacha(paths, function(basepath) {
			rea.push(basepath + filename);
		});
		return rea
	},



	getContent: function(path, opt, next) {
		if (next) return this.getContentAsync(path, opt, next);
		else return this.getContentSync(path, opt, next);
	},
	getContentSync: function(path, opt) {
		opt = ox({}, opt);
		return __fs.readFileSync(path, opt);
	},
	getContentAsync: function(path, opt, next) {
		opt = ox({}, opt);
		__fs.readFile(path, function(err, data) {
			// if(err) throw err;
			next(data, err);
		});
	},

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
				return next(null, err, opt)
			}
			next(result, err, opt)
		});
	},
	readBinAsync: function(path, opt, next) {
		return this.readAsync(path, ox({
			charset: 'binary'
		}, opt), next);
	},
	readLineAsync: function(path, opt, next) {
		var readline = require('readline'),
			fs = require('fs');
		var rl = readline.createInterface({
			input: fs.createReadStream(path),
			output: process.stdout,
			terminal: false
		});
		rl.on('line', function(line) {
			// console.log('> ' + line);
			next(line);
		});
	},
	readAsyncPath: function(filename, patha, opt, next) {
		opt = ox({
			charset: 'utf8'
		}, opt);
		var that = this;
		var n = -1;
		// if(opt.debug) that.logi('readAsyncPath',filename);
		// debugx('readAsyncPath',filename,patha);
		var _handle = function(err) {
			n++;
			var basepath = patha[n];
			if (!basepath) {
				var errs = {
					filename: filename,
					message: 'no found.',
					err: err
				};
				if (vdcs.ISDEV) vdcs.log.local_err('utilFile.readAsyncPath', errs);
				return next(null, errs, {
					filename: filename,
					filepath: patha[0] + filename,
					basepath: patha[0]
				});
			}
			// debugx('readAsyncPath',basepath+filename);
			// if(opt.debug) that.logi('readAsyncPath',basepath+filename);
			__fs.readFile(basepath + filename, opt.charset, function(err, result) {
				if (err) return _handle(err);
				next(result, null, {
					filename: filename,
					filepath: basepath + filename,
					basepath: basepath
				});
			});
		};
		_handle();
	},
	readAsyncMulti: function(paths, opt, next) {
		var that = this;
		opt = ox({
			sp: '\n'
		}, opt);
		var def = opt.charset == 'binary' ? null : '';
		if (opt.filename) paths = this.path_link(opt.filename, paths);
		// debugx('readAsyncMulti',paths);
		var step = vdcs.newStep();
		eacha(paths, function(path, n) {
			step.on(n + ',' + path, function() {
				var thon = this;
				// path=path.r('//','/');
				// debugx('path',path);
				that.readAsync(path, {
					charset: opt.charset
				}, function(result, err, opta) {
					// debugx('err',err);
					if (err) {
						thon.rets('err', err);
						if (vdcs.ISDEV) vdcs.log.local_err('utilFile.readAsyncMulti', path, err);
					} else {
						thon.rets('err', null);
						// vdcs.log.info(path,result);
						if (opt.issingle) {
							thon.rets('content', result || def);
							thon.rets('opta', opta);
							return thon.go('last');
						}
						thon.rets('content', (thon.rets('content') || '') + (result || '') + opt.sp);
					}
					thon.next();
				});
			});
		});
		step
			.on('last', function() {
				this.next()
			})
			.succeed(function(rets, err) {
				if (opt.issingle) {
					next(rets['content'] || def, err || rets['err'], rets['opta'] || {});
				} else {
					next(rets['content'] || def, err, rets['opta'] || {});
				}
			})
			.run();
		return step
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
	writeBinAsync: function(path, content, opt, next) {
		return this.writeAsync(path, content, ox({
			charset: 'binary'
		}, opt), next);
	},


	cp: function() {
		this.copy.apply(this, arguments)
	},
	copy: function(frompath, topath, next) {
		next = next || function() {};
		// console.log('file_copy','frompath='+frompath);
		// console.log('file_copy','topath='+topath);
		var readStream = __fs.createReadStream(frompath);
		var writeStream = __fs.createWriteStream(topath);
		readStream.pipe(writeStream);
		readStream.on('end', function() {
			// console.log('file_copy','end');
			next({
				filename: frompath.filename(),
			});
		});
		readStream.on('error', function(err) {
			// console.log('file_copy',err);
			next(null, err)
		});
	},



	isDir: function(path) {
		return __fs.existsSync(path)
	},

	dirEach: function(dirpath, opt, next) {
		var that = this;
		opt = ox({
			ext: ''
		}, opt);
		var reg_str = opt.rule || (opt.ext ? ('.' + opt.ext) : ''); // /\.js$/
		if (reg_str) reg_str = reg_str.r('.', '\\.').r('@', '\\@').r('*', '.*') + '$';
		// debugx('reg_str',reg_str);
		if (!this.isDir(dirpath)) return;
		//if(dirpath.substring(-1)!='/') dirpath+='/';
		__fs.readdirSync(dirpath).forEach(function(filename) {
			if (reg_str && !new RegExp(reg_str).test(filename)) return;
			that.dir_file_filter(dirpath, filename, next);
		});
	},
	dirFilesAsync: function(dirpath, opt, next) {
		var that = this;
		opt = ox({
			ext: ''
		}, opt);
		var reg_str = opt.rule || (opt.ext ? ('.' + opt.ext) : ''); // /\.js$/
		if (reg_str) reg_str = reg_str.r('.', '\\.').r('@', '\\@').r('%d', '\\d+').r('*', '.*') + '$';
		// reg_str='phq\\.pdf\\@conv-\\d+\\.png';
		// debugx('reg_str',reg_str);
		if (!this.isDir(dirpath)) return;
		//if(dirpath.substring(-1)!='/') dirpath+='/';
		__fs.readdir(dirpath, {}, function(err, files) {
			if (err) return next(null, err);
			var ret = [];
			// debugx('files',tn(files),files);
			files.forEach(function(filename) {
				if (reg_str && !new RegExp(reg_str).test(filename)) return;
				that.dir_file_filter(dirpath, filename, function(info) {
					ret.push(info);
				});
			});
			next(ret);
		})
	},
	dir_file_filter: function(dirpath, filename, next) {
		var ext = this.ext(filename);
		// debugx('dir_file_filter',filename,ext);
		next({
			filename: filename,
			name: __basename(filename, '.' + ext),
			ext: ext,
			path: __path.join(dirpath, filename),
		});
	},

	// flag
	dirCreated: function(path, isfile) {
		var _path = isfile ? __path.dirname(path) : path;
		if (__fs.existsSync(_path)) return;
		return this.mkdirsSync(_path);
		if (!this.mkdirp) this.mkdirp = vdcs.requirer('support/mkdirp');
		return this.mkdirp(_path);
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
		_create(dirpath, function() {})
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

exports = module.exports = utilFile;

/*

path.normalize('path')   处理path中的' . '与'..'
path.join(a,b,..z)  处理为a/b/.../z，并对结果执行normalize
path.resolve(a,b,...z) 对每个元素执行cd item，返回最终结果
path.relative(a,b)  返回b对于a的切换方式，可包含'.'与'..'
path.dirname(path) path.basename(path,'mask') 返回路径的目录部分与文件名部分
path.extname(path) 返回路径的扩展名部分
path.seq  OS特定的路径分隔符 "\\" 或  "/"

console.log(path.normalize('~/workspace/linda/../help'));
console.log(path.join('hello','world','..'));
console.log(path.resolve('/home/aaa','workspace','..'));
console.log(path.relative('/home/aaa','/home/bbb'));
console.log(path.basename('/home/aaa/1.txt','.txt'));
console.log(path.dirname('/home/aaa/1.txt'));

//输出
~/workspace/help
hello
/home/aaa
../bbb
1
/home/aaa

*/