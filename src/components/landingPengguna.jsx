import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextInput, Checkbox } from "flowbite-react";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import the Gemini AI package

const LandingPengguna = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [habit, setHabit] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [selectedHabits, setSelectedHabits] = useState([]);

  // Fetch Gemini AI instance
  const API_KEY = "AIzaSyBYVeFBuhSF_0_9PMgut6miTYJzg9P12FI"; // Replace with your actual API key
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  useEffect(() => {
    // Check if the user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) {
      navigate("/login"); // Redirect to login page if not logged in
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  // Handle the form submission
  const handleSubmitHabit = async (e) => {
    e.preventDefault();
    const prompt = `Berikan 5 rekomendasi gaya hidup sehat dan ramah lingkungan yang dapat diterapkan berdasarkan hal-hal berikut: ${habit}. Berikan setiap rekomendasi pada satu baris terpisah tanpa no.`;

    try {
      // Call Gemini AI to generate recommendations
      const result = await model.generateContent(prompt);

      // Get raw response text without HTML tags or markdown
      const formattedText = result.response.text()
        .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove bold markdown
        .replace(/__(.*?)__/g, '$1');  // Remove italic markdown

      // Split the formatted text into an array of recommendations (each recommendation is assumed to be on a new line)
      const recommendationsList = formattedText.split("\n").map((rec) => rec.trim()).filter((rec) => rec !== "");

      // Set the recommendations
      setRecommendations(recommendationsList);
    } catch (error) {
      console.error("Error generating recommendations:", error);
    }
  };

  // Handle habit selection for confirmation
  const handleSelectHabit = (e) => {
    const habitName = e.target.value;
    setSelectedHabits((prevState) =>
      prevState.includes(habitName)
        ? prevState.filter((h) => h !== habitName)
        : [...prevState, habitName]
    );
  };

  // Save selected habits to the API
  const saveSelectedHabits = async () => {
    const userId = localStorage.getItem("userId");

    // Make sure the user is logged in and has selected habits
    if (!userId || selectedHabits.length === 0) {
      console.error("No user ID or no selected habits.");
      return;
    }

    // Prepare habit object for each selected habit to be saved
    const habitsToSave = selectedHabits.map((habit, index) => ({
      habit_name: habit,         // Habit name
      id: (index + 1).toString(),  // Generate a simple unique ID
      userId: userId,             // Use the logged-in user ID
      status: "belum selesai",     // Automatically set status to 'belum selesai'
    }));

    // Log the prepared habits to check their structure
    console.log("Prepared habits to save:", habitsToSave);

    try {
      // Loop through each habit and send it one by one
      for (const habit of habitsToSave) {
        const response = await fetch(`https://673617b15995834c8a9565e6.mockapi.io/users/${userId}/habits`, {
          method: "POST",  // Using POST to add new habits
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(habit),  // Send each habit object without "description"
        });

        const responseData = await response.json();
        console.log("Response Status:", response.status);
        console.log("Response Body:", responseData);

        // If the response is not OK, throw an error
        if (!response.ok) {
          throw new Error(`Failed to save habit: ${responseData.message || 'Unknown error'}`);
        }
      }

      // If all habits are saved successfully, show alert and navigate
      alert("Semua kebiasaan berhasil disimpan!");
      navigate("/selected-habits");

    } catch (error) {
      console.error("Error saving habits:", error);
      alert("Terjadi kesalahan saat menyimpan kebiasaan.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 to-green-500 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Masukkan Kebiasaan Anda
        </h2>

        <form onSubmit={handleSubmitHabit}>
          <div className="mb-4">
            <label htmlFor="habit" className="block text-gray-700">
              Kebiasaan Anda
            </label>
            <TextInput
              id="habit"
              type="text"
              placeholder="Masukkan kebiasaan Anda (misalnya: berolahraga)"
              required
              value={habit}
              onChange={(e) => setHabit(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
            Dapatkan Rekomendasi
          </Button>
        </form>

        {recommendations.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Rekomendasi Kebiasaan
            </h3>
            <div className="text-gray-700 mb-4">
              <p>
                Berikut adalah beberapa rekomendasi gaya hidup sehat dan ramah lingkungan yang dapat diterapkan berdasarkan kebiasaan yang Anda masukkan:
              </p>
              <ul className="list-disc ml-6">
                {recommendations.slice(0, 5).map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
            <form>
              <div className="text-gray-700 font-semibold mb-2">Pilih Kebiasaan yang Ingin Dikonfirmasi:</div>
              {recommendations.slice(0, 5).map((rec, index) => (  // Show the first recommendation too
                <div key={index} className="flex items-center mb-2">
                  <Checkbox
                    id={`habit-${index}`}
                    value={rec}
                    onChange={handleSelectHabit}
                    checked={selectedHabits.includes(rec)}
                  />
                  <label htmlFor={`habit-${index}`} className="ml-2 text-gray-700">
                    {rec}
                  </label>
                </div>
              ))}
            </form>
            <Button
              className="w-full bg-green-500 hover:bg-green-600 mt-4"
              onClick={saveSelectedHabits}  // Call the save function
            >
              Konfirmasi Kebiasaan Terpilih
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPengguna;
