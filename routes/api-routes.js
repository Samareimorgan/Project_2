// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the todos
  app.get("/api/recipes", function (req, res) {
    // Write code here to retrieve all of the todos from the database and res.json them
    // back to the user
    db.RecipeTable.findAll({}).then(function (dbRecipes) {
      res.json(dbRecipes);
    })
  });

  // POST route for saving a new todo. We can create todo with the data in req.body
  app.post("/api/recipes", function (req, res) {
    // Write code here to create a new todo and save it to the database
    // and then res.json back the new todo to the user
    db.RecipeTable.create({
        name: req.body.name,
        complete: req.body.complete,
    })
      .then(function (dbTodo) {
        res.json(dbTodo);
      });


  });

//   // DELETE route for deleting todos. We can get the id of the todo to be deleted from
//   // req.params.id
//   app.delete("/api/todos/:id", function (req, res) {
//     db.Todo.destroy({
//       where: {
//         id: req.params.id
//       }
//     })
//       .then(function (dbTodo) {
//         res.json(dbTodo);
//       });
//   });

//   // PUT route for updating todos. We can get the updated todo data from req.body
//   app.put("/api/todos", function (req, res) {
//     db.Todo.update({
//       text: req.body.text,
//       complete: req.body.complete
//     },
//       {
//         where: {
//           id: req.body.id
//         }
//       })
//       .then(function (dbTodo) {
//         res.json(dbTodo);
//       });
//   });
};
