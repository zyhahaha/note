var fs = require('fs');
var express = require('express');
var router = express.Router();
router.APP_PATH = '';

var urlPath = '';
var urlPathArr = [];
for (var i = 0; i < 20; i++) {
	urlPath += '/:path' + i + '?';
	urlPathArr.push('path' + i);
}

router.get(urlPath, function(req, res, next) {
	var path = handleUrl(req.params); // 获取路径
	if (!fs.existsSync(path + '.js')) return res.json({
		'status': 'failed',
		'mssage': 'unknown'
	});

	var exeMod = {};
	var execute = require(path); // 加载执行文件
	var getJson = req.query; // get参数
	var postJson = req.body; // post参数
	var opt = {
		getJson: getJson,
		postJson: postJson
	};
	var entry = req.query.action || ''; // 入口名称

	loadMod(router.APP_PATH, exeMod);
	
	Object.assign(execute, exeMod);
	execute.parse(entry, opt, function(result) { // 解析
		res.json(result); // 返回数据
	});
});
router.post(urlPath, function(req, res, next) {
	var path = handleUrl(req.params);
	if (!fs.existsSync(path + '.js')) return res.json({
		'status': 'failed',
		'mssage': 'unknown'
	});

	var exeMod = {};
	var execute = require(path); // 加载执行文件
	var getJson = req.query; // get参数
	var postJson = req.body; // post参数
	var opt = {
		getJson: getJson,
		postJson: postJson
	};
	var entry = req.query.action || ''; // 入口名称
	
	loadMod(router.APP_PATH, exeMod);
	
	Object.assign(execute, exeMod);
	execute.parse(entry, opt, function(result) { // 解析
		res.json(result); // 返回数据
	});
});

function handleUrl(params) {
	var arr = [];
	for (var i = 0; i < urlPathArr.length; i++) {
		arr.push(params[urlPathArr[i]]);
	}
	var path = router.APP_PATH + '/api';
	for (var j = 0; j < arr.length; j++) {
		if (!arr[j]) {
			continue;
		}
		path += '/' + arr[j];
	}
	return path;
}

function loadMod(APP_PATH, exeMod){
	exeMod.db = require(router.APP_PATH + '/mysqlify'); // 添加db模块
	exeMod.utilSteper = require(router.APP_PATH + '/utilify').utilSteper; // 添加step模块
	exeMod.readConfig = function(config_path, next){
		var config_json =  require(router.APP_PATH + '/config/data/' + config_path + '.json');
		next(config_json);
	};
	exeMod.import = function(mod) { // 添加import功能
		var model = require(router.APP_PATH + '/models/' + mod);
		Object.assign(model, exeMod);
		// model.import = exeMod.import;
		// model.db = require(router.APP_PATH + '/mysqlify');
		return model;
	};
}

exports = module.exports = router;