$(document).ready(function () {
    console.log("databas.js file working");
    

    //$(document).on("submit", "#search", insertRecipe);
    $("#search").click(function(){
        var $newRecipe = $("#formGroupExampleInput").val().trim();
        event.preventDefault();
        insertRecipe($newRecipe);
    });

    // Our initial todos array
    //var recipesArray = [];

    // Getting todos from database when page loads
    //getRecipes();

    // This function resets the todos displayed with new todos from the database
    // function initializeRows() {
    //     //   $todoContainer.empty();
    //     //   var rowsToAdd = [];
    //     //   for (var i = 0; i < todos.length; i++) {
    //     //     rowsToAdd.push(createNewRow(todos[i]));
    //     //   }
    //     //   $todoContainer.prepend(rowsToAdd);
    // }


    // This function inserts a new todo into our database and then updates the view
    function insertRecipe($newRecipe) {
        event.preventDefault();
        var recipesArray = {
            name: $newRecipe,
            complete: false
        };
        console.log($newRecipe);
        $.post("/api/recipes", recipesArray);
        //$.post("/api/recipes", recipesArray, getRecipes);
        console.log("post to db successful");
        //$newRecipe.val("");
    }


    // // This function grabs todos from the database and updates the view
    // function getRecipes() {

    //     $.get("/api/recipes", function (data) {
    //         console.log("working");
    //         console.log("recipesArray: " + recipesArray);
    //         // todos = data;
    //         // initializeRows();
    //     });
    // }

});