import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Nav from "./pages/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
/*  import "./css/style.css";   */

ReactDOM.render(
  <React.StrictMode><div>
    <App />  </div>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
