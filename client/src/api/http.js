import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 15000
});

export async function safeGet(path, fallback = null) {
  try {
    const response = await api.get(path);
    return response.data;
  } catch (error) {
    return fallback;
  }
}

export { api };
