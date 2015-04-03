var setup = require('setup-server');

var options = {
    dbProtocol: '',
    dbBaseUrl: 'localhost',
    dbPort: 27017,
    dbUrlPath: '',
    dbName: 'helloworld-dev',

};
var app = setup(options);

module.exports = app;

//
//
//
//var express = require('express');
//var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');
//
//// Db
//var mongo = require('mongodb');
//var monk = require('monk');
//var db = monk('localhost:27017/helloworld-dev');
//var Databases = require('./data-access-layer/databases');
//
//var routes = require('./routes/index');
//var users = require('./routes/users');
//
//var app = express();
//
//// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
//
//// uncomment after placing your favicon in /public
////app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
//
////Make our db accessible to our router
//app.use(function(req, res, next) {
//    req.db = db;
//    req.databases = Databases(db);
//    next();
//});
//
//// Additional functionality for request object
//app.use(function(req, res, next) {
//    req.getRoot = function() {
//        return req.protocol + "://" + req.get('host');
//    }
//    req.getRestUrl = function() {
//        return req.baseUrl + req.url;
//    }
//    return next();
//});
//
//app.use('/', routes);
//app.use('/user', users);
//
//// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});
//
//// error handlers
//
//// development error handler
//// will print stacktrace
//app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//        message: err.message,
//        error: err
//    });
//});
//
//
//module.exports = app;
