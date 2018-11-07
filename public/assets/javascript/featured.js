$("document").ready(function () {
    var random = ["chicken", "beef", "vegetables", "fruit"];
    var rand = random[Math.floor(Math.random() * random.length)];

    $.get("/getkey", function (key) {

        console.log(key);


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
                    } else {

                        $(".carousel-inner").append(
                            `<div class="carousel-item col-md-4 active">
                                <div class="card height: 20rem;">
                                    <img class="card-img-top img-fluid" data-img= ${recipeResult.image_url} src= ${recipeResult.image_url} alt="Card image cap" style='height: 18rem;'>
                                    <div class="card-body">
                                        <h4 class="card-title" data-title=${recipeResult.title}>${recipeResult.title}</h4>
                                        <a target='_blank' data-source=${recipeResult.source_url} href=${recipeResult.source_url} class='card-link mx-auto'>
                                             Recipe Link
                                         </a>
                                         <button type='button' data-rid=${recipeResult.recipe_id} data-img=${recipeResult.image_url} data-title=${recipeResult.title} class='btn btn-primary btn-sm mx-auto mt-2 favSave-btn'  data-source=${recipeResult.source_url} style='display: block'>
                                             Save to Favorites
                                        </button> 
                                    </div>
                                </div>
                            </div>`
                        );


                        // $(".accordion").find("button#" + num).on("click", function () {
                        //     $(".item" + num).collapse("toggle");
                        // });
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }



        // First AJAX call providing recipe id, image url, title of recipe, and source url
        $.ajax({
            url: 'https://www.food2fork.com/api/search',
            type: 'GET',
            data: {
                key: key,
                q: rand,
                count: 3
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
}); 