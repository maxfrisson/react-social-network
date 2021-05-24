import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import SocialNetworkApp from "./App";

let rerenderEntireTree = () => {
  ReactDOM.render(
    <SocialNetworkApp/>,
    document.getElementById("root")
  );
};

rerenderEntireTree();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
