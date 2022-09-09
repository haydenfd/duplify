import React, { useEffect, useState, useCallback } from 'react'
import '../App.css'
import { Card, CardMedia, CardContent } from '@mui/material'
import { Button } from "./Styled" 

// auth
const CLIENT_ID = process.env.REACT_APP_API_KEY
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const REDIRECT_URI = "http://localhost:3000/afterAuth"
const SCOPES_PARAM = ["user-read-email", "user-read-private", "playlist-modify-public", "playlist-modify-private"].join("%20")

// get access token
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
  const {
    setCurrentRoute
  } = props;

  //get the access token, put into local storage
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = SpotifyAuthParams(window.location.hash);
      window.location.hash = "";

      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);

      // retrieve
      // setCurrentRoute("home")
    }

  }, []);

  //get user profile id
  async function retrieveUser() {

    let userParams = {
      method: 'GET',
      headers: header(localStorage.getItem("accessToken"))
    }

    const user = await fetch('https://api.spotify.com/v1/me/', userParams)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        return data
      })

    // localStorage()

  }

  return (
    <div className="App">
      login page lol

      <Button onClick={() => handleLogin()}>
        Login
      </Button>
    </div>
  )
}

export default Login;