# Associations

Let's you have certain data belond to other data. Like users and todo items. We have our users table and our todos table, but how to we make a user have a todo, and a todo belong to a user.

Right now you can log in, but you can modify todos that belong to anybody.  Associations change all this.

With associates, there's basically only a few ways to do it:

One to One associations.  Ex. a user and a profile picture.

One to Many: where one user has many todo items, but a todo item belongs to only one user. We're using this.

Many to Many: think of favorites and tweets.  A tweet can be favored by many people, and a person can have many favorites.