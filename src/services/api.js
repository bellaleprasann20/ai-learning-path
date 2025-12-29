import axios from "axios";

// This will now use your Vercel variable + /api
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_URL,
});

export const generateRoadmap = async (formData) => {
  try {
    // If API_URL ends in /api, this hits /api/generate-roadmap
    const response = await apiClient.post("/generate-roadmap", formData);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Server connection failed");
  }
};