import axios from 'axios';

const api = axios.create(); // sin baseURL, los services usarán URLs completas

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
}, err => Promise.reject(err));

export default api;
