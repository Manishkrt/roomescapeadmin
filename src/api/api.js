import axios from "axios";
// const baseUrl = "http://localhost:8000"
const baseUrl = "https://roomescapeserver.vercel.app"
// const baseUrl = "https://escape-backend.vercel.app"

const api = axios.create({
  baseURL: `${baseUrl}/api/v1`, // Replace with your API URL
  withCredentials: true, // Important for sending cookies
});

export default api;
 