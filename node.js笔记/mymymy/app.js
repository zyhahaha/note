var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

var fs = require('fs');
var logs = fs.createWriteStream('logs/logs.log', {
	flags: 'a'
});

// db
var config = require('./config');
var db = require('./mysqlify');
db.createConnection(config.db);
var restify = require('./restify');
restify.APP_PATH = __dirname;

// dbEnd

var utilify = require('./utilify');
var step = new utilify.utilSteper();
step.on('test1', function(){
	console.log('step1');
	this.next();
})
.on('test2', function(){
	console.log('step2');
	this.go('test4');
})
.on('test3', function(){
	console.log('step3');
	this.next();
})
.on('test4', function(){
	console.log('step4');
	this.next();
})
.succeed(function(rets) {
    // next(rets.table);
}).run();

// test

utilify.utilCacher.get('test', 'name', function(content){
	console.log(content);
});

// testEnd

var app = express();

// view engine setup
app.set('template', path.join(__dirname, 'template'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(logger({
	stream: logs
})); // 保存日志

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));

app.use('/index', index);
// app.use('/users', users);
app.use('/api', restify);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {

	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;