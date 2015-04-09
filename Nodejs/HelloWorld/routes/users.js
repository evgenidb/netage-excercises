var express = require('express');
var router = express.Router();

var errorResponse = function errorResponse(req, res, next, dbErr, errorMessage, status) {
    status = status || 400;
    errorMessage = errorMessage || dbErr.message;

    res.locals.path = req.getRestUrl();
    res.sendStatus(status);
    next(
        new Error(errorMessage)
    );
};

/* GET users listing. */
router
    .get('/all', function(req, res, next) {
        // Handle db
        var promise = req.databases.users.all();

        // Handle result
        promise
            .success(function(result) {
                res.render(
                    'user-list',
                    {
                        'title' : 'Users List',
                        'users' : result
                    }
                );
            })
            .error(function(err) {
                var errorMessage = 'Failed to list all users';
                errorResponse(req, res, next, err, errorMessage, 400);
            });
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
        var errorMessage = '';
        if (user_id === undefined || user_id === '') {
            errorMessage = 'Failed to create a new user. Invalid user id in the request.';
            errorResponse(req, res, next, null, errorMessage, 400);
            return;
        } else if (user_name === undefined || user_name === '') {
            errorMessage = 'Failed to create a new user. Invalid user name in the request.';
            errorResponse(req, res, next, null, errorMessage, 400);
            return;
        }


        // Handle db
        var promise = req.databases.users.add(user_id, user_name);

        // Handle result
        promise
            .success(function(result) {
                res.render(
                    'user-create',
                    {
                        'title' : 'User Created'
                    }
                );
            })
            .error(function(err) {
                var errorMessage = 'Failed to create a new user';
                errorResponse(req, res, next, err, errorMessage, 400);
//                res.locals.path = req.getRestUrl();
//                next(
//                    new Error('Failed to create a new user')
//                );
            });
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
        if (user_id === undefined || user_id === '') {
            var errorMessage = 'Failed to create a new user. Invalid user id in the request.';
            errorResponse(req, res, next, null, errorMessage, 400);
            return;
        }

        // Handle db
        var promise = req.databases.users.delete(user_id);

        // Handle result
        promise
            .success(function(result) {
                res.render(
                    'user-delete',
                    {
                        'title' : 'User Deleted'
                    }
                );
            })
            .error(function(err) {
                var errorMessage = 'Failed to delete user with id: '+user_id+'.';
                errorResponse(req, res, next, err, errorMessage, 400);
//                res.locals.path = req.getRestUrl();
//                var error =
//                    new Error('Failed to delete user with id: '+user_id+'.');
//                next(error);
            });
    });


/* GET users listing. */
router
    .get('/clear', function(req, res, next){
        res.render('user-clear', { title: 'Delete All users'} );
    })
    .post('/clear', function(req, res, next) {
        // Handle db
        var promise = req.databases.users.clear();

        // Handle result
        promise
            .success(function(result) {
                res.render(
                    'user-list',
                    {
                        'title' : 'Users Deleted',
                        'users' : []
                    }
                );
            })
            .error(function(err) {
                var errorMessage = 'Failed to delete all users';
                errorResponse(req, res, next, err, errorMessage, 400);
//                res.locals.path = req.getRestUrl();
//                next(
//                    new Error('Failed to delete all users')
//                );
            });
    });

module.exports = router;
