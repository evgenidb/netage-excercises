var setup = require('./setup-server');
var express = require('express');

var options = {
    db: {
        dbProtocol: '',
        dbBaseUrl: 'localhost',
        dbPort: 27017,
        dbUrlPath: '',
        dbName: 'helloworld-dev-test',
        globalizeDb: true,
    },
    app: express(),
};
var app = setup(options);

module.exports = app;
