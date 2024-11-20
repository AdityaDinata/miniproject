// src/components/layout/Navbar.jsx
import { Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

const AppNavbar = () => {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand as={Link} to="/">
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
        <Navbar.Link as={Link} to="/selected-habits">Tracking</Navbar.Link>
        {isLoggedIn ? (
          <span
            onClick={handleLogout}
            className="cursor-pointer text-red-500 hover:underline"
          >
            Logout
          </span>
        ) : (
          <Navbar.Link as={Link} to="/login">Login</Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
