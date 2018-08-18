require("dotenv").config();

var keys = require("./keys.js");
//var fs = require("fs");//
var liri = process.argv[2];
var searchTerm = process.argv[3];

//-----------Twitter-----------//
var myTwitter = function() {
    var twitter = require('twitter');
    var client = new twitter(keys.twitter);
    
    var params = {screen_name: "RickyBunns", count: 20};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if(error) {
            console.log("Cannot get tweets...");
        } else {
            console.log("My last 20 tweets:");
            console.log("----------");
            for (var i = 0; i < tweets.length; i++) {
            console.log("Tweet: " + tweets[i].text);
            console.log("Date:  " + tweets[i].created_at);
            console.log("----------");
            }
        }
    })
};
//----------Spotify----------//
var spotify = function(searchTerm) {
    var spotifyRequire = require('node-spotify-api');
    var spotify = new spotifyRequire(keys.spotify);

    spotify.search({type: 'track', query: searchTerm, limit: 1}, function(error, data) {
        if (error) {
            console.log("Cannot find song");
        } else {
            console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
			console.log("Song name: " + data.tracks.items[0].name);
			console.log("External url: " + data.tracks.items[0].preview_url);
			console.log("Album: " + data.tracks.items[0].album.name);
		}
    })
};
//-----------OMDB----------//
var omdb = function(searchTerm) {
    var request = require("request");
    request("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&tomatoes=true&apikey=870cd5a7", function(error, response, body) {
        if (error) {
            console.log("Cannot find movie info");
        } else if(!error && response.statusCode === 200) {
            var movie = JSON.parse(body);
            console.log("Movie Title: " + movie.Title);
	        console.log("Release Year: " + movie.Year);
            console.log("IMDB Rating: " + movie.imdbRating);
            //All Rotten Tomato ratings show as N/A//
            console.log("Rotten Tomatoes Rating: " + movie.tomatoRating);
	        console.log("Country: " + movie.Country);
	        console.log("Language: " + movie.Language);
	        console.log("Plot: " + movie.Plot);
	        console.log("Actors: " + movie.Actors);
        }
    })
}

if(liri === "my-tweets") {
    myTwitter();
} else if (liri === "spotify-this-song") {
    //search song with "" around title
    spotify(searchTerm);
} else if (liri === "movie-this") {
    //search movie with "" around title
    omdb(searchTerm);
}