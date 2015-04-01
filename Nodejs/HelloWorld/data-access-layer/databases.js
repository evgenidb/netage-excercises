// Load databeses files
var UsersDb = require('./db-users');

var db_users = null;

var Databases = function Databases(db) {
    db_users = db_users || UsersDb(db);

    return {
        'users': db_users
    };
};

module.exports = Databases;
