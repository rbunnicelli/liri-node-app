require("dotenv").config();

var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");

var spotifyKeys = new Spotify(keys.spotify);
var twitterKeys = new Twitter(keys.twitter);