import React from "react";
import ReactDom from "react-dom/client";
import App from './App-v3';
// import Starrating from "./Step";

const root=ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <App />
     {/* <Starrating  maxrating={10} messages={["Terrible", "Bad", "Okay", "Good", "Amazing"] }/> */}
  </React.StrictMode>
)