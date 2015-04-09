var setup = function(options) {
    // HANDLE OPTIONS
    // Db url

    var dbOptions = null;
    if ( 'db' in options ) {
        dbOptions = options.db;
    } else {
        throw new Error('No DB parameters are passed');
    }

    var dbProtocol = dbOptions.dbProtocol || '';

    var dbBaseUrl = dbOptions.dbBaseUrl || '';
    if (dbBaseUrl === '') {
        throw new Error('No dbBaseUrl passed');
    }

    var dbPort = dbOptions.dbPort || '';
    dbPort = parseInt(dbPort, 10);

    var dbUrlPath = dbOptions.dbUrlPath || '';

    var dbName = dbOptions.dbName || '';
    if (dbName === '') {
        throw new Error('No dbName passed');
    }

    var globalizeDb = dbOptions.globalizeDb ? dbOptions.globalizeDb : false;

    var dbUrl =
        ( dbProtocol === ''? '' : dbProtocol + '://' ) +
        dbBaseUrl +
        ( dbPort === ''? '' : ':' + dbPort ) +
        ( dbUrlPath === ''? '' : '/' + dbUrlPath ) +
        '/' + dbName;

    // END OF OPTIONS

    // BEGIN THE APP SETUP
    var express = require('express');
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');

    // Db
    var mongo = require('mongodb');
    var monk = require('monk');
    var db = monk(dbUrl);
    var Databases = require('./data-access-layer/databases');

    var routes = require('./routes/index');
    var users = require('./routes/users');

    var app = options.app || express();

    // Custom Require

    GLOBAL.rootRequire = function rootRequire(name) {
        return require(__dirname + '/' + name);
    };
    GLOBAL.publicRequire = function publicRequire(name) {
        return require(__dirname + '/public/' + name);
    };

    GLOBAL.testRequire = function testRequire(name) {
        return require(__dirname + '/test/' + name);
    };

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    //Make our db accessible to our router
    app.use(function(req, res, next) {
        req.db = db;
        req.databases = Databases(db);
        next();
    });

    if (globalizeDb) {
        GLOBAL.DATABASE_OBJECT = {
            db: db,
            databases: Databases(db),
        };
    }

    // Additional functionality for request object
    app.use(function(req, res, next) {
        req.getRoot = function() {
            return req.protocol + "://" + req.get('host');
        };
        req.getRestUrl = function() {
            return req.baseUrl + req.url;
        };
        return next();
    });

    app.use('/', routes);
    app.use('/user', users);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    console.log('Express server is ready');

    return app;
};


module.exports = function setup_server(options) {
    options = options || {};
    var app = setup(options);
    GLOBAL.appData = {
        app: app
    };
    return app;
};
