# My Theme Park Database

## SETUP

- BACKEND: In your console, cd into the folder "mvp-FS26-Andrea-Teres". Run "npm start".
- FRONTEND: In a new console, cd into the "client" folder and run "npm run dev".
- DATABASE: In a new console, go into "mysql" and type:
  - USE parks;
  - SELECT \* FROM parks;
    This will display the table with the contents of the database (Note: If your Wishlist is empty, so will be the database table).
    You don't really need to work on the database in mysql (the contents are sent from the frontend and then the backend), but you can check if the Wishlist is working.

## Introduction

This MVP allows you to search any theme park in the world, display it in a map and save it in a wishlist.

## How does it work?

[display search results]
YELP API --> BACKEND --> HOME

[send items to Wishlist]
HOME --> BACKEND --> DATABASE --> WISHLIST

[display on map]
GOOGLE API --> MAP --> HOME
GOOGLE API --> MAP --> WISHLIST

### HOME

- The search bar on the "Home" page is connected to the Yelp API and displays the results inside the category of "Amusement Parks". It admits both a location and a park.
- Those results are at the same time connected to the Google Maps Embed API that displays the results (or some of them) on a map.
- The "marker" button shows the park on the map.
- The "i" button links you to the Yelp url of the park.
- The "star" button saves the park in your Wishlist (aka your "parks" database).

### WISHLIST

- Displays the parks you saved and they're also connected to the Google Maps Embed API.
- The "marker" button shows the park on the map.
- The "i" button links you to the Yelp url of the park.
- The "bin" button deletes the park from your Wishlist (and from your "parks" database)

## What does it contain?

- The backend routes connected to the Yelp API inside the index.js file.
- An App.jsx file with 2 components:
  - Home.jsx
  - Wishlist.jsx
- They both have a component in common:
  - Map.jsx (it connects to the Google Maps Embed API through the frontend)

_This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._
