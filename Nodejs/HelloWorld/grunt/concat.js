module.exports = function concat(grunt, options) {
    return {
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
    };
};
