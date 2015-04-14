module.exports = function watch(grunt, options) {
    return {
        cssVendors: {
            files: ['public/stylesheets/vendor/**/*.css'],
            tasks: ['concat:cssVendors'],
        },
        cssCommon: {
            files: ['public/stylesheets/common/**/*.css'],
            tasks: ['concat:cssCommon'],
        },
        jsVendors: {
            files: ['public/javascripts/vendor/**/*.js'],
            tasks: ['concat:jsVendors'],
        },
        jsCommon: {
            files: ['public/javascripts/common/**/*.js'],
            tasks: ['concat:jsCommon'],
        },
        jsApp: {
            files: ['**/*.js', '!**/node_modules/**'],
            tasks: ['jshint:jsApp']
        },
        jsonApp: {
            files: ['package.json'],
            tasks: ['jsonlint:jsonApp']
        },
        jsonOther: {
            files: ['**/*.json', '!package.json', '!**/node_modules/**'],
            tasks: ['jsonlint:jsonOther']
        },
        configFiles: {
            files: [ 'Gruntfile.js' ],
            options: {
                reload: true
            }
        },
    };
};
