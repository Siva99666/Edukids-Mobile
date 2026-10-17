import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Default to deployed Railway backend or local IP
// Users can customize this in the mobile app settings if desired
export const DEFAULT_API_URL = 'http://10.0.2.2:5000/api'; // Android emulator localhost alias
export const STORAGE_KEYS = {
  TOKEN: 'edukids_mobile_token',
  USER: 'edukids_mobile_user',
  API_URL: 'edukids_mobile_api_url',
};

const api = axios.create({
  baseURL: DEFAULT_API_URL,
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(async (config) => {
  try {
    const customUrl = await AsyncStorage.getItem(STORAGE_KEYS.API_URL);
    if (customUrl) {
      config.baseURL = customUrl;
    }
    const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    console.warn('Interceptor storage error:', err);
  }
  return config;
});

// Response error handler
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const msg = error.response?.data?.error || error.message || 'Network request failed';
    return Promise.reject(new Error(msg));
  }
);

export default api;
