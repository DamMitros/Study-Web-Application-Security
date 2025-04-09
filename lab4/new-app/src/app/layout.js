import "./globals.css";
import KeycloakProvider from "./components/KeycloakProvider";
import Navigation from "./components/Navigation";

export const metadata = {
  title: "Next.js Authentication App",
  description: "Authentication with Keycloak in Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <KeycloakProvider>
          <Navigation />
          <main className="container mx-auto p-4">
            {children}
          </main>
        </KeycloakProvider>
      </body>
    </html>
  );
}