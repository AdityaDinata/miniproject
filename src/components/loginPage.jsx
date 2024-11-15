import { useState } from "react";
import { Button, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom'; // For navigation

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    try {
      // Fetch all users
      const response = await fetch('https://673617b15995834c8a9565e6.mockapi.io/users');
      const users = await response.json();

      // Check if user exists and password matches
      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        // Store userId and login status in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', user.id);  // Save userId to localStorage
        // Redirect to the landing page
        navigate('/landing-pengguna');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred during login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 to-green-500 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login to Habit Tracker
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

          {error && <p className="text-red-500 text-center">{error}</p>}

          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
            Login
          </Button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
