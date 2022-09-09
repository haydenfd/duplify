import React, { useEffect, useState, useCallback } from 'react'
import './App.css'
import styled from "styled-components"
import { Card, CardMedia, CardContent } from '@mui/material'
import Login from "./Components/Login";
import Home from "./Components/Home";

const App = () => {
  const [currentRoute, setCurrentRoute] = useState("pending");

  useEffect(() => {
    // check for afterAuth, if it's there then set route to login
    if (localStorage.getItem("accessToken") === null) {
      setCurrentRoute("login")
    } else {
      setCurrentRoute("home")
    }
  }, [])

  return (
    <>
      {currentRoute === "login" && <Login setCurrentRoute={setCurrentRoute} />}
      {currentRoute === "home" && <Home setCurrentRoute={setCurrentRoute} />}
      {currentRoute === "pending" &&
        <div>
          ...
        </div>
      }
    </>
  )
}

export default App

