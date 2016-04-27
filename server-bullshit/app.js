var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var express      = require('express');
var favico       = require('serve-favicon');
var logger       = require('morgan');
var marked       = require('marked');
var nunjucks     = require('nunjucks')
var path         = require('path');

var routes = require('./routes/index');
var letters = require('./routes/letters');

var app = express();

// view engine setup
var nunjucksEnv = nunjucks.configure('views', {
  autoescape: true,
  express: app
});

// nunjucksEnv.addFilter('meh', value => {
//   return marked(value);
// });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/letters', letters);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    nunjucks.render('error.html', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  nunjucks.render('error.html', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
