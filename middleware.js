/*
 * middleware.js
 *
 * module.exports = a function (vs an object), because we can have other files pass in
 * configuration data.  In our case, we need to pass in the database.
 *
 * Middleware is a little different in Express. Not only does it get passed the req and res,
 * it gets a 3rd argument called next.
 *
 * Middleware runs before your regular route handler, so without next the private code will
 * never run.
*/

module.exports = function (db) {
    
    // return object defining middleware we need in our app
    return {
        // check for token, decrypt token and get user id and type
        requireAuthentication: function (req, res, next) {
            var token = req.get('Auth');        // grab token
            
            // findByToken is a custom class method we have to write
            db.user.findByToken(token).then(function (user) {
                req.user = user;
                next();
            }, function () {
                // if things go wrong, there's no reason to call next.  Stop here.
                res.status(401).send();
            });
        }
    };
    
};