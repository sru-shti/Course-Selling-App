// src/api/axiosConfig.js
import axios from "axios";

const axiosInstance = axios.create({
  // Base URL is correct: http://localhost:3000/api/v1
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
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