/*
 * /db.js
 *
 * Purpose: 
 *   server.js will request the database from db.js,
 *   return that database connection to server.js
 *
*/

var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/data/dev-todo-api.sqlite'
});

// ==== create empty object to receive model
var db = {};

// .import method lets us load in sequalize models from separate files
db.todo = sequelize.import(__dirname + '/models/todo.js');
db.sequelize = sequelize;            // add our sequelize instance to the object
db.Sequelize = Sequelize;            // add Sequelize library to the object

module.exports = db;                 // export the whole object