import axios from 'axios';
import { API_BASE_URL, API_KEY } from '@env';
import { useAppStore } from '@/store/useAppStore';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-API-Key': API_KEY,
  },
});

apiClient.interceptors.request.use(async (config) => {
  const token = useAppStore.getState().token;
  useAppStore.getState().setLoading(true);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  useAppStore.getState().setLoading(false);
  return Promise.reject(error);
});

apiClient.interceptors.response.use((response) => {
  useAppStore.getState().setLoading(false);
  return response;
}, (error) => {
  useAppStore.getState().setLoading(false);
  return Promise.reject(error);
});

export default apiClient;