import axios from "axios";

// Single source of truth for the backend URL.
// Set VITE_API_URL in frontend/.env to point somewhere else; the default is
// the local Express server.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Automatically attach the JWT (if we have one) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;