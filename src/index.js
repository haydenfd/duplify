import './index.css'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Redirect from "./Components/Redirect"


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  
  <React.StrictMode>
    <App />
  </React.StrictMode>

);