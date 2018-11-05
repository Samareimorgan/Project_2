// $("document").ready(function () {

//     var random = ["chicken", "beef", "vegetables", "fruit"];
//     var rand = random[Math.floor(Math.random() * random.length)];

//     console.log(rand);

//     $.ajax({
//         url: 'https://www.food2fork.com/api/get',
//         type: 'GET',
//         data: {
//             // key: '70c8aea98fcf8a18462e897015698b5f',
//             // key: '06cd133b4e157f0b15c89a142ef9a5fe',
//             // key: '1b8bca77165417483de095aec76fb259',
//             // key: '6672f623c4ac7e28e35b289c7e8fa482',
//             // key: '8bdcdc6eba2846f08cb9b0ee80489bd2',
//             // key: 'de652b66a0ed9e5c4aefcee2e3f791fd',
//             key: 'f6f06b4a93bd95dbeba1587ce9abffd3',
//             // key: key,
//             q: rand,
//         },
//         success: function (result) {
//             var results = JSON.parse(result);

//             for (var i = 0; i < results.recipes.length; i++) {
//                 $(".search-res").append("<div class='card mx-auto' style='width: 18rem; height: 25rem'><img class='card-img-top' id='recipe_img'  style='height: 15rem;' data-img='" + results.recipes[i].image_url + "' src= '" + results.recipes[i].image_url + "' alt='Card image cap'><div class=card-body'><h5 class='card-title' data-title='" + results.recipes[i].title + "' data-rId='" + results.recipes[i].recipe_id + "' >" + results.recipes[i].title + "</h5><a target='_blank' data-source='" + results.recipes[i].source_url + "' href='" + results.recipes[i].source_url + "' class='card-link mx-auto'>Recipe Link</a><button type='button' id='fav-btn' class='btn btn-primary btn-sm mx-auto mt-2' style='display: block'>Save to Favorites</button></div>");
//                 // $(".card-body").html("<h5 class='card-title' id='recipe_title' data='" + results.recipes[i].recipe_id + "'>" + results.recipes[i].title + "</h5>");
//                 // console.log(results.recipes[i].source_url);
//             }

//             results.recipes.forEach(function (element) {
//                 ingredients(element.recipe_id);
//             });
//         },
//         error: function (error) {
//             console.log(error);
//         }
//     });

// });

function apiKey() {
    $.get("/getkey", function (key) {

        console.log(key);

        // AJAX call for ingredients using the recipe id provided in the first AJAX call
        function ingredients(recipe) {
            $.ajax({
                url: 'https://www.food2fork.com/api/get',
                type: 'GET',
                data: {
                    // key: '70c8aea98fcf8a18462e897015698b5f',
                    // key: '06cd133b4e157f0b15c89a142ef9a5fe',
                    // key: '1b8bca77165417483de095aec76fb259',
                    // key: '6672f623c4ac7e28e35b289c7e8fa482',
                    // key: '8bdcdc6eba2846f08cb9b0ee80489bd2',
                    // key: 'de652b66a0ed9e5c4aefcee2e3f791fd',
                    // key: '2435834079930c5216d0e6fe69dc6dd8',
                    // key: '6bebabc39fbf44828bad81f4395acae9',
                    // key: '6ed7500f281e17d62e8f1dfb424b473c',
                    key: key,
                    rId: recipe,
                },
                success: function (result) {
                    var results = JSON.parse(result);

                    // retreival of recipe ingredients
                    // $(".search-res").on('click', 'a.ingredients', function() {
                    //     event.preventDefault();
                        results.recipe.ingredients.forEach(function (element) {
                            $(".search-res").append("<ul><li class='list-group-item'>" + element + "</li></ul>");
                        });                     
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
                        $(".search-res").append("<div class='card mx-auto' style='width: 18rem; height: 25rem'><img class='card-img-top' id='recipe_img'  style='height: 15rem;' data-img='" + results.recipes[i].image_url + "' src= '" + results.recipes[i].image_url + "' alt='Card image cap'><div class=card-body'><h5 class='card-title' data-title='" + results.recipes[i].title + "' data-rId='" + results.recipes[i].recipe_id + "' >" + results.recipes[i].title + "</h5><a target='_blank' data-source='" + results.recipes[i].source_url + "' href='" + results.recipes[i].source_url + "' class='card-link mx-auto'>Recipe Link</a><button type='button' class='btn btn-primary btn-sm mx-auto mt-2 fav-btn' style='display: block'>Save to Favorites</button></div>");
                        // $(".card-body").html("<h5 class='card-title' id='recipe_title' data='" + results.recipes[i].recipe_id + "'>" + results.recipes[i].title + "</h5>");
                        // console.log(results.recipes[i].source_url);
                    }

                    results.recipes.forEach(function (element) {
                        ingredients(element.recipe_id);
                    });
                },
                error: function (error) {
                    console.log(error);
                }
            });


            // extract numbers from a string
            // var string = "½ cup sage pesto";
            // var numbers = string.match(/\d+/g).map(Number);
            // console.log(numbers);
        });
    });
}

apiKey();

// $(".search-res").on('click', "button.fav-btn", function() {
//     console.log("hello");
// });