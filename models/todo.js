/*
 * /models/todo.js
 *
 * Our database model, used by db.js.
 * The sequelize.import method inside db.js expects the specific format below:
 * a function taking 2 arguments: the sequelize instance ('sequelize') and data types
*/

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('todo', {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 250]
            }
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });  
};