// //Account Kit Javascript SDK for Authentication


//         //<!--HTTPS required. HTTP will give a 403 forbidden response -->
//         <script src="https://sdk.accountkit.com/en_US/sdk.js"></script>

//         //Add UI Elements for Account Kit to HTML
//             //<input placeholder="email" id="email"/>
//             //<button onclick="emailLogin();">Login via Email</button>
    


//   // initialize Account Kit with CSRF protection
//   AccountKit_OnInteractive = function(){
//     AccountKit.init(
//       {
//         appId:"{{FACEBOOK_APP_ID}}", 
//         state:"{{csrf}}", 
//         version:"{{ACCOUNT_KIT_API_VERSION}}",
//         fbAppEventsEnabled:true,
//         redirect:"{{REDIRECT_URL}}"
//       }
//     );
//   };

//   // login callback
//   function loginCallback(response) {
//     if (response.status === "PARTIALLY_AUTHENTICATED") {
//       var code = response.code;
//       var csrf = response.state;
//       // Send code to server to exchange for access token
//     }
//     else if (response.status === "NOT_AUTHENTICATED") {
//       // handle authentication failure
//     }
//     else if (response.status === "BAD_PARAMS") {
//       // handle bad parameters
//     }
//   }

//   // phone form submission handler
//   function smsLogin() {
//     var countryCode = document.getElementById("country_code").value;
//     var phoneNumber = document.getElementById("phone_number").value;
//     AccountKit.login(
//       'PHONE', 
//       {countryCode: countryCode, phoneNumber: phoneNumber}, // will use default values if not specified
//       loginCallback
//     );
//   }


//   // email form submission handler
//   function emailLogin() {
//     var emailAddress = document.getElementById("email").value;
//     AccountKit.login(
//       'EMAIL',
//       {emailAddress: emailAddress},
//       loginCallback
//     );
//   }


    


//FaceBook Javascript SDK for Authentication //


    

//Functions for Facebook 

     function statusChangeCallback(response) {
       if(response.status === "connected") {
         console.log( "logged in and authenticated");
         setElements(true);
         testAPI();
       } else {
         console.log("not authenicated");
         setElements(false);
       }
       
     }

     function checkLoginState() {
        FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        });
      }
      function setElements(isLoggedIn) {
        if(isLoggedIn) {
          document.getElementById('logout').style.display = "block";
          document.getElementById('profile').style.display ="block";
          document.getElementById ('fb-btn').style.display ="none";
        } else
          document.getElementById('logout').style.display = "none";
          document.getElementById('profile').style.display ="none";
          document.getElementById ('fb-btn').style.display ="block";
      }
      function logout() {
        FB.logout(function(response){
          setElements(false);
        })
      }

      function testAPI() {
        FB.api('/me?fields=name,email', function(response){
          if(response && !response.error){
            console.log(response);
            buildProfile();
          }
        })
      }

      function buildProfile(user) {
        let profile = `
          <h3>${user.name} </h3>
          <ul class = "list-group">
            <li class = "list-group-item">User ID: ${user.id}</li>
            <li class = "list-group-item">User Email: ${user.email}</li>
          </ul>
        `;

          document.getElementById("profile").innerHTML = profile;
      }
           
// //Facebook Login Button HTML Code
//   <fb:login-button 
//   id = "fb-btn"
//   scope="public_profile,email"
//   onlogin="checkLoginState();">
//   </fb:login-button>
// //Facebook Logout Code 
//   <li><a id="logout" href = "#" onclick="logout()">Logout</a></li>
// //Add Profile Div for InnerHTML or Use Handlebars
//    <div id="profile"></div>

// Object results from Facebook with user token
// {
//   "first_name": "Samantha",
//   "last_name": "Johnston",
//   "id": "10157106986155798",
//   "email": "samareimorgan@gmail.com",
//   "picture": {
//     "data": {
//       "height": 50,
//       "is_silhouette": false,
//       "url": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10157106986155798&height=50&width=50&ext=1543864240&hash=AeRB7ntHjsyZ-NMD",
//       "width": 50
//     }
//   }
// }

//in order to obtain infromation from the user