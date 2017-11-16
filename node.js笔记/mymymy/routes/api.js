var express = require('express');
var router = express.Router();

router.get('/:path1?/:path2?/:path3?', function(req, res, next) {
	var arr = [req.params.path1 || '',req.params.path2 || '',req.params.path3 || ''];
	var path = '../api';
	for(var i = 0; i < arr.length; i ++){
		if(!arr[i]){
			continue;
		}
		path += '/' + arr[i];
	}
	var test = require(path);
	console.log(req.url);
	console.log('---------------');
	console.log(req.query);
	// console.log(req.params.who2);
	var result = test.test();
	res.send(result);
});
router.post('/:path1?/:path2?/:path3?', function(req, res, next) {
	var arr = [req.params.path1 || '',req.params.path2 || '',req.params.path3 || ''];
	var path = '../api';
	for(var i = 0; i < arr.length; i ++){
		if(!arr[i]){
			continue;
		}
		path += '/' + arr[i];
	}
	var test = require(path);
	console.log(req.url);
	console.log('------------------');
	console.log(req.body);
	// console.log(req.params.who2);
	var result = test.test();
	res.send(result);
});

/* GET home page. */
// router.get('/test/test.js', function(req, res, next) {
// 	var test = require('../api/test/test');
// 	var result = test.test();
// 	res.send(result);
// });
// router.get('/test/test2.js', function(req, res, next) {
// 	var test = require('../api/test/test2');
// 	var result = test.test();
// 	res.send(result);
// });

module.exports = router;
