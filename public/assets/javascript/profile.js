
// Log-In and Log Out toggle link
($("#test")).click(function() {
    var logIn = $("#test");
    if (logIn.attr('clicked') === "true") {
        console.log('its true');
        logIn.attr('clicked', "false")
        logIn.html("<a class='nav-link login' href='#' id='test'>Log In</a>");
   
    } else {
        console.log('its false')
        logIn.attr('clicked', "true");
        logIn.html("<a class='nav-link logOut' href='#' id='test'>Log Out</a>");
    }
});


//Profile page code, still testing//
var newPhoto = [];
var name = "";
var profileEmail = "";
var profileText = $("#profileText");


$("#save").on("click", function () {
   // $("#profilePhoto").html("<img src=" + newPhoto + "id='profilePhoto'>")
   $("#profileName").text($("#username").val());
   $("#profileEmail").text($("#emailAddress").val());
   $("#pText").text($("#profileText").val());

   
});

//function (getprofilepic) {
   //get the id name of the chosen icon
   //display the pic on the left-hand-panel
//      }

// $("#profileImage").click(function(e) {
//     $("#imageUpload").click();
// });





//Sample Modal JS Code, just a template //
    // console.log("Creating Profile as one was not found");
    //             //grab info from modal input boxes
    //             userName = $("#userName").val().trim;
    //             password = $("#password").val().trim;
    //             language = $("#language").val().trim;
    //             email = $("#emailAddress").val().trim;

     //$("#SignUpButton").on("click", function (e) {
//     e.preventDefault();

//     console.log("Creating Profile as one was not found");
//     //grab info from modal input boxes
//     var username = $("#username").val();
//     var password = $("#password").val();
//     var email = $("#emailAddress").val();
//     var location = $("#selectLocation").val();

//     //set info to database
//     // post new user info to firebase
//     var newUser = {
//         username: username,
//         password: password,
//         location: selectLocation,
//         email: email
//     };

//     //push new user to database
//     database.ref("/username-" + username).push(newUser);

//     console.log("added new user to database");
//     //alert that user has been added - another modal?

//     $("#username").val("");
//     $("#password").val("");
//     $("#emailAddress").val("");
//     $("#se").val("");

// });

   