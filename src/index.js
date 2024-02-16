import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./store";
import { GoogleOAuthProvider } from "@react-oauth/google";

//if using bulma or sass, may need to change the styles path above to reflect.

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={`${process.env.GOOGLE_ID}`}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </BrowserRouter>
);
