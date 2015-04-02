var express = require('express');
var router = express.Router();

/* GET users listing. */
router
    .get('/all', function(req, res, next) {
        // Callbacks
        var onError = function(err) {
            res.locals.path = req.getRestUrl();
            next(
                new Error('Failed to list all users')
            );
        };
        var onComplete = function(result) {
            res.render(
                'user-list',
                {
                    'title' : 'Users List',
                    'users' : result
                }
            );
        };

        // Handle db
        req.databases.users.all(onError, onComplete);
    });


/* Create new User */
router
    .get('/create', function(req, res, next) {
        res.render('user-create', { title: 'Create new user' });
    })
    .post('/create', function(req, res, next) {
        // Get form values. These rely on the "name" attributes
        var user_id = req.body.user_id;
        var user_name = req.body.user_name;

        // Input validation


        // Callbacks
        var onError = function(err) {
            //res.locals.path = req.baseUrl + req.url;
            res.locals.path = req.getRestUrl();
            next(
                new Error('Failed to create a new user')
            );
        };
        var onComplete = function(result) {
            res.render(
                'user-create',
                {
                    'title' : 'User Created'
                }
            );
        };

        // Handle db
        req.databases.users.add(user_id, user_name, onError, onComplete);
    });


/* Delete User */
router
    .get('/delete', function(req, res, next) {
        res.render('user-delete', { title: 'Delete user' });
    })
    .post('/delete', function(req, res, next) {
        // Get form values. These rely on the "name" attributes
        var user_id = req.body.user_id;

        // Input Validation


        // Callbacks
        var onError = function(err) {
            res.locals.path = req.getRestUrl();
            var error =
                new Error('Failed to delete user with id: '+user_id+'.');
            next(error);
        };
        var onComplete = function(result) {
            res.render(
                'user-delete',
                {
                    'title' : 'User Deleted'
                }
            );
        };

        // Handle db
        req.databases.users.delete(user_id, onError, onComplete);
    });


/* GET users listing. */
router
    .get('/clear', function(req, res, next){
        res.render('user-clear', { title: 'Delete All users'} )
    })
    .post('/clear', function(req, res, next) {
        // Callbacks
        var onError = function(err) {
            res.locals.path = req.getRestUrl();
            next(
                new Error('Failed to delete all users')
            );
        };
        var onComplete = function() {
            res.render(
                'user-list',
                {
                    'title' : 'Users Deleted',
                    'users' : []
                }
            );
        };

        // Handle db
        req.databases.users.clear(onError, onComplete);
    });

module.exports = router;
