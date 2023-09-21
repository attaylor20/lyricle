// Enums
  const artsitColumn = 3;
  const songColumn = 1;
  document.getElementById("start-button").addEventListener("click", initialNewGame);


function addLoader(){
  document.getElementById("search-button").addEventListener("click", loadPlaylist);
  document.getElementById("submit-button").addEventListener("click", checkGuess);
}
addLoader();



function initialNewGame(){
    console.log("new game started");
    var header = document.getElementById("header");
    const title = document.createElement("div");
    title.innerHTML
    header.innerHTML = '<h1 id="page-title">Lyricle</h1>';
    header.appendChild(title);

    newGame();
}

function searchLyrics() {
    var songName = document.getElementById("mus").value;
    var artistName = document.getElementById("artist").value;
    //console.log("searchLyrics function called");
    lyricLoader(artistName, songName);


  }



function loadPlaylist(){
  var userChoice = document.getElementById("genre-picker").value;
  var lyricsDisplay = document.getElementById("lyrics-display");
  
  for(var i = 0; i<1; i++){
    if(lyricsDisplay.innerHTML == ""){
      if (userChoice == "Rap"){
        getData("2010_rap.csv");
      }
      else if (userChoice == "2010Indie"){
        getData("indie_alt.csv");
      }
      else{
        getData("classic_rock.csv");
      }
    }
    else{
      break;
    }
  }
}


  function checkGuess() {
    var guess = document.getElementById("guess-input").value;
    if (guess.toLowerCase() === "all star") {
      document.getElementById("result").innerHTML = "Correct! The lyrics are from 'All Star' by Smash Mouth.";
    } else {
      document.getElementById("result").innerHTML = "Incorrect. Keep guessing!";
    }
  } 


//   Pull the lyrics from Vagalume's API
var parsedLyrics;
var correctAnswer;
var correctArtist;
function lyricLoader(artist, songName) {
  //console.log("lyricLoader function called");
    var xhttp = new XMLHttpRequest();
    var url = "https://api.vagalume.com.br/search.php?art=" + artist + "&mus=" + songName;
    xhttp.onreadystatechange = function() {

      //If successfully found, display text
      if (this.readyState == 4 && this.status == 200) {
        var lyricsObject = JSON.parse(this.responseText);
        //console.log(lyricsObject);

        //If song is not found, recursively call loadPlaylist -> lyricLoader loop until song is found
        if(lyricsObject.type == "notfound" || lyricsObject.type == "song_notfound"){
            //console.log("Song not found, trying next song");
            loadPlaylist();
        }

        var lyrics = lyricsObject.mus[0].text;
        parsedLyrics = parseLyrics(lyrics);
        correctAnswer = lyricsObject.mus[0].name;
        correctArtist = lyricsObject.art.name;
        document.getElementById("lyrics-display").innerHTML = parsedLyrics[0];
      }
      else {
        //console.log(this.readyState)
    }

  }
    xhttp.open("GET", url, true);
    xhttp.send();
}




//Creates an array where each index is a line of the song lyrics
function parseLyrics(lyrics){

  var lyricsArray = lyrics.split("\n");
  return lyricsArray;
}


//guessing mechanism
var guess = 1;
var lineToAdd = 1;

document.getElementById("submit-button").addEventListener("click", checkGuess);

function checkGuess(){
  var userGuess = document.getElementById("guess-input").value;
  console.log("user guess: " + userGuess);
  console.log("correct guess: " + correctAnswer);
  if (userGuess.toLowerCase() == correctAnswer.toLowerCase()){
    // behavior for correct guess
    endGame();
  }
  else if(guess >= 6){
    endGame();
  }
  else{
    //console.log("Wrong guess functionality: adding another line");
    //Need to get the parsedLyrics object from lyricLoader function
    while (parsedLyrics[lineToAdd] == "" || parsedLyrics[lineToAdd].includes("[") || parsedLyrics[lineToAdd].toLowerCase().includes("verse")){
      //console.log("Behavior: skipping this line because it is blank or a verse heading");
      lineToAdd++;
    }

    document.getElementById("lyrics-display").innerHTML += "<br>" + parsedLyrics[guess];
    guess++;
    lineToAdd++;
  }

}


function endGame(){
  const gameWrapper = document.getElementById("game-wrapper");

  gameWrapper.innerHTML = "";
  const resultText = document.createElement("div");
  resultText.classList.add("result-text")

  if(guess >= 6){
    resultText.innerHTML = "Unfortunately, you didn't get the Lyricle.<br>The answer was " + correctAnswer + " by " + correctArtist + ".<br>";
  }

  else if(guess == 1){
    resultText.innerHTML = "Perfect! Must be one of your favorites :)<br>The answer was " + correctAnswer + " by " + correctArtist + ".<br>You got this Lyricle on your first guess!<br>";

  }
  else{
    resultText.innerHTML = "Correct! The answer was " + correctAnswer + " by " + correctArtist  +  ".<br>You got this Lyricle in " + guess + " guesses!<br>";
  }
  gameWrapper.appendChild(resultText);
  
    const playAgainButton = document.createElement("button");
    playAgainButton.classList.add("btn", "btn-primary")
    playAgainButton.textContent = "Play Again";
    playAgainButton.id="play-again-button";
    const albumImage = document.createElement("img");
    albumImage.src = albumArtLink;
    albumImage.id="album-image";

    gameWrapper.appendChild(albumImage);
    gameWrapper.appendChild(playAgainButton);
    playAgainButton.addEventListener("click", newGame);

  
  
  const endGameDiv = document.createElement("div");


}







//pasring file


// import Papa from 'papaparse';

//Learned from: https://www.youtube.com/watch?v=RfMkdvN-23o&ab_channel=TheCodingTrain


var albumArtLink; //might have to put this into the lyricLoader function if it is changing dynamically too much
 function getData(playlist){
  fetch(playlist) //will make this a varaible to be inserted by a parameter depending on the playlist chosen
  .then(response => response.text())
  .then(csvData => {
    // Parse the CSV data
    const parsedData = Papa.parse(csvData);
    randomIndex = Math.floor(Math.random() * parsedData.data.length) + 1;
    //console.log("running searchLyrics Data with index: " + randomIndex);
    var artistName = parsedData.data[randomIndex][artsitColumn];
    var songName = parsedData.data[randomIndex][songColumn];
    albumArtLink = parsedData.data[randomIndex][9];
    lyricLoader(artistName, songName);



    // Access individual rows test
    // console.log(parsedData.data[0]);
    // console.log(parsedData.data[1][artsitColumn]);
    // console.log(parsedData.data[2][songColumn]);
    console.log("parsedData length is: " + parsedData.data.length)
    //
    return parsedData;
  });
}




function newGame(){
  //need to reset counts, bring back original information

  guess = 1;
  lineToAdd = 1;

  const parentElement = document.getElementById("game-wrapper"); 
  parentElement.innerHTML="";
  const playlistPicker = document.createElement("div");
  playlistPicker.innerHTML = `
  <div id="playlist-picker">
        Pick a playlist
        <select class="form-control selectpicker" name="genre" id="genre-picker">
          <option value="2010Indie">2010's Indie</option>
          <option value="Rap">Hip-hop/Rap</option>
          <option value="classicRock">Classic Rock</option>
        </select>
      </div>
      <div id="search-button-container">
        <button type="button" class="btn btn-primary" id="search-button">Play</button>
      </div>

      <div id="lyrics-display"></div>

      <div id="guessing-wrapper">
        <div class="input-group" id="guess-submission-wrapper">
          <input type="text" class="form-control" id="guess-input" placeholder="Enter guess">
          <button class="btn btn-primary" id="submit-button">Submit Guess</button> <!-- For some reason had to include a height style to match with form size -->
       </div>
       <div id="suggestions-container"></div>
      </div>

    </div>
  `;
  parentElement.appendChild(playlistPicker);
  addLoader();


}









/*
Next feature: Autocomplete suggestions when typing in a song

Autocomplete suggestions: https://www.youtube.com/watch?v=MO3qC1ouGiA&ab_channel=CodingArtist*/