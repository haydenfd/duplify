import React, { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
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
  const [input, setInput] = useState("")
  const [playlists, setPlaylists] = useState([])
  const [loggedIn, setLoggedIn] = useState("")

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
  });

  const handleLogin = () => {
    window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_PARAM}&response_type=token&show_dialog=true`;
  };

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
    
    console.log(userObject)
    setLoggedIn(userObject.display_name)

  }

  return (
    <div className="App">
      <Container style={{ background: 'linear-gradient(120deg, #1DB954, #191414)' }}>
        <TextField label={"Text Value"} value={loggedIn} />

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

          onClick={() => retrieveUser()}
        >
          Search
        </Button>
        <List>
          {
            playlists.map((playlist, i) => {

              return (
                <ListItem>
                  <ListItemText primary={`${playlist.name}`}/>
                </ListItem>
              )
            })}

        </List>
      </Container>
    </div>
  )
}

export default App

