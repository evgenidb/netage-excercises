module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            js_min: {
                files: {
                    'public/build/js/common.min.js': ['public/build/js/common.js'],
                    'public/build/js/vendors.min.js': ['public/build/js/vendors.js'],
                },
            },
        },
        concat: {
            options: {
                separator: ';',
            },
            cssVendors: {
                src: [],
                dest: 'public/build/css/vendors.css',
            },
            cssCommon: {
                src: ['public/stylesheets/common/style.css'],
                dest: 'public/build/css/common.css',
            },
            jsVendors: {
                src: [],
                dest: 'public/build/js/vendors.js',
            },
            jsCommon: {
                src: [],
                dest: 'public/build/js/common.js',
            },
        },
        watch: {
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
            }
        },
        jsonlint: {
            all: [ '**/*.json', '!**/node_modules/**' ],
            jsonApp: {
                src: [ 'package.json' ]
            },
            jsonOther: {
                src: [ '**/*.json', '!package.json', '!**/node_modules/**' ]
            }
        },
        jshint: {
            all: [ '**/*.js', '!**/node_modules/**' ],
            jsApp: [ '**/*.js', '!**/node_modules/**', '!**/public/**' ],
            jsFrontEnd: [ '**/public/javascripts/**/*.js' ],
            afterconcat: [ 'public/build/js/**/*.js' ]
        },
        csslint: {
            min: {
                options: {
                    import: false
                },
                src: ['public/build/css/**/*.css']
            },
            dev: {
                options: {
                    import: false
                },
                src: ['public/stylesheets/**/*.css']
            }
        },
        express: {
            options: {
                fallback: function() {
                    console.log('Error: Cannot start the express server.');
                },
                output: "^(?!Error).+$",
            },
            dev: {
                options: {
                    script: 'app-dev.js',
                    node_env: 'development',
                }
            },
            test: {
                options: {
                    script: 'app-dev-test.js',
                    node_env: 'test',
                }
            },
            testServer: {
                options: {
                    script: 'app-test-server.js',
                    node_env: 'production',
                    background: false,
                }
            },
            prod: {
                options: {
                    script: 'app-prod-server.js',
                    node_env: 'production',
                    background: false,
                }
            },
        },
        mochacli: {
            options: {
                require: ['chai'],
                files: 'test/*.js'
            },
            spec: {
                options: {
                    reporter: 'spec'
                }
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');

    // Default Task
    grunt.registerTask('default', [
        'jsonlint:all',
        'jshint:all',
        'express:test',
        'mochacli',
        'express:test:stop',
        'concat',
        'uglify',
        'watch',
        'express:dev',
    ]);

    // Allias Tasks
    grunt.registerTask('dev', [
        'jsonlint:all',
        'jshint:all',
        'watch',
        'express:dev',
    ]);

    grunt.registerTask('test', [
        'jsonlint:all',
        'jshint:all',
        'express:test',
        'mochacli',
        'express:test:stop',
    ]);

    grunt.registerTask('testServer', [
        'jsonlint:all',
        'jshint:all',
        'concat',
        'uglify',
        'express:testServer',
        'mochacli',
    ]);

    grunt.registerTask('prod', [
        'jsonlint:all',
        'jshint:all',
        'concat',
        'uglify',
        'express:prod',
    ]);
}
