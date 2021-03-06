import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/authContext";
ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>,

  document.getElementById("root")
);
