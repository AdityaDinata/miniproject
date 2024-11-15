import { Navbar, Button } from 'flowbite-react';

function LandingPage() {
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
            Habit Tracker
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/login">Login</Navbar.Link>
          <Navbar.Link href="/habits">Tracking</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-4xl font-extrabold text-gray-800 md:text-6xl">
          Selamat Datang di Habit Tracker
        </h1>
        <p className="mt-4 text-lg text-gray-600 md:text-xl">
          Tingkatkan kebiasaan harian Anda dengan rekomendasi berbasis AI!
        </p>
        <Button href="/login" className="mt-6 bg-blue-500 hover:bg-blue-600">
          Mulai Sekarang
        </Button>
      </div>
    </div>
  );
}

export default LandingPage;
