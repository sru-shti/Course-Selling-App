// frontend/src/api/axiosConfig.js
import axios from "axios";

const axiosInstance = axios.create({

  baseURL:  "https://course-selling-platform-learnnova.onrender.com/api/v1",
   //"http://localhost:3001/api/v1", // Make sure this matches your backend port!
  withCredentials: true,
});

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