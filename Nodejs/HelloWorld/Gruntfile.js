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
            options: {
//                reporter: 'jslint',
//                reporter: 'checkstyle',
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
                output: 'Express server is ready',
                port: 3000,
            },
            dev: {
                options: {
                    //script: 'app-dev.js',
                    script: 'bin/www-dev.js',
                    node_env: 'development',

                    // Setting to `false` will effectively just run `node path/to/server.js`
                    background: false,

                    debug: true,
                }
            },
            test: {
                options: {
                    //script: 'app-dev-test.js',
                    script: 'bin/www-dev-test.js',
                    node_env: 'test',

                    // Setting to `false` will effectively just run `node path/to/server.js`
                    background: true,

                    debug: true,
                }
            },
            testServer: {
                options: {
                    //script: 'app-test-server.js',
                    script: 'bin/www-test-server.js',
                    node_env: 'production',

                    // Setting to `false` will effectively just run `node path/to/server.js`
                    background: false,

                    debug: true,
                }
            },
            prod: {
                options: {
                    //script: 'app-prod-server.js',
                    script: 'bin/www-prod-server.js',
                    node_env: 'production',

                    // Setting to `false` will effectively just run `node path/to/server.js`
                    background: false,

                    debug: false,
                }
            },
        },
        mochacli: {
            options: {
                require: ['chai', 'test/chai-init.js'],
                files: 'test/test-*.js',
                force: true,
                timeout: '5000',
            },
            spec: {
                options: {
                    ui: 'bdd',
                    reporter: 'spec'
                }
            },
        },
        parallel: {
            runLint: {
                options: {
                    stream: false,
                },
                tasks: [
                    {
                        grunt: true,
                        args: ['jsonlint:all'],
                    },
                    {
                        grunt: true,
                        args: ['csslint'],
                    },
                    {
                        grunt: true,
                        args: ['jshint:all'],
                    },
                ],
            },
            runDev: {
                options: {
                    stream: true
                },
                tasks: [
                    {
                        grunt: true,
                        args: ['express:dev'],
                    },
                    {
                        grunt: true,
                        args: ['watch'],
                    },
                ],
            },
            runDevTest: {
                options: {
                    stream: true
                },
                tasks: [
                    {
                        grunt: true,
                        args: ['express:test'],
                    },
                    {
                        grunt: true,
                        args: ['watch'],
                    },
                ],
            },
            runProd: {
                options: {
                    stream: true
                },
                tasks: [
                    {
                        grunt: true,
                        args: ['express:prod'],
                    },
                    {
                        grunt: true,
                        args: ['watch'],
                    },
                ],
            },
            runProdTest: {
                options: {
                    stream: true
                },
                tasks: [
                    {
                        grunt: true,
                        args: ['express:testServer'],
                    },
                    {
                        grunt: true,
                        args: ['watch'],
                    },
                ],
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');

    grunt.loadNpmTasks('grunt-mocha-cli');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');

    grunt.loadNpmTasks('grunt-parallel');

    // Default Task
    grunt.registerTask('default', [
        'parallel:runLint',
        'express:test',
        'mochacli',
        'express:test:stop',
        'concat',
        'uglify',
        'parallel:runLint',
        'parallel:runDev',
    ]);

    // Allias Tasks
    grunt.registerTask('dev', [
        'parallel:runLint',
        'parallel:runDev',
    ]);

    grunt.registerTask('test', [
        'parallel:runLint',
        'express:test',
        'mochacli',
        'express:test:stop',
    ]);

    grunt.registerTask('testServer', [
        'parallel:runLint',
        'concat',
        'uglify',
        'parallel:runLint',
        'express:testServer',
        'mochacli',
    ]);

    grunt.registerTask('prod', [
        'parallel:runLint',
        'concat',
        'uglify',
        'parallel:runLint',
        'express:prod',
    ]);

    grunt.registerTask('lint', [
        'parallel:runLint'
    ]);
};
