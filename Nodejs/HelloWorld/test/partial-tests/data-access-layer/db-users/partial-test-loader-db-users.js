before(function () {
//    var db = GLOBAL.testCommonParams.db;
//    /* Init Db */
//    var UsersDb = rootRequire('data-access-layer/db-users');
//    var users = UsersDb(db);
    
    //GLOBAL.testCommonParams.users = users;
    GLOBAL.testCommonParams.users = GLOBAL.testCommonParams.databases.users;
})

after(function () {
    GLOBAL.testCommonParams.users = null;
    delete GLOBAL.testCommonParams.users;
})

/* Load Tests */
importTest('#add-user', 'partial-test-add-user');
importTest('#delete-user', 'partial-test-delete-user');
importTest('#all-users', 'partial-test-all-users');
importTest('#clear-users', 'partial-test-clear-users');
