import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage";
import LoginPage from "./components/loginPage";
import RegisterPage from "./components/registerPage";
import LandingPengguna from "./components/landingPengguna";
import SelectedHabitsPage from "./components/SelectedHabitsPage"; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Route for the Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Route for the Register Page */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signup" element={<RegisterPage />} />  {/* Alias for /register */}

        {/* Route for the LandingPengguna Page */}
        <Route path="/landing-pengguna" element={<LandingPengguna />} />  {/* Add this route */}

        {/* Route for the Selected Habits Page */}
        <Route path="/selected-habits" element={<SelectedHabitsPage />} />  {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;
