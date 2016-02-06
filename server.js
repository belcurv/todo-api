var express = require('express'),
    app     = express(),
    port    = process.env.PORT || 3000,
    todos   = [
      {
        id: 1,
        description: 'Learn Express 4 and Node',
        completed  : false
      },
      {
        id: 2,
        description: 'Learn AngularJS',
        completed: false
      },
      {
        id: 3,
        description: 'Learn Javascript',
        completed: true
      }
    ];

app.get('/', function(req, res) {
  res.send('Todo API root');
  
});

// http request: GET -> /todos
app.get('/todos', function(req, res) {
  res.json(todos);
});

// http request: GET -> /todos/:id
app.get('/todos/:id', function(req, res) {
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
  };
});

app.listen(port, function() {
  console.log('Server listening on port ' + port);
});