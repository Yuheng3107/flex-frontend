import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import App from "./App";
import "./theme/tailwind.css";
import store from "./store/store";
import { Provider } from "react-redux";

export default function Application() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId="908101547092-2cg5rblc0ppg7dvn8csk6l8p8ehc6crt.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Provider>
  );
}
