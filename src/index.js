import React from "react";
import ReactDom from "react-dom/client";
// import './App.css';
// import App from './App';
import Starrating from "./Step";

 const root=ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     {/* <App /> */}
     <Starrating  maxrating={10}/>
  </React.StrictMode>
)