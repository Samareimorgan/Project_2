$(document).ready(function () {
    console.log("database.js file working");
    var name = "david";
    var userId = 1;
    var recipeId = 1;
    var ingredientsArray = "chicken ingredient";


    // A function for creating an user. 
    function enterUser(userData) {
        $.post("/api/users", userData);
        console.log("pushed user data");
        insertRecipe();
    }

    // This function inserts a new todo into our database and then updates the view
    function insertRecipe() {
        //event.preventDefault();
        var recipesArray = {
            recipeName: "chicken",
            UsersTableId: userId
        };
        console.log("sent to database");
        $.post("/api/recipes", recipesArray);
        console.log("post to db successful");

    }

    function ingredientsToCart(yeah) {
        //event.preventDefault();
        console.log("sent to database");
        $.post("/api/cart", yeah);
        console.log("post to db successful");

    }

    enterUser({
        userName: name
    });
    ingredientsToCart({
        Ingredients: ingredientsArray,
        RecipeTableId: recipeId
    });

});