import React, { useEffect, useState } from 'react'
import './App.css'
import { Container, Button, TextField, List, ListItem, ListItemText } from '@mui/material';

//auth
const CLIENT_ID = process.env.REACT_APP_API_KEY
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const REDIRECT_URI = "http://localhost:3000"
const SCOPES = ["user-read-email", "user-read-private", "playlist-modify-public", "playlist-modify-private"]
const SCOPES_PARAM = SCOPES.join("%20");


//get access token
const SpotifyAuthParams = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    console.log(currentValue);
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  return paramsSplitUp;
};

const App = () => {
  
  const [accessToken, setAccessToken] = useState("") //access token
  const [searchInput, setSearchInput] = useState("") //user playlist
  const [songs, setSongs] = useState([]) //songs from to-be-dup playlist
  const [userID, setUserID] = useState("") //user ID to create new playlist
  const [playlistName, setPlaylistName] = useState("")
  const [playlist, setPlaylist] = useState({})

  //get the access token, put into local storage
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        SpotifyAuthParams(window.location.hash);
      setAccessToken(access_token)

      localStorage.clear();

      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
    }
  }, []);

  //redirect to spotify auth page
  const handleLogin = () => {
    window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_PARAM}&response_type=token&show_dialog=true`;
  };

  //get user profile info
  async function retrieveUser() { 

    var searchParams = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken 
      }
    }
    
    const userObject = await fetch('https://api.spotify.com/v1/me/', searchParams)
      .then(response => response.json()).then(data => { return data })
  
    setUserID(userObject.id)
    console.log(userID)
  }

  //pull up the playlist to be duplicated
  async function getPlaylist(id) { 
  
    const endpoint = `https://api.spotify.com/v1/playlists/${id}`

    var params = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    var playlistObject = await fetch(endpoint, params)
      .then(response => response.json()).then(data =>
      {
        return data
      })

      setSongs(playlistObject.tracks.items)
      console.log(songs)
  }

  async function createPlaylist(name) { 

    const endpoint = `https://api.spotify.com/v1/users/${userID}/playlists`

    var params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify({
        name: name,
        description: "New playlist description",
        public: false
      })
    }

    var playlistObject = await fetch(endpoint, params)
      .then(response => response.json()).then(data => {
        setPlaylist(data)
      })
  
  }

//max 100 can be added in one request
  async function addSongs() { 

    const endpoint = `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`

    const songURI = []

    songs.forEach(song => songURI.push(song.track.uri))
    console.log(songURI)

    var params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify({
        uris: songURI
      })
    }

    var songsObject = await fetch(endpoint, params)
      .then(response => response.json()).then(data => {
        return data
      })

    console.log(songsObject)
  }

  return (
    <div className="App">
      <Container
        style={{backgroundColor: 'linear-gradient(120deg, #1DB954, #191414)'}}
      >
      
        <TextField label={"Text Value"} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />

        <Button
          variant="contained"
          style={{
            borderRadius: 15,
            backgroundColor: "#1ed760",
            color: "black",
            fontFamily: "sans-serif"
          }}
          size="large"

          onClick={() => handleLogin()}
        >
          Login
        </Button>

        <Button
          variant="contained"
          style={{
            borderRadius: 15,
            backgroundColor: "#1ed760",
            color: "black",
            fontFamily: "sans-serif"
          }}
          size="large"

          onClick={() => {
            retrieveUser()
            getPlaylist(searchInput.substring(34, 56))
          }}
        >
          Search
        </Button>
        <List>
          <TextField label={"Playlist name"} value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} />
          <Button
            variant="contained"
            style={{
              borderRadius: 15,
              backgroundColor: "#1ed760",
              color: "black",
              fontFamily: "sans-serif"
            }}
            size="large"

            onClick={() => {
              createPlaylist(playlistName)
              addSongs()

            }}
          >
            Create new playlist
          </Button>
          {
            songs.map((song, i) => {

              return (
                <ListItem>
                  <ListItemText primary={`${song.track.name}`}/>
                </ListItem>
              )
            })}

        </List>
      </Container>
    </div>
  )
}

export default App

