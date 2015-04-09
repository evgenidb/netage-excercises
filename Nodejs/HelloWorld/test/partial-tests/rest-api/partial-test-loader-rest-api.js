var app = GLOBAL.appData.app;
var request = require('supertest')(app);

before(function () {
    GLOBAL.testCommonParams.request = request;
})

after(function () {
    delete GLOBAL.testCommonParams.request;
})


var clearDb = function clearDb(collection) {
    collection.clear(
        function clearError(err) { done(err); return;},
        function clearResult(res) { done(); return;}
    );
}


/* Test Inits */
before(function () {
    var databases = GLOBAL.DATABASE_OBJECT.databases;
    GLOBAL.testCommonParams.databases = databases;

    GLOBAL.testCommonParams.clearDb = clearDb;
})

after(function () {
    delete GLOBAL.testCommonParams.databases;

    delete GLOBAL.testCommonParams.clearDb;
})

/* Load Test Cases */
importTest('/hello Api', 'hello-rest-api/partial-test-loader-hello-rest-api');
importTest('/user Api', 'user-rest-api/partial-test-loader-user-rest-api');
