function apiKey() {
    $.get("/getkey", function (key) {
        console.log(key);


        //THIS IS WHERE WE WILL PUT IN THE CODE TO GET THE UNIQUE USER ID and userName...SAVED GLOBALLY^
        //so we can use it throughout this js file as the userId variable...
        //you will call the create user function at the bottom of the page...if the user already exists...it won't duplicate
        var userId = 6;
        var userName = "luke";






        console.log(key);

        // AJAX call for ingredients using the recipe id provided in the first AJAX call
        function ingredientsAPI(recipeId, trueOrFalse) {
            $.ajax({
                url: 'https://www.food2fork.com/api/get',
                type: 'GET',
                data: {
                    // key: '70c8aea98fcf8a18462e897015698b5f',
                    // key: '06cd133b4e157f0b15c89a142ef9a5fe',
                    // key: '1b8bca77165417483de095aec76fb259',
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
                    console.log(results.recipe.ingredients);

                    //this is so it will only go to the database if we "favorite" it
                    if (trueOrFalse) {
                        for (var i = 0; i < results.recipe.ingredients.length; i++) {
                        }

                        results.recipe.ingredients.forEach(function (element) {
                            //this adds all ingredients to the shopping cart
                            ingredientsToCart({
                                Ingredients: element,
                                RecipeTableId: recipeId,
                                UsersTableId: userId
                            });
                        });
                    }



                    //david...this is what you had below...above is using handlebars...which ever way you want to do it

                    // retreival of recipe ingredients
                    // $(".search-res").on('click', 'a.ingredients', function() {
                    //     event.preventDefault();
<<<<<<< HEAD
                        results.recipe.ingredients.forEach(function (element) {
                            $(".search-res").append("<ul><li class='list-group-item'>" + element + "</li></ul>");
                        });                     
=======
                    // results.recipe.ingredients.forEach(function (element) {
                    //     $(".search-res").append("<ul><li class='list-group-item'>" + element + "</li></ul>");
                    // });

>>>>>>> master
                    // });
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }

        $("#search").on('click', function () {
            event.preventDefault();

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
                    count: 3
                },
                success: function (result) {
                    var results = JSON.parse(result);

                    for (var i = 0; i < results.recipes.length; i++) {
                        $(".car-1").append("<div class='card mx-auto' style='width: 18rem; height: 25rem'><img class='card-img-top' id='recipe_img'  style='height: 15rem;' data-img='" + results.recipes[i].image_url + "' src= '" + results.recipes[i].image_url + "' alt='Card image cap'><div class=card-body'><h5 class='card-title' data-title='" + results.recipes[i].title + "' data-rId='" + results.recipes[i].recipe_id + "' >" + results.recipes[i].title + "</h5><a target='_blank' data-source='" + results.recipes[i].source_url + "' href='" + results.recipes[i].source_url + "' class='card-link mx-auto'>Recipe Link</a><button type='button' data-rid='" + results.recipes[i].recipe_id + "'data-title='" + results.recipes[i].title + "'class='btn btn-primary btn-sm mx-auto mt-2 favSave-btn'  data-source='" + results.recipes[i].source_url + "'  style='display: block'>Save to Favorites</button></div>");
                        //david...this is what you had below...id think I have it in handlebars as ^ this way
                        //$(".search-res").append("<div class='card mx-auto' style='width: 18rem; height: 25rem'><img class='card-img-top' id='recipe_img'  style='height: 15rem;' data-img='" + results.recipes[i].image_url + "' src= '" + results.recipes[i].image_url + "' alt='Card image cap'><div class=card-body'><h5 class='card-title' data-title='" + results.recipes[i].title + "' data-rId='" + results.recipes[i].recipe_id + "' >" + results.recipes[i].title + "</h5><a target='_blank' data-source='" + results.recipes[i].source_url + "' href='" + results.recipes[i].source_url + "' class='card-link mx-auto'>Recipe Link</a><button type='button' class='btn btn-primary btn-sm mx-auto mt-2 fav-btn' style='display: block'>Save to Favorites</button></div>");
                        // $(".card-body").html("<h5 class='card-title' id='recipe_title' data='" + results.recipes[i].recipe_id + "'>" + results.recipes[i].title + "</h5>");
                        // console.log(results.recipes[i].source_url);
                    }

                    results.recipes.forEach(function (element) {
                        //TODO: make sure this works!
                        ingredientsAPI(element.recipe_id, false);
                    });
                },
                error: function (error) {
                    console.log(error);
                }
            });
        });

        //this is the function of when you favorite a recipe...inserts recipe to favs
        $(".car-1").on('click', 'button.favSave-btn', function () {
            var RecipeDataName = $(this).data("title");
            var RecipeDataId = $(this).data("rid");
            var RecipeDataImage = $(this).data("source");
            insertRecipe(RecipeDataName, RecipeDataId, userId, RecipeDataImage);
            //TODO: make sure this works!
            ingredientsAPI(RecipeDataId, true);
        });

        //delete on click in shoppling list html
        $(".delete-ingredient").click(function () {
            var currentIngredientId = $(this).data("id");
            deleteIngredient(currentIngredientId)
        })

        // A function for creating a user
        function enterUser(userData) {
            $.post("/api/users", userData);
            console.log("pushed user data");
        }

        // This function inserts a new recipe into our database 
        function insertRecipe(recipeDataName, recipe, userId, recipeImage) {
            console.log("insertrecipe working");
            var recipesArray = {
                recipeName: recipeDataName,
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


        //INFO FOR THE BELOW FUNCTION
        //as of right now this is passing in the username luke and id 2 variables into our database
        //it will create one if it doesn't exist or will update the existing one with respective id
        //YOU DO NOT NEED TO CHANGE ANY OF THIS BELOW...just the variables at the top need to have the info from facebook login
        enterUser({
            userName: userName,
            id: userId
        });
    });
}

apiKey();
