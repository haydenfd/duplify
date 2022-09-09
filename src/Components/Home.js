import React, { useEffect, useState, useCallback } from 'react'
import '../App.css'
import styled from "styled-components"
import { Card, CardMedia, CardContent } from '@mui/material'
import {
  Button,
  Input,
  Status,
  Form,
  // Title, 
  // SubTitle
} from './Styled';

const header = (token) => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

const Home = (props) => {
  const {
    setCurrentRoute
  } = props;


  // const classes = useStyles()

  const [accessToken, setAccessToken] = useState("") //access token
  const [playlistURL, setPlaylistURL] = useState("")
  const [playlist, setPlaylist] = useState({}) //songs from to-be-dup playlist
  const [songs, setSongs] = useState([])
  const [playlistName, setPlaylistName] = useState("")
  const [user, setUser] = useState({})
  const [isClippyTimeout, setIsClippyTimeout] = useState(false);

  //pull up the playlist to be duplicated
  const getPlaylist = useCallback(async (url) => {

    const id = url.substring(34, 56)
    console.log(id)
    const endpoint = `https://api.spotify.com/v1/playlists/${id}`

    const playlistParams = {
      method: 'GET',
      headers: header(accessToken)
    }

    const playlist = await fetch(endpoint, playlistParams)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        return data
      })

    setPlaylist(playlist)
    setSongs(playlist.tracks.items)
    console.log(Object.keys(songs[0]))
    console.log(Object.keys(songs[0].track))
    console.log(songs[0].track)
  }, [accessToken, songs]);

  useEffect(() => {
    window.addEventListener('focus', async (event) => {
      // if (isClippyTimeout) return
      // setIsClippyTimeout(true);
      // setTimeout(() => {
      //   setIsClippyTimeout(false);
      // }, 3000);
      console.log("There was an attempt.")
      try {
        const clippy = await navigator.clipboard.readText()
        if (/https:\/\/open.spotify.com\/playlist\/.*/.test(clippy)) {
          console.log(`Pasted ${clippy}`)
          getPlaylist(clippy);
        }
      } catch (err) {
        
      }
    });
  }, [getPlaylist]);




  // const createAndPopulatePlaylist = useCallback(async () => {

  //   const playlistsEndpoint = `https://api.spotify.com/v1/users/${user}/playlists`;
  //   const playlistsParams = {
  //     method: 'POST',
  //     headers: header(accessToken),
  //     body: JSON.stringify({
  //       name: playlistName,
  //       description: "New playlist description",
  //       public: false
  //     })
  //   };

  //   let playlistObject = await fetch(playlistsEndpoint, playlistsParams);
  //   playlistObject = await playlistObject.json();
  //   const { id } = playlistObject;

  //   const tracksEndpoint = `https://api.spotify.com/v1/playlists/${id}/tracks`;
  //   const songURI = songs.map(song => song.track.uri);

  //   const tracksParams = {
  //     method: 'POST',
  //     headers:  header(accessToken),
  //     body: JSON.stringify({
  //       uris: songURI
  //     })
  //   };

  //   await fetch(tracksEndpoint, tracksParams);
  // }, [user, accessToken, playlistName, songs]);

  
  return (
    <div className="App">
      <Status>
        <h1>Signed in: {user.display_name}</h1>
      </Status>
      <h1 className='title'>DUPLIFY</h1>
      <h2 className='subtitle'>Customize existing playlists</h2>
      <Form>
        <Input
          type="text"
          placeholder="Enter playlist URL"
          value={playlistURL}
          onChange={(e) => setPlaylistURL(e.target.value)}
        >
        </Input>
        <Button onClick={() => {
          getPlaylist(playlistURL)
        }}>
          Submit
        </Button>
      </Form>
      <div className="grid">
        {
          songs.map((song, i) => {
            return (
              <Card
                variant="outlined"
                style={{
                  borderColor: '#1ed760',
                  backgroundColor: 'grey',
                  padding: '0.5rem 0rem',
                  marginBottom: '2rem'
                }}>
                {i}
                <CardMedia component="img"
                  image={song.track.album.images[1].url}
                  style={{
                    maxWidth: '5%',
                    maxHeight: '5%',
                    float: 'left',
                    marginLeft: '1em'
                  }}
                />
                <CardContent>
                  {song.track.name} ; {song.track.artists[0].name} ;
                </CardContent>
              </Card>
            )
          })
        }

      </div>

      {/* <Container
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
      </Container> */}
    </div>
  )
}

export default Home;