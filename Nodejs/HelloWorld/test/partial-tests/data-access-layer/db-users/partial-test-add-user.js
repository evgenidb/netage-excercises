var Q = require("q");
var dbExpectResult;
var dbExpectError;
var users;

var assert;

before(function () {
    assert = GLOBAL.chai.assert
    
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
it('adds a user', function(done) {
    assert.isFulfilled(
        Promise.resolve(
            users.add(1, 'Name')),
        'Not fullfilled')
    .should.notify(done);
})

it('adds two different users', function(done) {
    Q.all([
        assert
            .isFulfilled(
                Promise.resolve(
                    users.add(1, 'Name')),
            'Not fullfilled'),
        
        assert
            .isFulfilled(
                Promise.resolve(
                    users.add(2, 'New Name')),
            'Not fullfilled'),
    ]).should.notify(done);
})

it('adds three different users', function(done) {
    Q.all([
        assert
            .isFulfilled(
                Promise.resolve(
                    users.add(1, 'Name')),
            'Not fullfilled'),
        
        assert
            .isFulfilled(
                Promise.resolve(
                    users.add(2, 'New Name')),
            'Not fullfilled'),
        
        assert
            .isFulfilled(
                Promise.resolve(
                    users.add(3, 'Another Name')),
            'Not rejected'),
    ]).should.notify(done);
})

it('does not add the same user twice (consecutive)', function(done) {
    Q.all([
        assert
            .isFulfilled(
                Promise.resolve(
                    users.add(1, 'Name')),
            'Not fullfilled'),
        
        assert
            .isRejected(
                Promise.resolve(
                    users.add(1, 'Name')),
            'Not rejected'),
    ]).should.notify(done);
})

it('does not add the same user twice (non-consecutive)', function(done) {
    Q.all([
        assert
            .isFulfilled(
                Promise.resolve(
                    users.add(1, 'Name')),
            'Not fullfilled'),
        
        assert
            .isFulfilled(
                Promise.resolve(
                    users.add(2, 'New Name')),
            'Not fullfilled'),
        
        assert
            .isRejected(
                Promise.resolve(
                    users.add(1, 'Name')),
            'Not rejected'),
    ]).should.notify(done);
})

it('can add users with the same name (consecutive)', function(done) {
    Q.all([
        assert
            .isFulfilled(
                Promise.resolve(
                    users.add(1, 'Name')),
            'Not fullfilled'),
        
        assert
            .isFulfilled(
                Promise.resolve(
                    users.add(2, 'New Name')),
            'Not fullfilled'),
        
        assert
            .isFulfilled(
                Promise.resolve(
                    users.add(3, 'New Name')),
            'Not fullfilled'),
    ]).should.notify(done);
})

it('can add users with the same name (non-consecutive)', function(done) {
    Q.all([
        assert
            .isFulfilled(
                Promise.resolve(
                    users.add(1, 'Name')),
            'Not fullfilled'),
        
        assert
            .isFulfilled(
                Promise.resolve(
                    users.add(2, 'New Name')),
            'Not fullfilled'),
        
        assert
            .isFulfilled(
                Promise.resolve(
                    users.add(3, 'Name')),
            'Not fullfilled'),
    ]).should.notify(done);
})