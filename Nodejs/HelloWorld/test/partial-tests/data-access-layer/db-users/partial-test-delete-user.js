var Q = require("q");
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);

var dbExpectResult;
var dbExpectError;
var users;

var assert;
var expect;

before(function () {
    assert = GLOBAL.chai.assert
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
it('does not break when deleting on empty table', function(done) {
    assert.isFulfilled(
        Promise.resolve(
            users.delete(1)),
        'Not fulfilled')
    .should.notify(done);
})

it('does not break when deleting on empty table (calls success)', function(done) {
    Promise.resolve(
        users.delete(1)
        .success(function () {
            done()
        })
        .error(function (err) {
            done(err)
        })
    )
})

it('can delete existing user (when just one user)', function(done) {
    users.add(1, 'Name')
    .error(function(err) { done(err); })
    .success(function () {
        users.delete(1)
            .error(function(err) { done(err); })
            .success(function () { done() })
    })
})

it('can delete existing user (when just one user) and check users count', function(done) {
    users.add(1, 'Name')
    .error(function(err) { done(err); })
    .success(function () {
        users.delete(1)
            .error(function(err) { done(err); })
            .success(function () {
                users.all()
                    .error(function(err) { done(err); })
                    .success(function(result) {
                        expect(result).to.be.empty;
                        done();
                    })
            })
    })
})

it('can delete all existing users (all two of them)', function(done) {
    users.add(1, 'Name')
    .error(function(err) { done(err); })
    .success(function () {
        users.add(2, 'Another')
        .error(function(err) { done(err); })
        .success(function () {
            users.delete(1)
            .error(function(err) { done(err); })
            .success(function () {
                users.delete(2)
                .error(function(err) { done(err); })
                .success(function () { done() })
            })
        })
    })
})

it('can delete all existing users (all two of them) and check users count', function(done) {
    users.add(1, 'Name')
    .error(function(err) { done(err); })
    .success(function () {
        users.add(2, 'Another')
        .error(function(err) { done(err); })
        .success(function () {
            users.delete(1)
            .error(function(err) { done(err); })
            .success(function () {
                users.delete(2)
                .error(function(err) { done(err); })
                .success(function () {
                    users.all()
                    .error(function(err) { done(err); })
                    .success(function (result) {
                        expect(result).to.be.empty;
                        done()
                    })
                })
            })
        })
    })
})

it('can delete one existing user but not the others (one other)', function(done) {
    users.add(1, 'Name')
    .error(function(err) { done(err); })
    .success(function () {
        users.add(2, 'Another')
        .error(function(err) { done(err); })
        .success(function () {
            users.delete(1)
            .error(function(err) { done(err); })
            .success(function (result) {
                done();
            })
        })
    })
})

it('can delete one existing user but not the others (one other) and check users count', function(done) {
    var expected = [{
        id: 2,
        name: 'Another'
    }];

    users.add(1, 'Name')
    .error(function(err) { done(err); })
    .success(function () {
        users.add(2, 'Another')
        .error(function(err) { done(err); })
        .success(function () {
            users.delete(1)
            .error(function(err) { done(err); })
            .success(function () {
                users.all()
                .error(function(err) { done(err); })
                .success(function (result) {
                    expect(result).to.containSubset(expected);
                    expect(result).to.have.length(expected.length);
                    done()
                })
            })
        })
    })
})

it('can delete one existing user but not the others (one other)', function(done) {
    users.add(1, 'Name')
    .error(function(err) { done(err); })
    .success(function () {
        users.add(2, 'Another')
        .error(function(err) { done(err); })
        .success(function () {
            users.delete(1)
            .error(function(err) { done(err); })
            .success(function (result) {
                done();
            })
        })
    })
})

it('can delete one existing user but not the others (two others) and check users count', function(done) {
    var expected = [
        {
            id: 2,
            name: 'Another'
        },
        {
            id: 3,
            name: 'Yet Another'
        },
    ];

    users.add(1, 'Name')
    .error(function(err) { done(err); })
    .success(function () {
        users.add(2, 'Another')
        .error(function(err) { done(err); })
        .success(function () {
            users.add(3, 'Yet Another')
            .error(function(err) { done(err); })
            .success(function () {
                users.delete(1)
                .error(function(err) { done(err); })
                .success(function () {
                    users.all()
                    .error(function(err) { done(err); })
                    .success(function (result) {
                        expect(result).to.containSubset(expected);
                        expect(result).to.have.length(expected.length);
                        done()
                    })
                })
            })
        })
    })
})
