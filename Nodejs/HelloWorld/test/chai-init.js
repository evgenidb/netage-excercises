var path = require('path');
var callsite = require('callsite');
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");

chai.config.includeStack = true;
chai.use(chaiAsPromised);

GLOBAL.chai = chai;
GLOBAL.sinon = require('sinon');

GLOBAL.importTest = function importTest(description, testLocation) {
    var stack = callsite();
    var requester = stack[1].getFileName();
    var callerDir = path.dirname(requester);
    
    describe(description, function () {
        require(callerDir + '/' + testLocation);
    });
};

GLOBAL.testCommonParams = {};

GLOBAL.app = require('../app-dev-test');