"use client";

import { useKeycloak } from "@react-keycloak/web";
import { useState } from "react";

export default function HomePage() {
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
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-3xl font-bold mb-6">What you have in mind by JustCreativeApp?</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {!keycloak.authenticated ? (
          <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition">Log in</button>
        ) : (
          <div className="space-y-4">
            <p className="text-lg">
              Welcome, <span className="font-semibold">{keycloak.tokenParsed?.preferred_username || "User"}</span>
            </p>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md transition">Log out</button>
          </div>
        )}
      </div>
    </div>
  );
}