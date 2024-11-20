import { Navbar } from 'flowbite-react';
import { useAuth } from './AuthContext';

function NavbarComponent({ handleLogout }) {
  const { isLoggedIn } = useAuth();

  return (
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
  );
}

export default NavbarComponent;
