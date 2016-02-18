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

sequelize.sync({
    // force: true
}).then(function () {
    console.log('Everything is synced');
    
    // CHALLENGE
    // fetch todo item by id, then print to screen toJSON
    // else print Todo not found
    
    Todo.findById(1)
    .then(function (todo) {
        if (todo) {
            console.log(todo.toJSON());            
        } else {
            console.log('No todo found');
        }
    })
    
    //  PRIOR COURSEWORK
    //    Todo.create({                       // add an item
    //        description: 'Take out trash'
    //    }).then(function(todo) {
    //        return Todo.create({            // another item
    //            description: 'Clean office'
    //        });
    //    }).then(function () {               // do this on success
    //        // return Todo.findById(1)      // finds a single todo by ID
    //        return Todo.findAll({           // finds all todos based on criteria where object
    //            where: {                    //   and returns an array of items
    //                description: {
    //                    $like: '%Office%'    // $like is a sequelize function that lets us look for
    //                                        //   a word inside an attribute. $like isn't case sensitive.
    //                }
    //            }
    //        });
    //    }).then(function (todos) {
    //        if (todos) {
    //            todos.forEach(function (todo) {   // iterate over the returned array
    //                console.log(todo.toJSON());   // log that stuff
    //            });
    //        } else {
    //            console.log('No todo found');
    //        }
    //    }).catch(function (err) {           // do this on error
    //        console.log(err);
    //    });
});