// src/hooks/useHabits.js
import { useContext } from "react";
import HabitsContext from "../context/HabitsContext";

const useHabits = () => {
  return useContext(HabitsContext);
};

export default useHabits;
