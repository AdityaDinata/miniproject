// src/components/auth/LoginPage.jsx
import React, { useState } from "react";
import { Button, TextInput, Spinner } from 'flowbite-react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import { fetchUsers } from "../../services/api";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const users = await fetchUsers();
      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        login(user);
        navigate('/');
      } else {
        setError('Email atau password tidak valid');
      }
    } catch (error) {
      setError('Terjadi kesalahan saat login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 to-green-500 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login ke Eco Smart
        </h2>

        <form onSubmit={handleSubmit}>
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

          <div className="mb-6">
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

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <Button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600" 
            disabled={loading}
          >
            {loading ? <Spinner size="sm" light={true} /> : 'Login'}
          </Button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Tidak memiliki akun? <Link to="/register" className="text-blue-500">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
