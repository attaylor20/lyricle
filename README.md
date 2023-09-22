# Lyricle - Lyric Guessing Game
Lyricle is a fun lyric guessing game inspired by the popular word game, Wordle. In this game, players are presented lyrics from a song and attempt to guess which song they are from within 6 attempts. Each time a player guesses incorrectly, another line of lyrics is revealed. It's a test of your lyrical knowledge and music fandom. Are you up for the challenge?

## How to Play
Lyricle website: [https://attaylor20.github.io/lyricle/](https://attaylor20.github.io/lyricle/)

<details>
  <summary>Spoiler: How to cheat</summary>
  
  The correct song is logged in the the browser console after each guess
</details>

## How it was made
Lyricle was built using vanilla JavaScript interacting with Vagalume and Spotify's API via AJAX calls to pull song lyrics, artwork, and song previews.
Lyrics are provided by the [Vagalume API](https://api.vagalume.com.br/). 
Artwork and song previews are provided by [Spotify's API](https://developer.spotify.com/documentation/web-api).
