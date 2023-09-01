import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AppContextApplication from "./Context";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AppContextApplication>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AppContextApplication>
);
