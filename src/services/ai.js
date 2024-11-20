// src/services/ai.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;  
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateRecommendations = async (habit) => {
    const prompt = `Berikan 5 rekomendasi gaya hidup sehat dan ramah lingkungan yang dapat diterapkan berdasarkan hal-hal berikut: ${habit}. Berikan setiap rekomendasi pada satu baris terpisah tanpa no.`;
  
    const result = await model.generateContent(prompt);
    const formattedText = result.response.text()
      .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove bold markdown
      .replace(/__(.*?)__/g, '$1')      // Remove italic markdown
  
    const recommendationsList = formattedText.split("\n").map((rec) => rec.trim()).filter((rec) => rec !== "");
  
    return recommendationsList;
  };
  