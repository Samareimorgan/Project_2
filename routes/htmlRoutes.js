// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads home.html
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  // profile route loads profile.html
  app.get("/profile", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/profile.html"));
  });
  // profile route loads profile.html
  app.get("/cart", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/cart.html"));
  });
};
