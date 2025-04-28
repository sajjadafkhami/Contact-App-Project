import React from "react";
import ReactDOM from "react-dom/client";
import { ContactProvider } from "./context/ContactContext";
import App from "./App";
import "./styles/App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContactProvider>
      <App />
    </ContactProvider>
  </React.StrictMode>
);
