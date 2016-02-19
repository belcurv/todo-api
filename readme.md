#Heroku Add-Ons

Heroku makes an add-on that lets us use a Postgres database.

To use it, we will only need to change one call inside db.js:

'dialect': 'sqlite'

... becomes ...

'dialect': 'postgres'

---
First, to install Heroku's Postgres add-on, we run from terminal:

`$ heroku addons:create heroku-postgresql:hobby-dev`


It can take a while for Heroku to initialize the Postgres database, so issue the following and wait for it to return before proceeding:

`$ heroku pg:wait`

To use Postgres in our app, we need two new modules:

1. Postrgress itself:

    `$ npm install --save pg`

2. A module for serializing and deserializing JSON data in to hstore format

    `$ npm install --save pg-hstore`

** Then we need to use environment variables inside db.js**.  This way, our code automaticall uses SQLite locally ('development') and using Postgres ('production').

```:js
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development;'
var sequelize;

if (env = 'production') {     // only true if running on Heroku
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        'dialect': 'postgress'
    });
} else {
    sequelize = new Sequelize(undefined, undefined, undefined, {
        'dialect': 'sqlite',
        'storage': __dirname + '/data/dev-todo-api.sqlite'
    });
}
// more code...
```