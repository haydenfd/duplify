import React, { useEffect, useMemo, useState, useCallback } from 'react'
import './App.css'
import styled from "styled-components"
import { Card, CardMedia, CardContent } from '@mui/material'
import Login from "./Components/Login";
import Home from "./Components/Home";
import Redirect from "./Components/Redirect"


// import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [currentRoute, setCurrentRoute] = useState("");
  
  const updateRoute = (newRoute) => {
    //window.location = newRoute;
    window.history.pushState({}, "", newRoute)
    setCurrentRoute(newRoute);
  }

  const routeMap = {
    login: {
      protected: false,
      component: < Login setCurrentRoute={updateRoute} />,
    },
    home: {
      protected: true,
      component: < Home setCurrentRoute={updateRoute} />,
    },
    redirect: {
      protected: false,
      component: <Redirect setCurrentRoute={updateRoute} />,
    },
    dne: {
      protected: false,
      component: <div style={{ color: "white", textAlign: "center" }}> 404!</div>
    }
  };

  const routedComponent = useMemo(() => {
    const path = window.location.pathname.slice(1);
    if (path in routeMap) {
        if (routeMap[path].protected && localStorage.getItem("accessToken") === null) {
          updateRoute("login")
          return <></>;
        } else {
          return routeMap[path].component;
        }
    } else {
      updateRoute("home")
      return false;
    }
  }, [currentRoute])

  

  return (
    <>
      {routedComponent}
    </>
  );
}

export default App

