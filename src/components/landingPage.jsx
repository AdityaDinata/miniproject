import { Navbar } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(!!loggedIn); // Check if the user is logged in
  }, []);

  const handleLogout = () => {
    // Remove login status from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId'); // Clear user-specific data
    setIsLoggedIn(false); // Update the state to reflect logout status
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 to-green-500">
      {/* Navbar */}
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand href="/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold">
            Eco Smart
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/selected-habits">Tracking</Navbar.Link>
          {isLoggedIn ? (
            <span
              onClick={handleLogout}
              className="cursor-pointer text-red-500 hover:underline"
            >
              Logout
            </span>
          ) : (
            <Navbar.Link href="/login">Login</Navbar.Link>
          )}
        </Navbar.Collapse>
      </Navbar>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-4xl font-extrabold text-gray-800 md:text-6xl">
          Selamat Datang di Eco Smart
        </h1>
        <p className="mt-4 text-lg text-gray-600 md:text-xl">
          Tingkatkan kebiasaan harian Anda dengan rekomendasi berbasis AI!
        </p>
        {isLoggedIn ? (
          <a href="/landing-pengguna" className="mt-6 text-blue-500 hover:text-blue-600">
            Mulai Sekarang
          </a>
        ) : (
          <a href="/login" className="mt-6 text-blue-500 hover:text-blue-600">
            Mulai Sekarang
          </a>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
