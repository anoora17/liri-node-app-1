//include te packages that will be used
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');

var controlWord;


//check to see it is loaded
//console.log("I'm loaded!!!");
//console.log("process.argv[2] = "+process.argv[2]);
//console.log("process.argv[3] = "+process.argv[3]);
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
        //check to see if app was called with enough arguments
        if (process.argv[3] === undefined) {
            //force song name if it is not passed in app
            songName = "what's my age again";
            //console.log("if undefined");
        }
        else{
            songName = process.argv[3];
            //console.log("else -- process.argv[3] = "+process.argv[3]);
        }
        spotify_this_song(songName);
    break;

    case "movie-this":
        movie_this();
    break;

    case "do-what-it-says":
        do_what_it_says();
    break;

    default:
        //when in doubt use the file method
        do_what_it_says();
}

function my_tweets(){

}


function spotify_this_song(songName){
    //console.log("spotify_this_song(songName) = " + songName);
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


function movie_this(){

}

function do_what_it_says(){

}











