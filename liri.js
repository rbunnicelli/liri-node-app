require("dotenv").config();


//var spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");//

//var spotifyKeys = new Spotify(keys.spotify);//

//-----------Twitter-----------//
var myTwitter = function() {
    var twitter = require('twitter');
    var keys = require("./keys.js");
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

var liri = process.argv[2];

if(liri === "my-tweets") {
    myTwitter()
}