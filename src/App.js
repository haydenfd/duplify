import React, { useEffect, useState, useCallback } from 'react'
import './App.css'
import { Container, Button, TextField, List, ListItem, ListItemText } from '@mui/material';

//auth
const CLIENT_ID = process.env.REACT_APP_API_KEY
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const REDIRECT_URI = "http://localhost:3000"
const SCOPES_PARAM = ["user-read-email", "user-read-private", "playlist-modify-public", "playlist-modify-private"].join("%20")
const header = (token) => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`  
  }
}

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

  //get the access token, put into local storage
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = SpotifyAuthParams(window.location.hash);
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


  //get user profile id
  async function retrieveUserID() { 

    let userParams = {
      method: 'GET',
      headers: header(accessToken)
    }
    
    const user = await fetch('https://api.spotify.com/v1/me/', userParams)
      .then(response => response.json())
      .then(data => {
        console.log(data.id)
        return data
      })
  
    setUserID(user.id)
  }

  //pull up the playlist to be duplicated
  async function getPlaylist(id) { 
  
    const endpoint = `https://api.spotify.com/v1/playlists/${id}`

    var playlistParams = {
      method: 'GET',
      headers: header(accessToken)
    }

    var playlist = await fetch(endpoint, playlistParams)
      .then(response => response.json())
      .then(data =>
      {
        console.log(data)
        return data
      })

      setSongs(playlist.tracks.items)
  }

  const createAndPopulatePlaylist = useCallback(async () => {

    const playlistsEndpoint = `https://api.spotify.com/v1/users/${userID}/playlists`;
    const playlistsParams = {
      method: 'POST',
      headers: header(accessToken),
      body: JSON.stringify({
        name: playlistName,
        description: "New playlist description",
        public: false
      })
    };

    let playlistObject = await fetch(playlistsEndpoint, playlistsParams);
    playlistObject = await playlistObject.json();
    const { id } = playlistObject;

    const tracksEndpoint = `https://api.spotify.com/v1/playlists/${id}/tracks`;
    const songURI = songs.map(song => song.track.uri);

    const tracksParams = {
      method: 'POST',
      headers:  header(accessToken),
      body: JSON.stringify({
        uris: songURI
      })
    };

    await fetch(tracksEndpoint, tracksParams);
  }, [userID, accessToken, playlistName, songs]);

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
            retrieveUserID()
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
            onClick={createAndPopulatePlaylist}
          >
            Create new playlist
          </Button>
          {
            songs.map((song, i) => {

              return (
                <ListItem key={i}>
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

