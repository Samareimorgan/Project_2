
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
                    key: key,
                    rId: recipe,
                },
                success: function (result) {
                    var results = JSON.parse(result);

                    // retreival of recipe ingredients
                    console.log(results.recipe.ingredients);
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
                        $(".card").append("<img class='card-img-top' id='recipe_img' src= '" + results.recipes[i].image_url + "' alt='Card image cap'>");
                        $(".card-body").append("<h5 class='card-title' id='recipe_title' data='" + results.recipes[i].recipe_id + "'>" + results.recipes[i].title + "</h5>");
                        console.log(results.recipes[i].source_url);
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