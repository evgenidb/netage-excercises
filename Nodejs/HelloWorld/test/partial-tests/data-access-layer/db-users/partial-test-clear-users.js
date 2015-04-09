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
it('can clear when users is empty (should be valid)', function(done) {
    assert.isFulfilled(
        Promise.resolve(
            users.clear()),
        'Not fullfilled')
    .should.notify(done);
})


it('can clear when users is empty and check that there are no users', function(done) {
    Q
        .fcall(users.clear())
        .then(users.all()
            .then(function (result) {
                expect(result).to.be.empty;
                done();
            }, function (reason) {
                done(reason);
            }
         )
     );
})


it('can clear when there is one user', function(done) {
    var expected = [
        {
            id: 1,
            name: 'Name',
        },
    ];

    users.add(1, 'Name')
        .error(function (err) { done(err) })
        .success(function () {
            users.all()
                .error(function (err) { done(err) })
                .success(
                    function (result) {
                        expect(result).to.containSubset(expected);

                        users.clear()
                            .error(function (err) { done(err) })
                            .success(function (result) {
                                done();
                            })
                    }
                )
        })
})


it('can clear when there is one user and check that there are no users left', function(done) {
    var expected = [
        {
            id: 1,
            name: 'Name',
        },
    ];

    users.add(1, 'Name')
        .error(function (err) { done(err) })
        .success(function () {
            users.all()
                .error(function (err) { done(err) })
                .success(function (result) {
                    expect(result).to.containSubset(expected);

                    users.clear()
                        .error(function (err) { done(err) })
                        .success(function (result) {
                            users.all()
                                .error(function (err) { done(err) })
                                .success(function (result) {
                                    expect(result).to.be.empty;
                                    done();
                                })
                        })
                })
    })
})
