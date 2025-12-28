import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_URL,
  // REMOVED: Fixed headers. Axios adds them automatically for FormData.
});

export const generateRoadmap = async (formData) => {
  try {
    // Ensure we are hitting the exact endpoint defined in aiRoutes.js
    const response = await apiClient.post("/generate-roadmap", formData);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Server connection failed");
  }
};