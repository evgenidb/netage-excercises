module.exports = {
    'default': [
        'concurrent:runLint',
        'express:test',
        'mochacli',
        'express:test:stop',
        'concat',
        'uglify',
        'concurrent:runLint',
        'concurrent:runDev',
    ],
    'dev': [
        'concurrent:runLint',
        'concurrent:runDev',
    ],
    'test': [
        'concurrent:runLint',
        'express:test',
        'mochacli',
        'express:test:stop',
    ],
    'testServer': [
        'concurrent:runLint',
        'concat',
        'uglify',
        'concurrent:runLint',
        'express:testServer',
        'mochacli',
    ],
    'prod': [
        'concurrent:runLint',
        'concat',
        'uglify',
        'concurrent:runLint',
        'express:prod',
    ],
    'lint': [
        'concurrent:runLint',
    ],
};


//module.exports = {
//    'default': {
//        description: 'Default grunt',
//        'tasks': [
//            'parallel:runLint',
//            'express:test',
//            'mochacli',
//            'express:test:stop',
//            'concat',
//            'uglify',
//            'parallel:runLint',
//            'parallel:runDev',
//        ]
//    },
//    'dev': {
//        description: 'Dev enviroment (localhost)',
//        tasks: [
//            'parallel:runLint',
//            'parallel:runDev',
//        ]
//    },
//    'test': {
//        description: 'Runs Tests on dev (localhost)',
//        tasks: [
//            'parallel:runLint',
//            'express:test',
//            'mochacli',
//            'express:test:stop',
//        ]
//    },
//    'testServer': {
//        description: 'Test server enviroment',
//        tasks: [
//            'parallel:runLint',
//            'concat',
//            'uglify',
//            'parallel:runLint',
//            'express:testServer',
//            'mochacli',
//        ]
//    },
//    'prod': {
//        description: 'Production (live site)',
//        tasks: [
//            'parallel:runLint',
//            'concat',
//            'uglify',
//            'parallel:runLint',
//            'express:prod',
//        ]
//    },
//    'lint': {
//        description: 'Lint files (json, css, js, etc)',
//        tasks: [
//            'parallel:runLint',
//        ]
//    },
//};
