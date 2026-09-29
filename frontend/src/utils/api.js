import axios from "axios";

// Single source of truth for the backend URL.
// For deployment, set VITE_API_URL in the frontend environment variables.

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Automatically attach the JWT if one exists.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;