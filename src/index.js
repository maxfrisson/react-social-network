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

reportWebVitals();
