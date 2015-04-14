module.exports = function jshint(grunt, options) {
    return {
        options: {
//            reporter: 'jslint',
//            reporter: 'checkstyle',
            reporter: require('jshint-stylish'),
        },
        all: [
            'jshint:jsApp',
            'jshint:jsFrontEnd',
            'jshint:tests',
            '!**/node_modules/**',
        ],
        tests: {
            options: {
                '-W033': true,
            },
            src: ['test/**/*.js'],
        },
        jsApp: [ '**/*.js', '!node_modules/**', '!public/**', '!test/**/*.js', '!bin/**', ],
        jsFrontEnd: [ '**/public/javascripts/**/*.js' ],
        afterconcat: [ 'public/build/js/**/*.js' ]
    };
};
