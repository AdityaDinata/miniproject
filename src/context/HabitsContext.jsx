// src/context/HabitsContext.jsx
import React, { createContext, useState } from "react";

const HabitsContext = createContext();

export const HabitsProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);

  const addHabit = (habit) => setHabits((prev) => [...prev, habit]);
  const updateHabit = (id, updatedData) =>
    setHabits((prev) =>
      prev.map((habit) => (habit.id === id ? { ...habit, ...updatedData } : habit))
    );
  const setAllHabits = (habitsData) => setHabits(habitsData);

  return (
    <HabitsContext.Provider value={{ habits, addHabit, updateHabit, setAllHabits }}>
      {children}
    </HabitsContext.Provider>
  );
};

export default HabitsContext;
