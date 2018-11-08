// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

require('dotenv').config({
  path: './process.env'
});

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for API key
  app.get('/getkey', function (req, res) {
    res.send(process.env.KEY);
  });



  //USERS
  // GET route for getting all of the users
  app.get("/api/users", function (req, res) {
    db.UsersTable.findAll({}).then(function (dbUsers) {
      res.json(dbUsers);
    })
  });
  // POST route new user
  app.post("/api/users", function (req, res) {
    console.log(req.body)
    db.UsersTable.findOrCreate({
      where: {
        id: req.body.id,
        userName: req.body.userName
      },
    }).error(function (err) { //error handling
      console.log(err);
    }).then(function (dbTodo) {
      res.json(dbTodo);
    });
  });





  //RECIPES
  // GET route for getting all of the recipes
  app.get("/api/recipes", function (req, res) {
    db.RecipeTable.findAll({
      where: {
        'UsersTableId': 6
      },
      include: [{
        model: db.UsersTable,
        required: true
      }]
    }).then(function (dbRecipes) {
      res.json(dbRecipes);
    })
  });
  // POST route for saving a new recipe
  app.post("/api/recipes", function (req, res) {
    console.log(req.body);
    db.RecipeTable.findOrCreate({
      where: {
        id: req.body.id,
        recipeName: req.body.recipeName,
        recipeImage: req.body.recipeImage,
        recipeSource: req.body.recipeSource,
        UsersTableId: req.body.UsersTableId
      },
    }).error(function (err) { //error handling
      console.log(err);
    }).then(function (dbTodo) {
      res.json(dbTodo);
    });
  });

  // DELETE route for deleting ingredients
  app.delete("/api/recipes/:id", function (req, res) {
    db.RecipeTable.destroy({
      where: {
        id: req.params.id
      },
      include: [{
        model: db.CartTable,
        where: {RecipeTableId: req.params.id},
        required: true
      }]
    }).then(function (db) {
      res.json(db);
    });
  });






  //CART
  // GET route for getting all of the content for the cart
  app.get("/api/cart", function (req, res) {
    db.CartTable.findAll({
      where: {
        'UsersTableId': 7
      },
      include: [{
        model: db.UsersTable,
        required: true
      }]
    }).then(function (dbUsers) {
      res.json(dbUsers);
    })
  });
  // POST route new item to cart
  app.post("/api/cart", function (req, res) {
    console.log(req.body)
    db.CartTable.create({
      RecipeTableId: req.body.RecipeTableId,
      Ingredients: req.body.Ingredients
    }).error(function (err) { //error handling
      console.log(err);
    }).then(function (dbTodo) {
      res.json(dbTodo);
    });
  });
  // DELETE route for deleting ingredients
  app.delete("/api/cart/:id", function (req, res) {
    db.CartTable.destroy({
      where: {
        id: req.params.id
      },
    }).then(function (db) {
      res.json(db);
    });
  });
};