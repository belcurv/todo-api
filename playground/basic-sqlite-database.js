var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/basic-sqlite-database.sqlite'
});

// MODEL DEFINITION and VALIDATION
var Todo = sequelize.define('todo', {
    description: {
        type: Sequelize.STRING,
        allowNull: false,         // prevents creating todo without description
        validate: {
            len: [1, 250]         // requires legnth between 1-250
        }
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,         // prevents creating todo without completed
        defaultValue: false       // sets false if user doesn't input completed
    }
});

var User = sequelize.define('user', {
    email: {
        type: Sequelize.STRING
    }
});

// One to many association.
// We call one method on each of our models.
// These methods tell sequelize how to set up our db with foreign keys.
Todo.belongsTo(User);    // takes the model that the todo belongs to, in this case a user.
User.hasMany(Todo);      // takes the model that the user has.

sequelize.sync({
    // force: true
}).then(function () {
    console.log('Everything is synced');
    
    User.findById(1).then(function (user) {
        user.getTodos({
            where: {
                completed: false
            }
        }).then(function (todos) { // sequelize makes this method magicically!
            todos.forEach(function(todo) {
                console.log(todo.toJSON());
            });
        });
    });
    
    //    User.create({
    //        email: 'andrew@example.com'
    //    }).then(function () {
    //        return Todo.create({
    //            description: "Walk the dog"
    //        })
    //    }).then(function (todo) {
    //        User.findById(1).then(function (user) {
    //            user.addTodo(todo);      // sequelize makes this method magicically!
    //        });
    //    });

});