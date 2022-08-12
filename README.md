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

The application (the client-side) is developed using `create-react-app` and has public folder holding the `index.html` file and a source folder holding react.js component, hooks, services and context. The client communcates to a server developed using Node.js and deployed at Heroku. The data is stored in MongoDB.

