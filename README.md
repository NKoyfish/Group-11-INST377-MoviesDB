# Movie Database Project

## Description
When searching for any movie, the user will go through a long process to find the move they want. To fix this, the usage of this database will help the user find the movie they like and it will be faster and more reliable. Our database has a tab for showing a specific genre to choose and the user can select from the buttons any genre they like and the movies will appear in that genre selected.


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

```/api/movies```

  ```GET:```  returns all records in order by year, score, and gross in descending order
              
  ```POST:``` adds or edits a movie based on req.body form input from addfilm.html
              if req.body has a valid film_id then it will update the rows with the new data.
              If req.body doesn't pass in a film_id then it will add a new record to db.Films with the new data
              
 ```/api/movies/sorted```
 
  ```GET:```  returns a json object with all the records in db.Film sorted by only the year
  
 ```/api/movies/genres/:genre```
  
  ```GET:```  returns a json object with films matching the passed in {genre} name. IE. /movies/genres/Adventure would return all Adventure movies as a json.
              May not work with non predetermined genres other than those in the genre array found in the method.

```/api/movies/:filmID```

  ```GET:```  returns a json object of an individual film matching film_id {filmId}
  
  ```DELETE:```  Deletes a row from db.Film matching film_id {filmId} and sends a message and or status on failure
  
```/api/chart```

  ```GET:```  uses ChartJSImage to generate a new png of the genre count in db.Film and returns a json array of the exact count of each genre.
  
```/api/genres``` is the one with the delete and get method for retrieving and deleting genres

```/api/genre``` retrieves one genre

```/api/writer``` is the writer in making the movies

```/api/writers``` is the the responsibility of multiple writers making the movie

```/api/actor``` is the actor in the movie


## Server Application API Methods

Genre:
The .get method for /api/genre would get the genre that is selected.

If using for example accessing /api/genres/6 with a delete fetch request would delete the genre matching genre_id: 6.

The .delete method for /api/genre deletes the genre.

Currently, it is unused due to the nature of users not knowing which genre_id matches to which actual genre name, but can be used by future developers to quickly delete genre_ids they know.

Writer:
Three methods are used for /api/writer; GET, DELETE, and PUT

GET returns a writer at a specific ID

DELETE removes an entry of a writer

PUT adds a new writer entry


## Dependencies
chartjs-to-image

npm install chartjs-to-image

## Known Bugs
• Some of the posters on the movies database doesn't show up.

• The entry ID appears instead of actual movie data in some cases.
