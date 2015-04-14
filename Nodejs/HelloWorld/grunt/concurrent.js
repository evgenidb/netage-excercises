module.exports = {
    runLint: [
        'jsonlint:all',
        'csslint',
        'jshint:all'
    ],
    runDev: [
        'express:dev',
        'watch'
    ],
    runDevTest: [
        'express:test',
        'watch'
    ],
    runProd: [
        'express:prod',
        'watch'
    ],
    runProdTest: [
        'express:testServer',
        'watch'
    ]
};
