var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//to handle session in node
// npm install express-session
var session = require('express-session');

var indexRouter = require('./routes/index');
var signupRouter = require('./routes/signup');
var dashboardRouter = require('./routes/dashboard');
var AddNewCategoryRouter = require('./routes/add-new-category');
var AddNewPasswordRouter = require('./routes/add-new-password');
var PasswordCategoryRouter = require('./routes/password-category');
var ViewAllPasswordRouter = require('./routes/view-all-password');
var PasswordDetailRouter = require('./routes/password-detail');
var logoutRouter = require('./routes/logout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'avinash',
  resave: false,
  saveUninitialized:true,
}));

app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/dashboard', dashboardRouter);
app.use('/add-new-password', AddNewPasswordRouter);
app.use('/add-new-category', AddNewCategoryRouter);
app.use('/password-category', PasswordCategoryRouter);
app.use('/view-all-password', ViewAllPasswordRouter);
app.use('/password-detail', PasswordDetailRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
