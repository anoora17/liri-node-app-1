//include te packages that will be used
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
var keys = require('./keys.js');
var controlWord;




//check to see it is loaded
console.log("I'm loaded!!!");

if (process.argv.length === 2) {
    //no argv for control word. force switch to default
    controlWord = 'use_default';
}
else{
    controlWord = process.argv[2];
}


switch (controlWord){
    case "my-tweets":
        my_tweets();
    break;

    case "spotify-this-song":
        var songName="";
        songName = process.argv[3];
        spotify_this_song(songName);
    break;

    case "movie-this":
        var movieName="";
        movieName = process.argv[3];
        movie_this(movieName);
    break;

    case "do-what-it-says":
        do_what_it_says();
    break;

    default:
        //when in doubt use the file method
        do_what_it_says();
}

function my_tweets(){
    // Twitter API Credentials
    var client = new twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });

    // Make call to Twitter API to get user's timeline
    client.get('statuses/user_timeline', {screen_name: 'mike123henry'}, function(error, tweets, response){
        if (!error) {
            console.log('tweets: '+JSON.stringify(tweets, null, 2));
        } else {
            console.error('An error occurred!'); //error handling
            console.log('response = '+response);
            console.log('error = '+error);
            console.log('tweets = '+tweets);
        }
    });
}


function spotify_this_song(songName){
    //check to see if was passed a valid songName
    if (songName === undefined) {
        //force song name if it is not passed
        songName = "what's my age again";
    }
    spotify.search({ type: 'track', query: songName }, function(err, spotifyData) {
        if ( err ) {
            console.log('Error occurred: ' + err);
        return;
        }
        if (spotifyData.tracks.items.length === 0) {
            console.log('No data was returned by Spotify -- if the song name is more than one word enclose it in quotes and check the spelling...');
        }
        else{
            for (var i = 0; i < spotifyData.tracks.items.length; i++) {
            console.log(i+1);
            console.log('Artist: '+JSON.stringify(spotifyData.tracks.items[i].artists[0].name, null, 2));
            console.log('Song Name: '+JSON.stringify(spotifyData.tracks.items[i].name, null, 2));
            console.log('Preview Song: '+JSON.stringify(spotifyData.tracks.items[i].preview_url, null, 2));
            console.log('Album: '+JSON.stringify(spotifyData.tracks.items[i].album.name, null, 2));
            console.log("===============================================");
            }
        }

    });
}


function movie_this(theMovie){
    //check to see if was passed a valid songName
    if (theMovie === undefined) {
        //force song name if it is not passed
        theMovie = "Mr. Nobody";
    }
    request('http://www.omdbapi.com/?t='+theMovie+'&y=&plot=short&r=json', function (error, response, movieData) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(movieData);

            console.log("Title: "+data.Title);
            console.log("Year: "+data.Year);
            console.log("Rated: "+data.Rated);
            console.log("IMDB Rating: "+data.imdbRating);
            console.log("Country: "+data.Country);
            console.log("Language: "+data.Language);
            console.log("Plot: "+data.Plot);
            console.log("Actors: "+data.Actors);
        }
    })
}

function do_what_it_says(){
    fs.readFile("random.txt", "utf8", function(error, fileData) {
        // Then split it by commas (to make it more readable)
        var dataArr = fileData.split(',');
        var controlWord = dataArr[0];
        switch (controlWord){
            case "my-tweets":
                my_tweets();
            break;

            case "spotify-this-song":
                var songName="";
                songName = dataArr[1];
                spotify_this_song(songName);
            break;

            case "movie-this":
                var movieName="";
                movieName = dataArr[1];
                movie_this(movieName);
            break;

            default:
                //when in doubt halt and self destruct
                console.log("the do-what-it-says function does not have adequate information to proceed");
                //format c:
        }
    });
}











