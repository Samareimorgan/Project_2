// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");
//const router = require('express').Router();

// Routes
// =============================================================
module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads home.html
  app.get("/", function (req, res) {
    //res.sendFile(path.join(__dirname, "../public/home.html"));
    res.render('home');
  });

  // profile route loads profile.html
  app.get("/profile", renderProfileList);

  // cart route loads shopping cart
  app.get("/cart", renderShoppingList);

};

//this function allows handlebars to display the database variables
function renderProfileList(req, res) {
  db.RecipeTable.findAll({}).then(function (profileInfoToHTML) {
    res.render("profile", { RecipeTable: profileInfoToHTML });
  })
};


//this function allows handlebars to display the database variables
function renderShoppingList(req, res) {
  db.CartTable.findAll({}).then(function (cartInfoToHTML) {
    res.render("shoppinglist", { CartTable: cartInfoToHTML });
  })
};



