import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./app/layout/assets/css/style.css";
// import './index.css';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "react-toastify/dist/ReactToastify.min.css";
// import "./app/layout/assets/lib/slick/slick.css";
// import "./app/layout/assets/lib/slick/slick-theme.css";


export const history = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router history={history}>
    <App />
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
