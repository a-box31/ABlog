import axios from 'axios';

export default axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
});