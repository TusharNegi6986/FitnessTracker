// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">FitTrack</h1>

      <div className="space-x-6 flex items-center">
        {isLoggedIn ? (
          <>
            <Link to="/" className="hover:text-yellow-300">Dashboard</Link>
            <Link to="/activity" className="hover:text-yellow-300">Activity</Link>
            <Link to="/diet" className="hover:text-yellow-300">Diet</Link>
            <Link to="/progress" className="hover:text-yellow-300">Progress</Link>
            <Link to="/profile" className="hover:text-yellow-300">Profile</Link>
            <button
              onClick={onLogout}
              className="ml-4 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:text-yellow-300">Login</Link>
        )}
      </div>
    </nav>
  );
}
