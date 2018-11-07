$("document").ready(function () {
        var random = ["chicken", "beef", "vegetables", "fruit"];
       var rand = random[Math.floor(Math.random() * random.length)];
        console.log(rand);
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
               key: 'f6f06b4a93bd95dbeba1587ce9abffd3',
               // key: key,
               q: rand,
           },
           success: function (result) {
               var results = JSON.parse(result);
                for (var i = 0; i < results.recipes.length; i++) {
                   $(".search-res").append("<div class='card mx-auto' style='width: 18rem; height: 25rem'><img class='card-img-top' id='recipe_img'  style='height: 15rem;' data-img='" + results.recipes[i].image_url + "' src= '" + results.recipes[i].image_url + "' alt='Card image cap'><div class=card-body'><h5 class='card-title' data-title='" + results.recipes[i].title + "' data-rId='" + results.recipes[i].recipe_id + "' >" + results.recipes[i].title + "</h5><a target='_blank' data-source='" + results.recipes[i].source_url + "' href='" + results.recipes[i].source_url + "' class='card-link mx-auto'>Recipe Link</a><button type='button' id='fav-btn' class='btn btn-primary btn-sm mx-auto mt-2' style='display: block'>Save to Favorites</button></div>");
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
     });