import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { HabitsProvider } from "./context/HabitsContext";
import PrivateRoute from "./components/Auth/PrivateRoute";
import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/Auth/LoginPage";
import RegisterPage from "./components/Auth/RegisterPage";
import LandingPengguna from "./components/habits/LandingPengguna";
import SelectedHabitsPage from "./components/habits/SelectedHabitsPage";
import AppFooter from "./components/layout/Footer"; // Import Footer

function App() {
  return (
    <AuthProvider>
      <HabitsProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
              {/* Routes */}
              <Routes>
                {/* Route untuk Landing Page */}
                <Route path="/" element={<LandingPage />} />

                {/* Route untuk Login Page */}
                <Route path="/login" element={<LoginPage />} />

                {/* Route untuk Register Page */}
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/signup" element={<RegisterPage />} /> {/* Alias untuk /register */}

                {/* Route untuk LandingPengguna Page dengan PrivateRoute */}
                <Route
                  path="/landing-pengguna"
                  element={
                    <PrivateRoute>
                      <LandingPengguna />
                    </PrivateRoute>
                  }
                />

                {/* Route untuk SelectedHabitsPage dengan PrivateRoute */}
                <Route
                  path="/selected-habits"
                  element={
                    <PrivateRoute>
                      <SelectedHabitsPage />
                    </PrivateRoute>
                  }
                />

                {/* Route untuk Error Page (Optional) */}
                <Route path="*" element={<div>404 Not Found</div>} />
              </Routes>
            </div>

            {/* Footer */}
            <AppFooter />
          </div>
        </Router>
      </HabitsProvider>
    </AuthProvider>
  );
}

export default App;
