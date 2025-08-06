import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { neobrutalism } from "@clerk/themes";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error(
    "VITE_CLERK_PUBLISHABLE_KEY is missing from your environment variables"
  );
}





ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
      }}
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
