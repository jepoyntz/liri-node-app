
// Grabs the keys variables
var keys = require("./keys.js"); 

// Gets all of myKeys keys from the keys file.
var keyList = keys.myKeys;
console.log(keys)
// Load the fs package to read and write
var fs = require("fs");
// Create a basic command line Node application using the inquirer package.
var inquirer = require("inquirer");

// Take one argument... set up for two 
// The first will be the command (my-tweets,spotify-this-song,movie-this,do-what-it-says)   
var command = process.argv[2];
var extra = process.argv[3];

inquirer.prompt([
    
  {
    type: "list",
    message: "Welcome to LIRI...How can I help you?",
    name: "doingWhat",
    choices: ["my-tweets", "spotify-this-song", "movie-this","do-what-it-says"]

  },    
  
  
  ]);

// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.
switch (command) {
  case "my-tweets":
    myTweets();
    break;

  case "spotify-this-song":
    spotify();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;
}

function myTweets() {

}

function spotify() {

}

function movie() {
    // Then run a request to the OMDB API with the movie specified
    var movieThis = "movie-this";
    var queryUrl = "http://www.omdbapi.com/?t=" + movieThis + "&y=&plot=short&r=json";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

   //standard request format
    request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover info I need
    
    console.log("Title of the Movie: " + JSON.parse(body).Title);
    console.log("Year the Movie Came Out: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Country Where Movie Produced: " + JSON.parse(body).Country);
    console.log("Language of the Movie: " + JSON.parse(body).Language);
    console.log("Plot of the Movie: " + JSON.parse(body).Plot);
    console.log("Actors in the Movie: " + JSON.parse(body).Actors);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings.Source[2].Value);
    console.log("Rotten Tomatoes URL: " + JSON.parse("www.rottentomatoes.com");
  }

  else 
    var movieThis = "Mr_Nobody";
    var queryUrl = "http://www.omdbapi.com/?t=" + movieThis + "&y=&plot=short&r=json";
    request(queryUrl, function(error, response, body) {
    
    console.log("Title of the Movie: " + JSON.parse(body).Title);
    console.log("Year the Movie Came Out: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Country Where Movie Produced: " + JSON.parse(body).Country);
    console.log("Language of the Movie: " + JSON.parse(body).Language);
    console.log("Plot of the Movie: " + JSON.parse(body).Plot);
    console.log("Actors in the Movie: " + JSON.parse(body).Actors);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings.Source[2].Value);
    console.log("Rotten Tomatoes URL: " + JSON.parse("www.rottentomatoes.com");
});


}

function doWhatItSays() {

}

