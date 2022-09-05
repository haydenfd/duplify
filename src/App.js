import React, { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
import { Container, Button, TextField, List, ListItem, ListItemText } from '@mui/material';

const App = () => {
  
  const CLIENT_ID = "#"
  const CLIENT_SECRET = "#"
  const [accessToken, setAccessToken] = useState("")
  const [input, setInput] = useState("")
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {

    var params = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }

    fetch('https://accounts.spotify.com/api/token', params)
    .then(result => result.json())
    .then(data => setAccessToken(data.access_token))
    }, [])

  async function retrieveUser() { 

  
    var params = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken 
      }
    }
    
    var userObject = await fetch('https://api.spotify.com/v1/users/' + input + '/playlists', params)
      .then(response => response.json()).then(data => setPlaylists(data.items))


    console.log(playlists)
  }

  return (
    <div className="App">
      <Container>
        <TextField label={"Text Value"} value={input} onChange={(e) => setInput(e.target.value)} />

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

