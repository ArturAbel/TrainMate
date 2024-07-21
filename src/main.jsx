import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.jsx";

import store from "./redux/store/store.js";
import { Provider } from "react-redux";

import "./css/utilities.css";
import "./css/variables.css";
import "./css/reset.css";
import "./css/index.css";
import "./css/fonts.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>
);
