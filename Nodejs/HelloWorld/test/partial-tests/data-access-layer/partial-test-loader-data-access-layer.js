/* Helper Functions */
var dbExpectError = function expectError(expectedError) {
    this.expected = expectedError;
}

dbExpectError.prototype.checkError = function checkError(err) {
    should.exist(err);
    err.should.be.exactly(this.expected);
    done()
}

dbExpectError.prototype.unwantedResult = function unwantedResult(result) {
    should.not.exist(result);
    done(new Error('Unexpected result. Should have been an error'))
}

var dbExpectResult = function expectError(expectedResult) {
    this.expected = expectedResult;
}

dbExpectResult.prototype.unwantedError = function unwantedError(err) {
    should.not.exist(err)
    done(err)
}

dbExpectResult.prototype.checkResult = function checkResult(result) {
    should.exist(result)
    result.should.be.exactly(this.expected)
    done()
}


var clearDb = function clearDb(collection) {
    collection.clear(
        function clearError(err) { done(err); return;},
        function clearResult(res) { done(); return;}
    );
}


/* Test Inits */
before(function () {
    var db = GLOBAL.DATABASE_OBJECT.db;
    GLOBAL.testCommonParams.db = db;

    var databases = GLOBAL.DATABASE_OBJECT.databases;
    GLOBAL.testCommonParams.databases = databases;

    GLOBAL.testCommonParams.dbExpectResult = dbExpectResult;
    GLOBAL.testCommonParams.dbExpectError = dbExpectError;

    GLOBAL.testCommonParams.clearDb = clearDb;
})

after(function () {
    delete GLOBAL.testCommonParams.db;

    delete GLOBAL.testCommonParams.databases;

    delete GLOBAL.testCommonParams.dbExpectResult;
    delete GLOBAL.testCommonParams.dbExpectError;

    delete GLOBAL.testCommonParams.clearDb;
})



/* Load Test Cases */
importTest('db-users', 'db-users/partial-test-loader-db-users');
importTest('databases', 'databases/partial-test-loader-databases');
