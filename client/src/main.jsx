import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import { Provider } from "react-redux";
import store from "./redux/store.js";
import App from "./App";

const container = document.getElementById("root"); // Get the root element
const root = createRoot(container); // Create the root

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
