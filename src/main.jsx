import store from "./redux/store/store.js";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import React from "react";

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
