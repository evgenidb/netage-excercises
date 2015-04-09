var baseUrl = '';

before(function () {
    baseUrl = GLOBAL.testCommonParams.url;
    GLOBAL.testCommonParams.apiUrl = '/user';

    GLOBAL.testCommonParams.currentDb =
        GLOBAL.testCommonParams.databases.users;
})

after(function () {
    GLOBAL.testCommonParams.url = baseUrl;
    delete GLOBAL.testCommonParams.currentDb;

    delete GLOBAL.testCommonParams.apiUrl;
})

/* Load Tests */
importTest('/add', 'partial-test-add-user-api');
importTest('/delete', 'partial-test-delete-user-api');
importTest('/all', 'partial-test-all-users-api');
importTest('/clear', 'partial-test-clear-users-api');
