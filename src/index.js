import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import BibleContextProvider from "./context/BibleContext";
import UIContextProvider from "./context/UIContext";
import { HashRouter as Router } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import "bootstrap/dist/css/bootstrap.css"
import "./index.css";

const options = {
  position: positions.MIDDLE,
  timeout: 6000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
    <Router>
      <UIContextProvider>
        <BibleContextProvider>
          <App />
        </BibleContextProvider>
      </UIContextProvider>
    </Router>
    </AlertProvider>
  </React.StrictMode>
);
