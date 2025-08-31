import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // We'll set this on Netlify
  withCredentials: true, // if using cookie-based auth
});

export default api;