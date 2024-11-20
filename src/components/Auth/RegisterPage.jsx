// src/components/auth/RegisterPage.jsx
import React, { useState } from "react";
import { Button, TextInput } from 'flowbite-react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from "../../services/api";

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi password
    if (password !== confirmPassword) {
      setError('Password tidak cocok');
      return;
    }

    setError('');

    try {
      const newUser = { name, email, password };
      await registerUser(newUser);
      alert('Registrasi berhasil! Silakan login.');
      navigate('/login');
    } catch (error) {
      setError('Terjadi kesalahan saat registrasi');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 to-green-500 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Register untuk Habit Tracker
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <TextInput
              id="name"
              type="text"
              placeholder="Nama lengkap Anda"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <TextInput
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <TextInput
              id="password"
              type="password"
              placeholder="********"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
            <TextInput
              id="confirmPassword"
              type="password"
              placeholder="********"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
            Register
          </Button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Sudah memiliki akun? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
