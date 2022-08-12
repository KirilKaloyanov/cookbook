# Taste it! is an online cooking book for storing and sharing recipes

## Purpose

This project is created for an exam at Software University Sofia and implements the specific assignment for development of React.js application.

## Description

The application provides a collection of recipes to prepare tasty food. Users can publish their own recipes and keep it as a personal cooking book for future reference how they prepare their favourite meals. Users can also browse the recipes published by other users, make comments about every recipe and like it to increase the recipe's rating.

### Public part

When opening the app all users can browse all the recipes available in the application. Recipes can be filtered based on their category. Recipes with the best ratings are listed first in the recipes collection. Every recipe can be explored in detail with all ingredients and preparation steps. Below the recipe description the comments of other users are visible. 

All users can register and login to use the private part of the application.

### Private part

After successfull registration and login users have access to all the functionalities of the application. They can post comments and give likes to the recipes of other users. 

Logged in users have their own collection of recipes where they can publish, update and delete their recipes. 

## Architecture

The application (the client-side) is developed using `create-react-app` and has public folder holding the `index.html` file and a source folder holding react.js components, hooks, services and context. The client communicates to a server developed using Node.js and deployed at Heroku. The data is stored in MongoDB collection.

### Common Components

The application has 4 common components. These are accessible by all parts of the application. They are the Home, the Page Not Found, the Navigation bar and a basic input components which is used in other components which hold forms.

### User Components

User components provide functionality for registering, logging users in and out. 

### Recipe components

There are two main recipe components accessible for all users (logged-in or not). The `recipes.js` provides the list of all recipes with filtering options based on the recipes category. The `recipe.js` provides details for a single recipe. A helper component shows the comments which belong to the recipe. Other two helper components are avalaible to logged-in users. These are `newComment.js` and `like.js`. 

### UserRecipes Components

These components hold functionalities for logged-in users only. Similarly to the recipe components there are two main components - `userRecipes.js` and `recipeForm.js`. The first holds a list with the recipes of the user with buttons which deletes a single recipe and one button to add new recipe. The recipeForm component is used to publish new recipe or edit and existing one. This component have two helper components. The formSelectCategory renders the categories which the recipes belongs to. The formDynamicFields component helps with rendering the lists of ingredients and methods for every recipe giving the user a functionality to dynamically add or remove fields on the page form.

## Dependencies

The application uses several external libraries. These are `react-router-dom`, `bootstrap` and `jwt-decode`.
