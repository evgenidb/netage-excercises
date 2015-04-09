var method = '';
var request = null;
var currentDb = null;

before(function () {
    request = GLOBAL.testCommonParams.request;
    method = GLOBAL.testCommonParams.apiUrl + '/create';
    currentDb = GLOBAL.testCommonParams.currentDb;
})

beforeEach(function () {
    GLOBAL.testCommonParams.clearDb(currentDb)
})

after(function () {
    GLOBAL.testCommonParams.clearDb(currentDb)
})

var sendRequest = function sendRequest(done, method, body, expectedStatus) {
    request
        .post(method)
        .send(body)
        .expect(expectedStatus, done);
};

var dummyDone = function dummyDone(err) {
    if (err) {
        throw err;
    }
}

/* Tests */
it('adds a user with numeric id', function(done) {
    var newUser = {
        user_id: 1,
        user_name: "Test"
    }

    sendRequest(done, method, newUser, 200);
})

it('adds a user with string id (still a number)', function(done) {
    var newUser = {
        user_id: "1",
        user_name: "Test"
    }

    sendRequest(done, method, newUser, 200);
})


it('adds a user with string id (not a number)', function(done) {
    var newUser = {
        user_id: "foo",
        user_name: "Test"
    }

    sendRequest(done, method, newUser, 200);
})


it('cannot add a user without id', function(done) {
    var newUser = {
        user_name: "Test"
    }

    sendRequest(done, method, newUser, 400);
})


it('cannot add a user with empty id', function(done) {
    var newUser = {
        user_id: "",
        user_name: "Test"
    }

    sendRequest(done, method, newUser, 400);
})


it('cannot add a user without name', function(done) {
    var newUser = {
        user_id: 1,
    }

   sendRequest(done, method, newUser, 400);
})


it('cannot add a user with empty name', function(done) {
    var newUser = {
        user_id: 1,
        user_name: ""
    }

    sendRequest(done, method, newUser, 400);
})

it('cannot add the same user twice', function(done) {
    var newUser = {
        user_id: 1,
        user_name: "Test"
    }

    sendRequest(dummyDone, method, newUser, 200);
    sendRequest(done, method, newUser, 400);
})
