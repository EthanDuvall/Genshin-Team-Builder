import React from "react";
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
