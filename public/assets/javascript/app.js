function apiKey() {
    $.get("/getkey", function (key) {

        
        var userId = 6;

        // AJAX call for ingredients using the recipe id provided in the first AJAX call
        function ingredientsAPI(recipeId, trueOrFalse, recipeResult, num) {
            $.ajax({
                url: 'https://www.food2fork.com/api/get',
                type: 'GET',
                data: {
                    key: key,
                    rId: recipeId,
                },
                success: function (result) {
                    var results = JSON.parse(result);
                    // retreival of recipe ingredients as array

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
                            <div class='card' style='background-color: oldlace;'>
                                <div class='card-header' id=${num} style='background-color: rgba(255, 255, 255, 0.4);'> 
                                    <h5 class='mb-0'> 
                                        <button class='btn btn-link collapsed' id=${num} type='button' data-toggle='collapse' data-target='#${recipeResult.recipe_id} aria-expanded='true' aria-controls='${recipeResult.recipe_id}' style='color: #2f4f4f; font-weight: bolder;'>
                                            ${recipeResult.title}
                                        </button>
                                    </h5>
                                </div>
                                <div class='collapse item${num}' id=${recipeResult.recipe_id} aria-labelledby=${num} data-parent='#accordionExample' style='background-color: transparent;'> 
                                    <img data-img=${recipeResult.image_url} src=${recipeResult.image_url} class='rounded mx-auto mt-2 d-block' alt='recipe_img' style='height: 12rem; width: 12rem'> 
                                    <div class='card-body' style='background-color: transparent;'> 
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
    });
}

apiKey();