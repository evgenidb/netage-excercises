var UsersDb = function(db) {
    this.db = db;
    this.db_name = 'users';
    db.get(this.db_name).index('id', { unique: true });

    console.log('Called UsersDb constructor');
};

UsersDb.prototype = function() {};


/**
 * Gets all users
 * @returns {String, Array} Returns error message or list of users
 */
UsersDb.prototype.all = function all(onError, onComplete) {
    var collection = this.db.get(this.db_name);
    collection
        .find(
            {},
            {},
            function(err, records) {
                if (err) {
                    onError(err);
                } else {
                    onComplete(records);
                }
            }
        );
};


/**
 * Adds a new user
 * @param   {String} id   Id of the user
 * @param   {String} name The name of the user
 * @returns {String} A message of whether the deletion succeeded or not
 */
UsersDb.prototype.add = function add(id, name, onError, onComplete) {
    var collection = this.db.get(this.db_name);
    var result = '';
    collection
        .insert(
            {
                'id': id,
                'name': name
            },
            function(err, records) {
                if (err) {
                    onError(err);
                } else {
                    onComplete(records);
                }
            }
        );
};

/**
 * Deletes a user
 * @param   {String} id Id of the user
 * @returns {String} A message of whether the deletion succeeded or not
 */
UsersDb.prototype.delete = function(id, onError, onComplete) {
    var collection = this.db.get(this.db_name);
    collection
        .remove(
            {
                'id': id
            },
            function(err, records) {
                if (err) {
                    onError(err);
                } else {
                    onComplete(records);
                }
            }
        );
};

/**Deletes all users from the DB
 * @returns {String} Message of whether the deletion succeeded or not
 */
UsersDb.prototype.clear = function(onError, onComplete) {
    var collection = this.db.get(this.db_name);
    collection
        .remove(
            {},
            function(err, records) {
                if (err) {
                    onError(err);
                } else {
                    onComplete(records);
                }
            }
        );
};

module.exports = function (db) {
    return new UsersDb(db);
}
