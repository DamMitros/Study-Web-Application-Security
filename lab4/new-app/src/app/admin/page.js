"use client";

import { useKeycloak } from "@react-keycloak/web";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminPage() {
  const { keycloak } = useKeycloak();
  const router = useRouter();
  const isAdmin = keycloak?.authenticated && keycloak.hasRealmRole("admin");
  const [activeTab, setActiveTab] = useState("dashboard");

  // Redirect if not authenticated
  if (!keycloak?.authenticated) {
    router.push('/login');
    return null;
  }
  
  // Access denied if not admin
  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Access Denied</h1>
        <p className="mb-6">You dont have administrator privileges to access this page.</p>
        <button 
          onClick={() => router.push('/')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-md transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  // Demo data
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "User", lastLogin: "2023-10-12" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin", lastLogin: "2023-10-15" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor", lastLogin: "2023-10-10" },
  ];

  const stats = {
    totalUsers: 423,
    activeUsers: 128,
    newUsersToday: 12,
    avgSessionTime: "23m 14s"
  };

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b p-6">
          <h1 className="text-2xl font-bold">Administrator Dashboard</h1>
          <p className="text-gray-500">Welcome back, {keycloak.tokenParsed?.preferred_username || "Admin"}</p>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b">
          <button className={`px-6 py-3 font-medium ${activeTab === "dashboard" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`} onClick={() => setActiveTab("dashboard")}>Dashboard</button>
          <button className={`px-6 py-3 font-medium ${activeTab === "users" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`} onClick={() => setActiveTab("users")}>Users</button>
          <button className={`px-6 py-3 font-medium ${activeTab === "settings" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`} onClick={() => setActiveTab("settings")}>Settings</button>
        </div>
        
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="text-sm text-blue-600 font-medium">Total Users</h3>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="text-sm text-green-600 font-medium">Active Users</h3>
                <p className="text-2xl font-bold">{stats.activeUsers}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <h3 className="text-sm text-purple-600 font-medium">New Users Today</h3>
                <p className="text-2xl font-bold">{stats.newUsersToday}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <h3 className="text-sm text-orange-600 font-medium">Avg. Session Time</h3>
                <p className="text-2xl font-bold">{stats.avgSessionTime}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border mb-6">
              <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600">User John Doe logged in at 10:45 AM</li>
                <li className="text-sm text-gray-600">New user Jane Smith registered at 09:30 AM</li>
                <li className="text-sm text-gray-600">User Bob Johnson updated profile at 08:15 AM</li>
                <li className="text-sm text-gray-600">Admin user performed system backup at 00:00 AM</li>
              </ul>
            </div>
          </div>
        )}
        
        {/* Users */}
        {activeTab === "users" && (
          <div className="p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">User Management</h2>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm">Add New User</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border text-left">ID</th>
                    <th className="py-2 px-4 border text-left">Name</th>
                    <th className="py-2 px-4 border text-left">Email</th>
                    <th className="py-2 px-4 border text-left">Role</th>
                    <th className="py-2 px-4 border text-left">Last Login</th>
                    <th className="py-2 px-4 border text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border">{user.id}</td>
                      <td className="py-2 px-4 border">{user.name}</td>
                      <td className="py-2 px-4 border">{user.email}</td>
                      <td className="py-2 px-4 border">{user.role}</td>
                      <td className="py-2 px-4 border">{user.lastLogin}</td>
                      <td className="py-2 px-4 border">
                        <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                        <button className="text-red-500 hover:text-red-700">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Settings */}
        {activeTab === "settings" && (
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">System Configuration</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="font-medium mb-3">General Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-gray-700">Enable Public Registration</label>
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-gray-700">Email Notifications</label>
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-gray-700">Two-Factor Authentication</label>
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="font-medium mb-3">Maintenance</h3>
                <div className="space-y-3">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm">Backup Database</button>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm ml-2">Clear Cache</button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm ml-2">Purge Logs</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}