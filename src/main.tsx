import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.tsx";
import { Toaster } from "sonner";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="335970622446-fmad2vt6p80hhmjqgu8evh9tcs9letnl.apps.googleusercontent.com">
      <Toaster richColors position="top-right" />
      <App />
    </GoogleOAuthProvider>
    ;
  </React.StrictMode>
);
