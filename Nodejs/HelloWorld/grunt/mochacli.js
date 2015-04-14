module.exports = function mochacli(grunt, options) {
    return {
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
    };
};
