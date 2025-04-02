import React, { useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Admin from "./pages/Admin";

function HomePage() {
  const { keycloak } = useKeycloak();
  const [error, setError] = useState(null);

  const handleLogin = () => {
    try {
      keycloak.login();
    } catch (err) {
      setError(`Login error: ${err.message}`);
      console.error(err);
    }
  };

  const handleLogout = () => {
    try {
      keycloak.logout();
    } catch (err) {
      setError(`Logout error: ${err.message}`);
      console.error(err);
    }
  };

  return (
    <div className="App-header">
      <h1>My Application</h1>

      {error && <div style={{ color: "red", margin: "10px 0" }}>{error}</div>}
      {!keycloak.authenticated ? (
        <button onClick={handleLogin} className="login-button">Log in</button>
      ) : (
        <div>
          <p>Welcome, {keycloak.tokenParsed?.preferred_username || "User"}</p>
          <button onClick={handleLogout} className="logout-button">Log out</button>
        </div>
      )}
    </div>
  );
}

function App() {
  const { keycloak } = useKeycloak();
  const location = useLocation();
  const isAdmin = keycloak.hasRealmRole && keycloak.hasRealmRole("admin");

  return (
    <div className="App">
      {keycloak.authenticated && (
        <nav className="nav-menu">
          <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>Home</Link>
          {isAdmin && (
            <Link to="/admin" className={`nav-link ${location.pathname === "/admin" ? "active" : ""}`}>Admin Panel</Link>
          )}
        </nav>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
