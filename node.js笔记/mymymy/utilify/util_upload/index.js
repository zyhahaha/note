/*
utilUpload.toPath('/dump/test.json');
*/

// ----------- 依赖utilFile ----------------
var utilFile = require('../util_file');
var utilUpload = {


	toPath: function(path, basepath, real) {
		var re = '',
			uppath = '',
			_path = path;
		// if (path.substr(0, 8) == '/upload/') {
		// 	// uppath='upload/';
		// 	_path = path.substr(8);
		// } else {
		// 	if (!isRealPath(path)) _path = path;
		// }
		// if (_path) {
		// 	re = (basepath) + _path;
		// 	if (real) {
		// 		var tmp_path = 'res/upload/' + _path;
		// 		re = tmp_path;
		// 		// if (is_file(tmp_path = VDCS_PATH_WEB + 'res/upload/' + _path)) re = tmp_path;
		// 		// else if (is_file(tmp_path = VRES_RES_PATH + 'upload/' + _path)) re = tmp_path;
		// 	}
		// }
		return re || path;
	},
	toPathReal: function(path, basepath) {
		return this.toPath(path, basepath, true);
	},
	toURL: function(path, baseurl) {
		var re = path;
		if (path.substr(0, 8) == '/upload/') {
			re = DCS.url(path.substr(8), baseurl);
		}
		return re;
	},

	saveBin: function(file, content, next) {
		// debugx('saveBin',this.toPath(file));
		return utilFile.write(this.toPath(file), content, {
			charset: 'binary'
		}, next);
	},


	content_read: function(file, next) {
		return utilFile.read(this.toPath(file), {}, next);
	},
	content_write: function(file, content, next) {
		return utilFile.write(this.toPath(file), content, {}, next);
	},

	dirCreated: function(dirname, next) {
		return utilFile.mkdirs(this.toPath(dirname), null, next);
	},

};

exports = module.exports = utilUpload;