var express    = require('express'),
    bodyParser = require('body-parser'),
    _          = require('underscore'),   // library of common util functions
    db         = require('./db.js'),
    app        = express(),
    port       = process.env.PORT || 3000,
    todos      = [],
    todoNextId = 1;            // not secure, we'll do this better later w/db

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Todo API root');
  
});

// ================= GET -> /todos ==================
// Gets all todos
app.get('/todos', function (req, res) {
    var queryParams = req.query,     // returns an object!
        filteredTodos = todos;

    // Filter on /todos?completed=
    // if has property && .completed === 'true'
    if (queryParams.hasOwnProperty('completed')
        && queryParams.completed === 'true') {
        //  filteredTodos array = _.where(filteredTodos, filter object);
        filteredTodos = _.where(filteredTodos, {"completed" : true});
    }
  
    // else if (has Prop && .completed === false)
    else if (queryParams.hasOwnProperty('completed')
             && queryParams.completed === 'false') {
        //  filteredTodos array = _.where(filteredTodos, filter object);
        filteredTodos = _.where(filteredTodos, {"completed" : false});
    }
  
    // Filter on /todos?q=
    // if has property and length > 0
    if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
    
        // then set filteredTodos array equal to underscore's .filter method
        // which adds items to an array if the callback returns true
        filteredTodos = _.filter(filteredTodos, function (todo) {
            // returns true if the todo's description contains the q param.
            // set description and q to lowercase before checking to avoid
            // case mismatches.
            // if q exists, it's index will be zero or greater. So we compare to -1
            return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
        });
    }

    res.json(filteredTodos);
});


// ================ GET -> /todos/:id ================
// Gets a single todo based on ID
app.get('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10), // req.params returns a string; we need number
        matchedTodo = _.findWhere(todos, {id: todoId});

    if (matchedTodo) {
        res.json(matchedTodo);
    } else {
        res.status(404).send();
    }
});


// ================= POST -> /todos =================
// Adds a todo
app.post('/todos', function (req, res) {
    var body = _.pick(req.body, 'description', 'completed');
    
    // call .create on db.todo
    db.todo.create(body).then(function (todo) {
        // success
        res.json(todo.toJSON());
    }, function (err) {
        // error
        res.status(400).json(err);
    });
  

    // ===== THE OLD WAY, BEFORE WE HAD A DATABASE =====
    //  if (!_.isBoolean(body.completed ) ||             // validate inputs
    //      !_.isString(body.description) ||
    //      body.description.trim().length === 0 ) {
    //    return res.status(400).send();
    //  }
    //  
    //  body.description = body.description.trim();      // trim inputs
    //  
    //  body.id = todoNextId;                            // add id#
    //  todos.push(body);
    //
    //  todoNextId += 1;                                 // increment ID counter
    //  
    //  res.json(todos);                                 // return all todos
});


// =============== DELETE -> /todos/:id ===============
// Deletes a todo based on ID
app.delete('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: todoId});
    if (!matchedTodo) {
        res.status(404).json({"error": "No todo found with that id"});
    } else {
        // .without takes: 1 array and removes, argument, argument, etc.
        todos = _.without(todos, matchedTodo);
        // reply with all remaining todos
        res.json(todos);
    }
});



// ================ PUT -> /todos/:id ================
// Updates a todo based on ID
app.put('/todos/:id', function (req, res) {
    var body = _.pick(req.body, 'description', 'completed'),
        validAttributes = {},
        todoId = parseInt(req.params.id, 10),
        matchedTodo = _.findWhere(todos, {id: todoId});
  
    if (!matchedTodo) {
        return res.status(404).send(); // 'return' stops rest of code from running
    }
    
    // check if 'completed' property exists and is a boolean
    if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
        validAttributes.completed = body.completed;
    } else if (body.hasOwnProperty('completed')) {
        return res.status(400).send();
    }
  
    // check if 'description' exists, is a string, and length > 0
    if (body.hasOwnProperty('description') &&
        _.isString(body.description) && 
        body.description.trim().length > 0) {
        // set body.description to be trimmed value
        validAttributes.description = body.description.trim();
    } else if (body.hasOwnProperty('description')) {
        return res.status(400).send();
    }
  
    // if code gets this far, things went well and we can update the array
    // we're going to use underscore method: .extend
    // extend_.extend(destination, *sources)
    matchedTodo = _.extend(matchedTodo, validAttributes);
    res.json(todos);
  
});

// ================== START SERVER ===================
db.sequelize.sync().then(function() {
    app.listen(port, function () {
        console.log('Server listening on port ' + port);
    });
});


