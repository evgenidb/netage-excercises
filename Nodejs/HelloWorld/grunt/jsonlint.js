module.exports = function jsonlint(grunt, options) {
    return {
        all: [ '**/*.json', '!**/node_modules/**' ],
        jsonApp: {
            src: [ 'package.json' ]
        },
        jsonOther: {
            src: [ '**/*.json', '!package.json', '!**/node_modules/**' ]
        },
    };
};
