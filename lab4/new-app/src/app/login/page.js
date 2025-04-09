"use client";

import { useKeycloak } from "@react-keycloak/web";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { keycloak } = useKeycloak();
  const [error, setError] = useState(null);
  const router = useRouter();

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
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Authentication</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="text-center">
        {!keycloak.authenticated ? (
          <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition w-full">Log in with Keycloak</button>
        ) : (
          <div className="space-y-4">
            <p className="text-lg border-b pb-2">Logged in as <span className="font-semibold">{keycloak.tokenParsed?.preferred_username || "User"}</span></p>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md transition w-full">Log out</button>
            <button onClick={() => router.push('/')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-md transition w-full mt-2">Back to Home</button>
          </div>
        )}
      </div>
    </div>
  );
}