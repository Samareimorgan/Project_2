var request = require('request');

function callback(error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        // console.log(info.hits[0].recipe);

        // console.log each result's label, ingredients, url, and image
        for (var i = 0; i < info.hits.length; i++) {
            console.log("    ");
            console.log(info.hits[i].recipe.label);
            console.log("Ingredients:");
            // for loop for the ingredients array
            info.hits[i].recipe.ingredients.forEach(function (element) {
                console.log(element.text);
            })
            console.log("recipe: " + info.hits[i].recipe.url);
            console.log("image: " + info.hits[i].recipe.image);
            console.log("    ");
        }
    }

    // extract numbers from a string
    // var string = "½ cup sage pesto";
    // var numbers = string.match(/\d+/g).map(Number);
    // console.log(numbers);
}

request.get('https://api.edamam.com/search?q=chicken&app_id=a1e98cc1&app_key=226939f9e30d961594f853a015b4a1cf', callback);


///***************************Facebook Authentication********************************** */

