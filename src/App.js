// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import ActivityPage from "./pages/ActivityPage";
import DietPage from "./pages/DietPage";
import ProgressPage from "./pages/ProgressPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <Navbar isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />

        <div className="p-8">
          <Routes>
            {!isLoggedIn ? (
              <>
                <Route
                  path="/login"
                  element={<LoginPage setShowRegister={setShowRegister} setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route
                  path="/register"
                  element={<RegisterPage setShowRegister={setShowRegister} setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route path="*" element={<Navigate to={showRegister ? "/register" : "/login"} replace />} />
              </>
            ) : (
              <>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/activity" element={<ActivityPage />} />
                <Route path="/diet" element={<DietPage />} />
                <Route path="/progress" element={<ProgressPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
