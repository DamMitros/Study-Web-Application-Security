"use client";

import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";

export default function KeycloakProvider({ children }) {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      {children}
    </ReactKeycloakProvider>
  );
}