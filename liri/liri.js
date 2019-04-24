require("dotenv").config();

const keys = require("./keys.js");

const Spotify = require("node-spotify-api");

const moment = require("moment");

const fs = require("fs");

const axios = require("axios")

const spotify = new Spotify(keys.spotify)

// create variable for process.argv[2]
const action = process.argv[2]
let result = process.argv[3]
// use switch statements

switch (action) {
  case "concert-this":
    concertThis(result);
    break;

  case "spotify-this-song":
    spotifyThisSong(result);
    break;

  case "movie-this":
    movieThis(result);
    break;

  case "do-what-it-says":
    doWhatItSays(result);
    break;


}

function concertThis(artist) {

  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

  axios.get(queryUrl).then(function (response) {

    if (!response.data.length) {

      return console.log("No results found")
    } else if (response) {

      let show = response.data;

      console.log(`------------- ${artist} upcoming shows ------------- \n\n`)

      show.forEach(show => {
        console.log(`
          ${show.venue.city},
          ${show.venue.region || show.venue.country}
          at
          ${show.venue.name}
          ${moment(show.datetime).format("MM/DD/YYYY")}
        `);
      });
    }

  })
}

function spotifyThisSong(result) {

  spotify.search({
      type: 'track',
      query: result
    })
    .then(function (response) {

      console.log(response);
      if (!response) {
       
        return console.log("The sign by Ace of Base")
      } else if (response) {

        let respSong = response.tracks.items;

        respSong.forEach(respSong => {
          console.log(`
            ${respSong.name},
            ${respSong.Artist},
              ${respSong.Album},
          `)

        })

      }
    })
    .catch(function (err) {
      console.log(err);

    });
}


function movieThis(movieName) {


  const queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


  axios.get(queryUrl)

    .then(function (response) {

      if (!response.data) {

        return console.log("Mr. Nobody http://www.imdb.com/title/tt0485947/")
      } else if (response) {

        let movie = response.data;

        // movie.forEach(movie => {
        console.log(`
          ${movie.Title},
          ${movie.Year},
          ${movie.imdbRating},
          ${movie.Ratings[1]},
          ${movie.Country},
          ${movie.Language},
          ${movie.Plot},
          ${movie.Actors},`)
        // })
      }


    });
}

// // reading the Random.txt file using fs require
function doWhatItSays() {

  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {

      return console.log(error)
    }
    console.log(data);
  })

  // switch statement


}