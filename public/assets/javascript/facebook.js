//Functions for Facebook Authentication & API Calls

function statusChangeCallback(response) {
  //If User is Logged into facebook
  if(response.status === "connected") {
    var result = response.authResponse;
    var userAccess = result.accessToken;
    //Console log that the user is logged in
    console.log( "logged in and authenticated");
    console.log(result);
    console.log(userAccess);
    //Hide the Login With Facebook Button
    //+==========
    //Display the Logout button in the upper corner
  } else {
    //Else log that the user is not logged into Facebook
    console.log("not logged into Facebook");
    //Display the Login With Facebook Button
        //===============
  }

}

function facebookAPI() {
  FB.api('/me?fields=id,name,email', function(response){
    if(response && !response.error){
      console.log(response);
      var userName = response.name;
      var userId = response.id;
      var userPic = response.picture;
      var userEmail = response.email;
      console.log(userName +" " + userId +" " + userEmail +" " + userPic);
      enterUser(userId, userName);
      buildProfile(userName, userEmail, userPic);
    }
  })
}

function enterUser(userId, userName) {
  var currentURL = window.location.origin;
  $.post(currentURL + "/api/users", userId, userName);
  console.log("pushed user data");
}

function logout() {
  FB.logout(function(response){
  })
}

function facebookAPI() {
  FB.api('/me?fields=id,name,email, picture', function(response){
    if(response && !response.error){
      console.log(response);
     var userName = response.name;
     var userId = response.id;
     var userPic = response.picture.data.url;
     var userEmail = response.email;
      console.log(userName +  userId);
      enterUser({
        userName: userName,
        id: userId
      });
      buildProfile(userName, userEmail, userPic);
    }
  })
}

function enterUser(userId, userName) {
  $.post("/api/users", userId, userName)

  console.log("pushed user data");
}


function buildProfile(userName, userEmail, userPic) {
console.log("build profile should be working " + userName, +" " + userEmail + " " + userPic);

$("#profileName").html(userName);
$("#profileEmail").html(userEmail);
$("#profilePhoto").attr("src", userPic);
};


// function setElements(isLoggedIn) {
//   if(isLoggedIn) {
//     document.getElementById('logout').style.display = "block";
//     document.getElementById('profile').style.display ="block";
//     document.getElementById ('fb-btn').style.display ="none";
//   } else
//     document.getElementById('logout').style.display = "none";
//     document.getElementById('profile').style.display ="none";
//     document.getElementById ('fb-btn').style.display ="block";
// }

