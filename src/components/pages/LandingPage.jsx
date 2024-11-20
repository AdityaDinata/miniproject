// src/pages/LandingPage.jsx
import React from "react";
import AppNavbar from "../layout/Navbar";
import { Link } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

const LandingPage = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 to-green-500">
      {/* Navbar */}
      <AppNavbar />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-4xl font-extrabold text-gray-800 md:text-6xl">
          Selamat Datang di Eco Smart
        </h1>
        <p className="mt-4 text-lg text-gray-600 md:text-xl">
          Tingkatkan kebiasaan harian Anda dengan rekomendasi berbasis AI!
        </p>
        {isLoggedIn ? (
          <Link to="/landing-pengguna" className="mt-6 text-blue-500 hover:text-blue-600">
            Mulai Sekarang
          </Link>
        ) : (
          <Link to="/login" className="mt-6 text-blue-500 hover:text-blue-600">
            Mulai Sekarang
          </Link>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
