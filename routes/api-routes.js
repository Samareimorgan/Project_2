// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

require('dotenv').config({path: './process.env'});

// Routes
// =============================================================
module.exports = function (app) {



  //USERS
  // GET route for getting all of the users
  app.get("/api/users", function (req, res) {
    db.UsersTable.findAll({}).then(function (dbUsers) {
      res.json(dbUsers);
    })
  });
  // POST route new user
  app.post("/api/users", function (req, res) {
    db.UsersTable.create({
      //where: {
      userName: req.body.userName
      // },
      //   text: req.body.text,
      //   complete: req.body.complete,
    }).error(function (err) {//error handling
      console.log(err);
    }).then(function (dbTodo) {
      res.json(dbTodo);
    });
  });


  //RECIPES
  // GET route for getting all of the recipes

  
  // GET route for API key
  app.get('/getkey', function (req, res) {
    res.send(process.env.KEY);
  })

  // GET route for getting all of the todos

  app.get("/api/recipes", function (req, res) {
    db.RecipeTable.findAll({}).then(function (dbRecipes) {
      res.json(dbRecipes);
    })
  });
  // POST route for saving a new recipe
  app.post("/api/recipes", function (req, res) {
    console.log(req.body);
    db.RecipeTable.create({

      // where: {
      UsersTableId: req.body.UsersTableId,
      //   },
      recipeName: req.body.recipeName
    }).error(function (err) {//error handling
      console.log(err);
    }).then(function (dbTodo) {
      res.json(dbTodo);
    });
  });


  //CART
  // GET route for getting all of the content for the cart
  app.get("/api/cart", function (req, res) {
    db.CartTable.findAll({}).then(function (dbUsers) {
      res.json(dbUsers);
    })
  });
  // POST route new item to cart
  app.post("/api/cart", function (req, res) {
    db.CartTable.create({
    
      //where: {
      RecipeTableId: req.body.RecipeTableId,
      Ingredients: req.body.Ingredients

      // },
      //   text: req.body.text,
      //   complete: req.body.complete,
    }).error(function (err) {//error handling
      console.log(err);
    }).then(function (dbTodo) {
      res.json(dbTodo);
    });
  });

};

