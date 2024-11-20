// src/components/habits/LandingPengguna.jsx
import React, { useState } from "react";
import { Button, TextInput, Spinner } from 'flowbite-react';
import { useNavigate } from "react-router-dom";
import useHabits from "../../hooks/useHabits";
import { generateRecommendations } from "../../services/ai";
import { saveUserHabit } from "../../services/api";
import AppNavbar from "../layout/Navbar";

const LandingPengguna = () => {
  const navigate = useNavigate();
  const { addHabit } = useHabits();
  const [habit, setHabit] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [selectedHabits, setSelectedHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmitHabit = async (e) => {
    e.preventDefault();
    if (!habit.trim()) {
      setError("Kebiasaan tidak boleh kosong");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const recs = await generateRecommendations(habit);
      setRecommendations(recs);
    } catch (err) {
      console.error("Error generating recommendations:", err);
      setError("Gagal mendapatkan rekomendasi");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHabit = (e) => {
    const habitName = e.target.value;
    setSelectedHabits((prev) =>
      prev.includes(habitName)
        ? prev.filter((h) => h !== habitName)
        : [...prev, habitName]
    );
  };

  const saveSelectedHabitsToAPI = async () => {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    if (!userId || selectedHabits.length === 0) {
      alert("Tidak ada kebiasaan yang dipilih atau pengguna tidak terautentikasi");
      return;
    }

    setLoading(true);
    try {
      const habitPromises = selectedHabits.map((habitName, index) => {
        const newHabit = {
          habit_name: habitName,
          id: (index + 1).toString(),
          userId: userId,
          status: "belum selesai",
        };
        return saveUserHabit(userId, newHabit);
      });

      await Promise.all(habitPromises);
      alert("Semua kebiasaan berhasil disimpan!");
      navigate("/selected-habits");
    } catch (err) {
      console.error("Error saving habits:", err);
      alert("Terjadi kesalahan saat menyimpan kebiasaan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 to-green-500">
      <AppNavbar />
      <div className="flex flex-col items-center justify-center text-center py-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Masukkan Kebiasaan Anda
        </h2>

        <form onSubmit={handleSubmitHabit} className="w-full max-w-md">
          <TextInput
            id="habit"
            type="text"
            placeholder="Masukkan kebiasaan Anda (misalnya: berolahraga)"
            required
            value={habit}
            onChange={(e) => setHabit(e.target.value)}
            className="mb-4"
          />
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={loading}>
            {loading ? <Spinner size="sm" light={true} /> : 'Dapatkan Rekomendasi'}
          </Button>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {recommendations.length > 0 && (
          <div className="mt-6 w-full max-w-2xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Rekomendasi Kebiasaan
            </h3>
            <ul className="list-disc ml-6 text-gray-700">
              {recommendations.slice(0, 5).map((rec, index) => (
                <li key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`habit-${index}`}
                    value={rec}
                    onChange={handleSelectHabit}
                    className="mr-2"
                  />
                </li>
              ))}
            </ul>
            <Button
              className="w-full bg-green-500 hover:bg-green-600 mt-4"
              onClick={saveSelectedHabitsToAPI}
              disabled={loading}
            >
              {loading ? <Spinner size="sm" light={true} /> : 'Konfirmasi Kebiasaan Terpilih'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPengguna;
