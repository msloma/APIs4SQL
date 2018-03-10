var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var question = require('./routes/question');
var answer = require('./routes/answer');



var compression = require('compression');
var helmet = require('helmet');
var mysql = require('mysql');
var debug = require('debug')('development');

var app = express();

//Database connection
app.use(helmet());
app.use(compression());
app.use(function(req, res, next){
	global.connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'nodeSurvey',
		password : 'nodeSurvey',
		database : 'nodesurvey'
	});
	connection.connect();
	next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
debug('log example debug');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
//app.use('/users', users);
app.use('/api/v1/users', users);
app.use('/api/v1/question', question);
app.use('/api/v1/answer', answer);





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
