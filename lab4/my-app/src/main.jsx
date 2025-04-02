import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { BrowserRouter } from "react-router-dom";
import keycloak from "./keycloak.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <ReactKeycloakProvider authClient={keycloak}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReactKeycloakProvider>
);
