var setup = require('setup-server');

var options = {
    dbProtocol: '',
    dbBaseUrl: 'localhost',
    dbPort: 27017,
    dbUrlPath: '',
    dbName: 'helloworld-dev-test',

};
var app = setup(options);

module.exports = app;
