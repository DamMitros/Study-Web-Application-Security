import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from "react-router-dom";

function Admin() {
  const { keycloak } = useKeycloak();
  const isAdmin = keycloak.hasRealmRole("admin");
  
  if (!keycloak.authenticated) {
    return <Navigate to="/" />;
  }
  
  if (!isAdmin) {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Access Denied</h1>
          <p>You don't have administrator privileges.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>Administrator Panel</h1>
        <div className="admin-content">
          <h2>System Management</h2>
          <div className="admin-section">
            <h3>Users</h3>
            <button className="admin-button">Manage Users</button>
          </div>
          <div className="admin-section">
            <h3>Settings</h3>
            <button className="admin-button">System Configuration</button>
          </div>
          <div className="admin-section">
            <h3>Statistics</h3>
            <p>Active users: 42</p>
            <p>Last login: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;