import React, { useEffect, useState } from 'react'
import './App.css'
import { Container, Button, TextField, List, ListItem, ListItemText } from '@mui/material';

const CLIENT_ID = process.env.REACT_APP_API_KEY
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const REDIRECT_URI = "http://localhost:3000"

const SCOPES = ["user-read-email", "user-read-private"]
const SCOPES_PARAM = SCOPES.join("%20");

const getReturnedParamsFromSpotifyAuth = (hash) => {
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
  
  const [accessToken, setAccessToken] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [songs, setSongs] = useState([])
  const [userID, setUserID] = useState("")

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash);
      setAccessToken(access_token)

      localStorage.clear();

      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
    }
  }, []);

  const handleLogin = () => {
    window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_PARAM}&response_type=token&show_dialog=true`;
  };

  // function songFormat(name, artists) { 
  //   const first = artists[]
  //   return `${name} - ${artist}`
  // }

  async function retrieveUser() { 

  
    var params = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken 
      }
    }
    
    var userObject = await fetch('https://api.spotify.com/v1/me/', params)
      .then(response => response.json()).then(data => { return data })
    
    setUserID(userObject.id)
    console.log(userID)
  }

  async function getPlaylist(id) { 
  
    const endpoint = `https://api.spotify.com/v1/playlists/${id}`
    var params = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    var ret = await fetch(endpoint, params)
      .then(response => response.json()).then(data => { return data })

    setSongs(ret.tracks.items)
    console.log(songs)

    songs.forEach(function (item, index) {
      console.log(item.track.name, index);
    });
  }

  async function createPlaylist(name, description, isPublic) { 

    const endpoint = ''
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

