// src/api/axiosConfig.js
import axios from "axios";

// frontend/src/api/axiosConfig.js
const axiosInstance = axios.create({
  // Change 3000 to 3001
  baseURL: "http://localhost:3001/api/v1", 
  withCredentials: true,
});

// 🔑 CRITICAL FIX: Add a Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // 1. Retrieve the token from localStorage
    const token = localStorage.getItem('token'); 

    // 2. If the token exists, attach it to the Authorization header
    if (token) {
      config.headers = config.headers ?? {}; 
      config.headers.Authorization = `Bearer ${token}`; 
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;