import React from "react";
import "core-js/stable";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAnIq6jRCCed_1gjkWtvst91SQtzAEFuFw",
  authDomain: "proyecto-react-codergm.firebaseapp.com",
  projectId: "proyecto-react-codergm",
  storageBucket: "proyecto-react-codergm.appspot.com",
  messagingSenderId: "402663027023",
  appId: "1:402663027023:web:0ca7e85a5f744ca989153a",
};

const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
