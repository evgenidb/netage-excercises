var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/hello', function(req, res, next) {
    res.render('hello', { title: 'Hello, World!' });
});

module.exports = router;
