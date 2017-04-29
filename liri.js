
// Grabs the keys variables
var keys = require("./keys"); 
var request = require("request");
// Gets all of keys from the keys file.
var keyList = keys.twitterKeys;
//console.log(keyList)
// Load the fs package to read and write
var fs = require("fs");
// Create a basic command line Node application using the inquirer package.
var inquirer = require("inquirer");
var Twitter = require('twitter'); //var Twitter = require('twitter')
//var Spotify = require('spotify-web-api-js');
//var s = new Spotify();
var spotify = require('spotify');
// Take one argument... set up for two 
// The first will be the command (my-tweets,spotify-this-song,movie-this,do-what-it-says)   
var command = process.argv[2];
var extra = process.argv[3];
if (process.argv.length > 4) {
    for (var i = 4; i < process.argv.length; i++) {
        extra += ' ' + process.argv[i];
    }
}

doCommand();

    
    
function spotifyThis() {
    if (!extra) {
        extra = "The Sign";
    } 
    spotify.search({ type: 'track', query: extra }, function(err, data) {

    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    else {
        console.log("The song you searched for is " + extra);
        console.log("The name of the Artist found is " + data.tracks.items[0].album.artists[0].name);
        console.log("The name of the album it is found on is " + data.tracks.items[0].album.name);
        console.log("The link to the url to find this at is:");
        console.log(data.tracks.items[0].album.external_urls.spotify);
    }   
    });       
}

function myTweets() {
    console.log("inside twitter function")


    var client = new Twitter(keyList);
 
    var params = {screen_name: 'gerald_poyntz'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            // tweets is an array
            tweets.forEach(function(tweet) {
               console.log(tweet.text, '\n', tweet.created_at, '\n');
            });
        }
    });
        
}
     


function movie() {
    // Then run a request to the OMDB API with the movie specified
    if (!extra) {
        extra = "Mr. Nobody";
    }    

    var queryUrl = "http://www.omdbapi.com/?t=" + extra + "&y=&plot=short&r=json";

     // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

        //standard request forma     
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
             console.log("Rotten Tomatoes Rating: " + JSON.stringify(JSON.parse(body).Ratings[1].Value));
             console.log("Rotten Tomatoes URL: " + JSON.stringify(JSON.parse(body).Website));
        }

        else {
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
                 console.log("Rotten Tomatoes URL: " + JSON.parse("www.rottentomatoes.com"));
            });


        }
    });
}

function doWhatItSays() {

    var data = fs.readFileSync("random.txt", "utf8").toString();
    var split = data.split(",");
    command = split[0].toString();
    if (split.length > 1) {
        extra = split[1].toString();
    }
    else {
        extra = undefined;
    }
    doCommand();

}

function doCommand() {
    // create a switch-case statement 
    // The switch-case will direct which function gets run.
    switch (command) {
      case "my-tweets":
        myTweets();
        break;

      case "spotify-this-song":
        spotifyThis();
        break;

      case "movie-this":
        movie();
        break;

      case "do-what-it-says":
        doWhatItSays();
        break;
    } 
}
//oauth token = BQCLboBXttaElIerwJW-I3K_0ARWqcOuXxbMpNwOhVV6MgcqIFgNeY4E8nQoVKdC0ZL88Up7JhhR-B1uVQfJ4u6wN05HY0o1OosksCETglk4x6keXyZ-xQc6254Hmb_l_4Y6tRyZ