//include te packages that will be used
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');

//check to see it is loaded
console.log("I'm loaded!!!");

//tewitter stuff



//spotify stuff

spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, spotifyData) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }

    console.log(spotifyData);
console.log("seperator===============================================");
    console.log(JSON.stringify(spotifyData.tracks.items.length, null, 2));

    for (var i = 0; i < spotifyData.tracks.items.length; i++) {
    console.log(JSON.stringify(spotifyData.tracks.items[i].artists[0].name, null, 2));
    }

});


// OMDB API stuff





















