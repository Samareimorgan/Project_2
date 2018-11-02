
function apiKey() {
    $.get("/getkey", function (key) {

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
            var food = $("#formGroupExampleInput").val().trim().replace(/\s/g, ',');

            // input of user's search query into div below search bar
            $(".card-body").text($("#formGroupExampleInput").val().trim());

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

                    for (var i = 0; i < results.recipes.length; i++) {
                        console.log(results.recipes[i].image_url);
                        console.log(results.recipes[i].title);
                        console.log(results.recipes[i].recipe_id);
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
