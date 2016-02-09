var express    = require('express'),
    bodyParser = require('body-parser'),
    _          = require('underscore'),   // library of common util functions
    app        = express(),
    port       = process.env.PORT || 3000,
    todos      = [],
    todoNextId = 1;   // not secure, we'll do this better later w/db

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Todo API root');
  
});

// http request: GET -> /todos
app.get('/todos', function (req, res) {
  res.json(todos);
});


// http request: GET -> /todos/:id
app.get('/todos/:id', function (req, res) {
  var todoId = parseInt(req.params.id, 10); // because req.params returns a string and we need a number
  // underscore's 'findWhere' method takes 2 params:
  //   the array
  //   the property & value we're looking for
  var matchedTodo = _.findWhere(todos, {id: todoId});
  
  if (matchedTodo) {
    res.json(matchedTodo);
  } else {
    res.status(404).send();
  }
});


// http request: POST -> /todos
app.post('/todos', function (req, res) {
  // Underscore .pick method ignore extraneous properties passed to API
  // Takes the input and the properties you want to KEEP.
  var body = _.pick(req.body, 'description', 'completed');

  // validate input using Underscore methods.
  // Goal: fail if completed != boolean, body != string, or if
  // description has no length.  We inclde the trim() method
  // to ignore leading or trailing spaces.  So, this will fail if
  // description is a bunch of spaces or an empty string.
  if (!_.isBoolean(body.completed) ||
      !_.isString(body.description) ||
      body.description.trim().length === 0 ) {
    return res.status(400).send();
  }
  
  // set body.description to be trimmed value
  body.description = body.description.trim();
  
  body.id = todoNextId;    // adds id property to the object
  
  // push body into array
  todos.push(body);
  todoNextId += 1;
  
  // reply with all todos
  res.json(todos);
});

// DELETE /todos/:id
app.delete('/todos/:id', function (req, res) {
  var todoId = parseInt(req.params.id, 10);
  var matchedTodo = _.findWhere(todos, {id: todoId});
  if (!matchedTodo) {
    res.status(404).json({"error": "No todo found with that id"});
  } else {
    todos = _.without(todos, matchedTodo);
    // reply with all remaining todos
    res.json(todos);
  }
});


app.listen(port, function () {
  console.log('Server listening on port ' + port);
});