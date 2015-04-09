var Q = require("q");
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);

var dbExpectResult;
var dbExpectError;
var users;

var assert;
var expect;

before(function () {
    assert = GLOBAL.chai.assert;
    expect = GLOBAL.chai.expect;

    dbExpectResult = GLOBAL.testCommonParams.dbExpectResult;
    dbExpectError = GLOBAL.testCommonParams.dbExpectError;

    users = GLOBAL.testCommonParams.users;
})

beforeEach(function () {
    GLOBAL.testCommonParams.clearDb(users)
})

after(function () {
    GLOBAL.testCommonParams.clearDb(users)
})

/* Tests */
it('no users', function(done) {
    var expected = [];

    assert.becomes(users.all(), expected, "have users when it shouldn't")
        .should.notify(done);
})


it('have one user', function(done) {
    var expected = [
        {
            id: 1,
            name: 'Name'
        }
    ];

    Q
        .fcall(users.add(1, 'Name'))
        .then(users.all()
            .then(function (result) {
                expect(result).to.containSubset(expected);
                done();
            }, function (reason) {
                done(reason);
            }));
})


it('have two users', function(done) {
    var expected = [
        {
            id: 1,
            name: 'Name',
        },
        {
            id: 2,
            name: 'Another Name',
        },
    ];

    Q
        .fcall(users.add(1, 'Name'))
        .then(users.add(2, 'Another Name'))
        .then(users.all()
            .then(function (result) {
                expect(result).to.containSubset(expected);
                done();
            }, function (reason) {
                done(reason);
            }));
})


it('have two users with same name', function(done) {
    var expected = [
        {
            id: 1,
            name: 'Name',
        },
        {
            id: 2,
            name: 'Name',
        },
    ];

    Q
        .fcall(users.add(1, 'Name'))
        .then(users.add(2, 'Name'))
        .then(users.all()
            .then(function (result) {
                expect(result).to.containSubset(expected);
                done();
            }, function (reason) {
                done(reason);
            }));
})
