# Movie Database Project

## Description
When searching for any movie, the user will go through a long process to find the move they want. To fix this,
the usage of this database will help the user find the movie they like and it will be faster and more reliable.


## Link to Project Website
[https://rocky-journey-95706.herokuapp.com/](https://rocky-journey-95706.herokuapp.com/)

## Targeted Broswers
• iPhone 7 and newer models

• Samsung Galaxy S7 and newer models

• Google Pixel 2 and newer models

• Windows 10 and higher

• MacBook Air (2017 and newer models)

• MacBook Pro (2017 and newer models)

## Link for Developer Manual
• [Developer Manual](https://github.com/NKoyfish/Group-11-INST377-MoviesDB#developer-manual)

# Developer Manual

## How to install an application and other dependencies from other libraries
• Clone this repository

• Open the repository in VS Code 

• Type ```npm install``` in the terminal and run it

• The application should be ready to use

## How to run an application on the server
• Open the repository on VS Code and open up the terminal

• Type ```npm start``` and run it

• Go to ```http://localhost:3000/``` on your browser

## Server Application APIs
```/api``` - the API route for the movies database

/api/movies is a get request that retrieves all rows

/api/genres is the one with the delete and post method for adding and deleting genres

/api/genre retrieves one genre

/api/writer is the writer in making the movies

/api/writers is the the responsibility of multiple writers making the movie

/api/actor is the actor in the movie

## Server Application API Methods
The .get method for /api/genre would get the genre that is selected.

If using for example accessing /api/genres/6 with a delete fetch request would delete the genre matching genre_id: 6.

The .delete method for /api/genre deletes the genre.

Currently, it is unused due to the nature of users not knowing which genre_id matches to which actual genre name, but can be used by future developers to quickly delete genre_ids they know.

## Dependencies
chartjs-to-image

npm install chartjs-to-image
