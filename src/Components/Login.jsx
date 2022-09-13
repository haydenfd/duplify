import React, { useEffect, useState, useCallback } from 'react'
import '../App.css'
import { Card, CardMedia, CardContent } from '@mui/material'
import { Button } from "./Styled" 

// auth
const CLIENT_ID = process.env.REACT_APP_API_KEY
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const REDIRECT_URI = "http://localhost:3000/redirect"
const SCOPES_PARAM = ["user-read-email", "user-read-private", "playlist-modify-public", "playlist-modify-private"].join("%20")


//redirect to spotify auth page
const handleLogin = () => {
  window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_PARAM}&response_type=token&show_dialog=true`;
};

const header = (token) => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

const Login = (props) => {
  const { setCurrentRoute } = props;

  return (
    <div className="App">
      <Button onClick={() => handleLogin()}>
        Login
      </Button>
    </div>
  )
}

export default Login;