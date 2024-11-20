// src/pages/LandingPage.jsx
import React from "react";
import AppNavbar from "../layout/Navbar";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/outline";

const LandingPage = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-green-700">
      {/* Navbar */}
      <AppNavbar />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-20 px-6 md:px-12">
        <h1 className="text-4xl font-extrabold text-white leading-tight md:text-6xl">
          Selamat Datang di <span className="text-blue-600">Eco Smart</span>
        </h1>
        <p className="mt-4 text-lg text-white opacity-90 md:text-xl">
          Tingkatkan kebiasaan harian Anda dengan rekomendasi berbasis AI!
        </p>

        {/* Features Section */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
            <CheckCircleIcon className="w-12 h-12 text-green-500" />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">
              Berbasis AI
            </h3>
            <p className="text-sm text-gray-600 text-center">
              Sistem kami menggunakan AI canggih untuk memberi Anda rekomendasi terbaik.
            </p>
          </div>
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
            <CheckCircleIcon className="w-12 h-12 text-green-500" />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">
              Hemat Waktu
            </h3>
            <p className="text-sm text-gray-600 text-center">
              Dapatkan kebiasaan yang cocok dengan cepat dan mudah.
            </p>
          </div>
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
            <CheckCircleIcon className="w-12 h-12 text-green-500" />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">
              Mudah Digunakan
            </h3>
            <p className="text-sm text-gray-600 text-center">
              Interface ramah pengguna yang dapat diakses oleh siapa saja.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        {isLoggedIn ? (
          <Link
            to="/landing-pengguna"
            className="mt-8 inline-flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105"
          >
            Mulai Sekarang <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        ) : (
          <Link
            to="/login"
            className="mt-8 inline-flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105"
          >
            Mulai Sekarang <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        )}
      </div>

    </div>
  );
};

export default LandingPage;
