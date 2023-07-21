import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import BibleContextProvider from "./context/BibleContext";
import UIContextProvider from "./context/UIContext";
import { BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css"
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <UIContextProvider>
        <BibleContextProvider>
          <App />
        </BibleContextProvider>
      </UIContextProvider>
    </Router>
  </React.StrictMode>
);
