var jade = require('jade');

var method = '';
var postMethod = '';
var request = null;
var currentDb = null;

var viewFilename = 'user-list';
var viewOptions = {};

before(function () {
    request = GLOBAL.testCommonParams.request;
    method = GLOBAL.testCommonParams.apiUrl + '/all';
    postMethod = GLOBAL.testCommonParams.apiUrl + '/create';
    currentDb = GLOBAL.testCommonParams.currentDb;

    expect = GLOBAL.chai.expect;
})

beforeEach(function () {
    GLOBAL.testCommonParams.clearDb(currentDb);

    viewOptions = {
        'title' : 'Users List'
    };
})

after(function () {
    GLOBAL.testCommonParams.clearDb(currentDb);
})

var sendPostRequest =
    function sendPostRequest(done, method, body, expectedStatus) {
        request
            .post(method)
            .send(body)
            .expect(expectedStatus, done);
    };

var sendGetRequest =
    function sendGetRequest(done,
                             method,
                             parameters,
                             expectedStatus,
                             expectedBody) {
        method += constructGetParameters(parameters);

        request
            .get(method)
            .expect(expectedStatus)
            .expect(expectedBody, done);
    };

var sendRequestRenderResponse =
    function sendRequestRenderResponse(done,
                                        method,
                                        expectedStatus,
                                        viewFile,
                                        viewOptions) {
        console.log(JSON.stringify(viewOptions))
        request
            .get(method)
            .expect(expectedStatus)
            .end(function (err, res) {
            if (err) {
                done(err);
            }
            var viewFilePath = 'views/' + viewFile + '.jade';
            //console.log(JSON.stringify(viewOptions));
            var html =
                jade.renderFile(viewFilePath, viewOptions);
            expect(res.text).to.equal(html);
            done();
        });
    };

var constructGetParameters =
    function constructGetParameters(parameters) {
        var constructed = '';
        if (typeof parameters !== 'object' ||
            parameters.length < 1) {

            return '';
        }

        constructed = '?';
        for (parameterName in parameters) {
            constructed +=
                parameterName + '='
            parameters[parameterName] + '&';
        }

        return constructed.slice(0, -1);
    };

var dummyDone = function dummyDone(err) {
    if (err) {
        throw err;
    }
}

/* Tests */
it('returns no users when db have no users', function(done) {
    viewOptions['users'] = [];

    sendRequestRenderResponse(
        done,
        method,
        200,
        viewFilename,
        viewOptions
    );
})

it('returns one user', function(done) {
    var newUser = {
        user_id: 1,
        user_name: "Test"
    };

    sendPostRequest(dummyDone, postMethod, newUser, 200);


    viewOptions['users'] = [
        {
            id: newUser.user_id,
            name: newUser.user_name,
        },
    ];

    sendRequestRenderResponse(
        done,
        method,
        200,
        viewFilename,
        viewOptions
    );
})


it('returns two users', function(done) {
    var newUsers = [
        {
            user_id: 1,
            user_name: "Test User"
        },
        {
            user_id: 2,
            user_name: "Another User"
        },
    ];

    var userIndex = 0;
    for (userIndex = 0; userIndex < newUsers.length; userIndex++) {
        sendPostRequest(dummyDone, postMethod, newUsers[userIndex], 200);
    }


    viewOptions['users'] = [];
    for (userIndex = 0; userIndex < newUsers.length; userIndex++) {
        var user = newUsers[userIndex];
        var expectedUser = {
            id: user.user_id,
            name: user.user_name,
        };

        viewOptions['users'].push(expectedUser);
    }

    sendRequestRenderResponse(
        done,
        method,
        200,
        viewFilename,
        viewOptions
    );
})
