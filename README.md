# PlatePlanner
![alt text](https://raw.githubusercontent.com/Samareimorgan/Project_2/master/public/assets/images/blackwhitelogo.png "Plate Planner Logo")

## About
PlatePlanner is a full-stack node.js based application.  The purpose of PlatePlanner is to be able to search for recipes, save favorite recipes to the profile while also saving the ingredients from that receipe to the shopping list.  

With a responsive design built with Bootstrap, the shopping list can be retrieved from your mobile device while in the store to ensure you have all the ingredients needed for a particular recipe. 

The profile page saves the full URL link to the recipe so a user can go back to the recipe at any time as needed. 


## Install
1. Please ensure node.js is installed on your computer
2. Once node is installed, download the application onto the computer and ensure the package.json is intact.  
3.  As long as the package.json is intact, a npm i (aka npm install) on the command line should install all the appropriate modules.   Please reference the below dependency list to verify install
4. Please make sure to register for a unique API key at [Food to Fork API](https://www.food2fork.com/about/api "Food to Fork API ")
5. Add a process.env file and add Key = (Unique API goes here)
6. The application utilizes the Key for several different api calls throughout the app, so it is necessary to have for proper operation of app. 
7. Once modules are installed and API is added through the process.env file you are able to start the server (node server.js) in the command line. 
8. Please note that Food to Fork API only allows 50 API calls per day, so searching the app once or twice, will negate the use of that API Key for the remainder of the day.  


### Dependencies:  
The following modules need to be installed to utilize the program.  
1. body-parser
2. clientside-require
3. dotenv
4. express
5. express-handlebars
6. mysql2
7. npm
8. path
9. require
10. sequelize
11. sequelize-cli

##Features
The following technology/frameworks were used in the building of this app: 

1. Bootstrap 
2. SASS - Syntactically Awesome Style Sheet
3. Sequelize
4. Food to Fork API
5. Facebook Connect API
6. Handlebars

##Functionality
####Home Page & Search 
![alt text](https://raw.githubusercontent.com/Samareimorgan/Project_2/master/public/assets/images/plannersearch.JPG "Plate Planner Home Page & Search Bar")

####Featured Recipes
![alt text](https://raw.githubusercontent.com/Samareimorgan/Project_2/master/public/assets/images/plannersearch.JPG "Plate Planner Featured Recipes")

####Accordion Collapsed
![alt text](https://raw.githubusercontent.com/Samareimorgan/Project_2/master/public/assets/images/accordion-collopsed.JPG "Accordion Collapsed")

####Accordion Expanded
![alt text](https://raw.githubusercontent.com/Samareimorgan/Project_2/master/public/assets/images/accordion-open.JPG "Accordion Expanded")

####Add Recipe to Favorites and Shopping List
![alt text](https://raw.githubusercontent.com/Samareimorgan/Project_2/master/public/assets/images/addtofav.JPG "Save to Favorites Worked")

####Shopping List - Empty
![alt text](https://raw.githubusercontent.com/Samareimorgan/Project_2/master/public/assets/images/ShoppingList-empty.JPG "Shopping List Page with no ingredients")

####Shopping List with Ingredients
The shopping list with ingredients is under construction as it works on one local machine, but not on the deployed site or other members' local machines.  


####Profile Page - Empty
![alt text](https://raw.githubusercontent.com/Samareimorgan/Project_2/master/public/assets/images/profile-blank.JPG "Profile page with no saved recipes")

####Profile Page with Saved Recipes

The profile page with saved recipes is under construction as it works on one local machine, but not on the deployed site or other members' local machines.  


####Facebook Authentication
![alt text](https://raw.githubusercontent.com/Samareimorgan/Project_2/master/public/assets/images/facebookauth.JPG "Facebook authentication page")

Facebook Authentication works, though the code has been commented out as it is believed some of the functionality of the API does not work with that code active. 

####Facebook Connect Requirements- Terms & Privacy Policy
In order for Facebook Connect to work live, they require both a terms & conditions policy as well as a privacy policy 

![alt text](https://raw.githubusercontent.com/Samareimorgan/Project_2/master/public/assets/images/terms.JPG "Terms & Conditions Policy ")

![alt text](https://raw.githubusercontent.com/Samareimorgan/Project_2/master/public/assets/images/privacy.JPG "Privacy Policy")



##Future Updates
1. Add the title of the recipe to shopping list above the ingredients associated with that recipe. 
2. Add a link to the ingredient to allow users to purchase what’s on their shopping list.
3. Connect the Facebook User ID to the saved recipes in order to personalize it more.
4. Update to the profile page, having the ability to recall ingredients and send them back to the shopping list from the saved recipes. 
5. Update to the profile page to add personalization for profile picture, name and email.
![alt text](https://raw.githubusercontent.com/Samareimorgan/Project_2/master/public/assets/images/profile.JPG "Plate Planner Logo")



## Contributors
University of Denver Coding BootCamp Students: 

David Watson - Food to Fork Api Calls, Bootstrap Accordion,  integration with Sequelize and other misc Backend items.

Luke Karlovich - Sequelize database and server creation, integration with Food to Fork Api Calls, Models, Handlebars

Raven Alexander - Front End - Bootstrap, Handlebars HTML, Carousel Javascript, App Logo and Design, SASS, Powerpoint

Samantha Johnston - Github reviewer, ReadMe.md, Facebook Authentication and Api calls,Privacy & Terms Policy, misc Front End items as needed, Heroku Deployment

## Acknowledgements
Thanks to the University of Denver Bootcamp instructor Terra Taylor and Teaching Assistants Evan, Jacq, & Dillon for their support in development of Plate Planner. 

## License 
MIT (c) Team Spicy



