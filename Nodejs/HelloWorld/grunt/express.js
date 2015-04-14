module.exports = function express(grunt, options) {
    return {
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
    };
};
