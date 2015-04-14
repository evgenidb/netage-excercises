module.exports = function csslint(grunt, options) {
    return {
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
        },
    };
};
