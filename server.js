var express    = require('express'),
    bodyParser = require('body-parser'),
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
  var todoId = parseInt(req.params.id, 10), // because req.params returns a string and we need a number
    matchedTodo;
  
  todos.forEach(function (todo) {
    if (todoId === todo.id) {
      matchedTodo = todo;
    }
  });
  
  if (matchedTodo) {
    res.json(matchedTodo);
  } else {
    res.status(404).send();
  }
});

// http request: POST -> /todos
app.post('/todos', function (req, res) {
  // add & increment the ID
  var body = req.body;     // returns an object from postman
  body.id = todoNextId;    // adds id property to the object
  
  // push body into array
  todos.push(body);
  todoNextId += 1;
  
  // reply with all todos
  res.json(todos);
});


app.listen(port, function () {
  console.log('Server listening on port ' + port);
});