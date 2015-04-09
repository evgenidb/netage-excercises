module.exports = function uglify(grunt, options) {
    return {
        js_min: {
            files: {
                'public/build/js/common.min.js': ['public/build/js/common.js'],
                'public/build/js/vendors.min.js': ['public/build/js/vendors.js'],
            },
        },
    };
};
