# Recipe Book

Welcome to the Recipe Book web application repository! This project allows users to register, create, update, and delete their own recipes, as well as add other users' recipes to their favorites.

**Live Demo:** Coming soon

<picture>
 <img alt="Game screenshot" src="with like.png">
</picture>

## Technology Stack 

The Recipe Book application utilizes the following technologies:

* **Frontend:** React JS, react-router, axios, react-hook-form.
* **Backend:** Node JS, Express, jsonwebtoken, mongoose, cors.
* **Database:** MongoDB.


## Features

* **Recipe Management:** Registered users can create, update, and delete their own recipes through a user-friendly edit form.
* **User Authentication:** Users can register accounts and log in securely using JWT Tokens.
* **Add image:** Users can add URL to the trird-party website that hosts their image of dish or similar to it. 
* **Favorite Recipes:** Users can add recipes created by others to their favorites for easy access.
* **Seacrh functionality:** Users can search for recipes by dish name, making it easy to find specific recipes.



## Purpose

The idea for this project came to me when I realized that I needed a place to store all the recipes I found online. While there are apps available that offer such functionality, I found that I wasn't satisfied with their recipe creation forms. They all had strict rules about how recipes should be organized in order to be added. So, I decided to create my own recipe book. It has a user-friendly edit form that doesn't require users to follow strict rules about how to create their recipe. Additionally, users can upload the URL to an image of their dish or simply select a stock image of the prepared recipe. This web app utilizes client-side routing, implemented with react-router, allowing users to seamlessly transition between pages. Users can also like recipes from others, and these liked recipes will be displayed on their individual profile page.


## Current Status

The current status of the project is in development. However, two significant security issues have been identified in the web application:

1. The authentication system utilizes local storage, which can be easily manipulated by anyone, potentially granting unauthorized access to the backend server. A solution to this issue would involve revamping the entire system to use session cookies or integrating a third-party authentication provider.

2. The insertion of URLs for images does not include validation to verify the legitimacy of the inserted link. This leaves the application vulnerable to malicious JavaScript code injection, which could potentially compromise the security of the entire app. To address this issue, I am currently developing a server where users can upload images directly, and the server will store these images in a third-party cloud provider.
  
