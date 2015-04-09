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
UsersDb.prototype.all = function all() {
    var collection = this.db.get(this.db_name);
    var promise = collection
        .find(
            {},
            {sort: {id: 1}}
        );

    return promise;
};


/**
 * Adds a new user
 * @param   {String} id   Id of the user
 * @param   {String} name The name of the user
 * @returns {String} A message of whether the deletion succeeded or not
 */
UsersDb.prototype.add = function add(id, name) {
    id = parseInt(id, 10);

    var collection = this.db.get(this.db_name);
    var result = '';
    var promise = collection
        .insert(
            {
                'id': id,
                'name': name
            });

    return promise;
};

/**
 * Deletes a user
 * @param   {String} id Id of the user
 * @returns {String} A message of whether the deletion succeeded or not
 */
UsersDb.prototype.delete = function(id) {
    id = parseInt(id, 10);

    var collection = this.db.get(this.db_name);
    var promise = collection
        .remove(
            {
                'id': id
            }
        );

    return promise;
};

/**Deletes all users from the DB
 * @returns {String} Message of whether the deletion succeeded or not
 */
UsersDb.prototype.clear = function() {
    var collection = this.db.get(this.db_name);
    var promise = collection
        .remove(
            {}
        );

    return promise;
};

module.exports = function (db) {
    return new UsersDb(db);
};
