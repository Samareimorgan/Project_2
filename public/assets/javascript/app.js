function apiKey() {
    $.get("/getkey", function (key) {
        console.log(key);


        var userId = 6;
        var userName = "Luke";


        console.log(key);


        // AJAX call for ingredients using the recipe id provided in the first AJAX call
        function ingredientsAPI(recipeId, trueOrFalse, recipeResult, num) {
            $.ajax({
                url: 'https://www.food2fork.com/api/get',
                type: 'GET',
                data: {
                    // key: '70c8aea98fcf8a18462e897015698b5f',
                    // key: '06cd133b4e157f0b15c89a142ef9a5fe',
                     //key: '1b8bca77165417483de095aec76fb259',
                    // key: '6672f623c4ac7e28e35b289c7e8fa482',
                    // key: '8bdcdc6eba2846f08cb9b0ee80489bd2',
                    // key: 'cf135f3bf6d990d16c115104b44488e1',
                    // key: 'ee76dd0ee8f48fb5c521a7d48696b8ac',
                    // key: 'de652b66a0ed9e5c4aefcee2e3f791fd',
                    // key: '2435834079930c5216d0e6fe69dc6dd8',
                    // key: '6bebabc39fbf44828bad81f4395acae9',
                    // key: '6ed7500f281e17d62e8f1dfb424b473c',
                    key: key,
                    rId: recipeId,
                },
                success: function (result) {
                    var results = JSON.parse(result);
                    // retreival of recipe ingredients as array
                    // console.log("RESULTS: ", results);
                    console.log(results.recipe.ingredients);

                    //this is so it will only go to the database if we "favorite" it
                    if (trueOrFalse) {
                        for (var i = 0; i < results.recipe.ingredients.length; i++) {}

                        // console.log(results.recipe.title);

                        results.recipe.ingredients.forEach(function (element) {
                            //this adds all ingredients to the shopping cart
                            ingredientsToCart({
                                Ingredients: element,
                                RecipeTableId: recipeId,
                            });
                        });
                    } 
                    else {

                        let testHTML = "";
                        for (let i = 0; i < results.recipe.ingredients.length; i++) {
                            testHTML += `<li>${results.recipe.ingredients[i]}</li>`;
                        }

                        // console.log("recipe result:", recipeResult);

                        $(".accordion").append(`
                            <div class='card'>
                                <div class='card-header' id=${num}> 
                                    <h5 class='mb-0'> 
                                        <button class='btn btn-link collapsed' id=${num} type='button' data-toggle='collapse' data-target='#${recipeResult.recipe_id} aria-expanded='true' aria-controls='${recipeResult.recipe_id}'>
                                            ${recipeResult.title}
                                        </button>
                                    </h5>
                                </div>
                                <div class='collapse item${num}' id=${recipeResult.recipe_id} aria-labelledby=${num} data-parent='#accordionExample'> 
                                    <img data-img=${recipeResult.image_url} src=${recipeResult.image_url} class='rounded mx-auto mt-2 d-block' alt='recipe_img' style='height: 10rem; width: 10rem'> 
                                    <div class='card-body'> 
                                        <a target='_blank' data-source=${recipeResult.source_url} href=${recipeResult.source_url} class='card-link mx-auto'>
                                            Recipe Link
                                        </a> 
                                        <h6>Ingredients:</h6>
                                        <ul id=${num}>${testHTML}</ul> 
                                        <button type='button' data-rid=${recipeResult.recipe_id} data-img=${recipeResult.image_url} data-title=${recipeResult.title} class='btn btn-primary btn-sm mx-auto mt-2 favSave-btn'  data-source=${recipeResult.source_url} style='display: block'>
                                            Save to Favorites
                                        </button> 
                                    </div>
                                </div>
                            </div>
                        `);

                    
                        $(".accordion").find("button#" + num).on("click", function () {
                            $(".item" + num).collapse("toggle");
                        });
                    }  
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }

        $(document).on('click', '#search', function () {
            event.preventDefault();

            $(".accordion").empty();

            // retrieval of input from user and formatted for API url
            var food = $("#inlineFormInputName2").val().trim().replace(/\s/g, ',');

            // input of user's search query into div below search bar
            $("#search_term").text($("#inlineFormInputName2").val().trim());

            // First AJAX call providing recipe id, image url, title of recipe, and source url
            $.ajax({
                url: 'https://www.food2fork.com/api/search',
                type: 'GET',
                data: {
                    key: key,
                    q: food,
                    count: 5
                },
                success: function (result) {
                    var results = JSON.parse(result);

                    // console.log(results.recipes);

                    results.recipes.forEach(function (element, i) {
                        // console.log(results.recipes[i].title);
                        ingredientsAPI(element.recipe_id, false, results.recipes[i], i);
                    });
                },
                error: function (error) {
                    console.log(error);
                }
            });
        });



        //this is the function of when you favorite a recipe...inserts recipe to favs
        $(document).on('click', 'button.favSave-btn', function () {
            var RecipeDataName = $(this).data("title");
            var RecipeDataId = $(this).data("rid");
            var RecipeDataSource = $(this).data("source");
            var RecipeDataImage = $(this).data("img");
            insertRecipe(RecipeDataName, RecipeDataId, userId, RecipeDataSource, RecipeDataImage);


            $(this).replaceWith("<p style='color: red'>Added to Favorites!</p><p style='color: red'>Ingredients added to shopping list</p>");
            ingredientsAPI(RecipeDataId, true);
        });



        //delete on click in shoppling list html
        $(".delete-ingredient").click(function () {
            var currentIngredientId = $(this).data("id");
            deleteIngredient(currentIngredientId)
        })

        //delete on click in shoppling list html
        $(".delete-recipe").click(function () {
            var currentRecipeId = $(this).data("id");
            deleteRecipe(currentRecipeId)
        })

        // A function for creating a user
        function enterUser(userData) {
            $.post("/api/users", userData);
            console.log("pushed user data");
        }

        // This function inserts a new recipe into our database 
        function insertRecipe(recipeDataName, recipe, userId, recipeSource, recipeImage) {
            console.log("insertrecipe working");
            var recipesArray = {
                recipeName: recipeDataName,
                recipeSource: recipeSource,
                recipeImage: recipeImage,
                id: recipe,
                UsersTableId: userId

            };
            console.log("recipe sent to database");
            $.post("/api/recipes", recipesArray);
        }

        function ingredientsToCart(ingredientData) {
            console.log("ingredient sent to database");
            $.post("/api/cart", ingredientData);
        }

        function deleteIngredient(id) {
            $.ajax({
                method: "DELETE",
                url: "/api/cart/" + id
            }).then(
                function () {
                    console.log("ingredient deleted id: ", id);
                    // Reload the page to get the updated list
                    location.reload();
                }
            );
        }

        function deleteRecipe(id) {
            $.ajax({
                method: "DELETE",
                url: "/api/recipes/" + id
            }).then(
                function () {
                    console.log("recipe deleted id: ", id);
                    // Reload the page to get the updated list
                    location.reload();
                }
            );
        }


        //INFO FOR THE BELOW FUNCTION
        //as of right now this is passing in the username luke and id variables into our database
        //it will create one if it doesn't exist or will update the existing one with respective id
        //YOU DO NOT NEED TO CHANGE ANY OF THIS BELOW...just the variables at the top need to have the info from facebook login
        // enterUser({
        //     userName: userName,
        //     id: userId
        // });
    });
}

apiKey();