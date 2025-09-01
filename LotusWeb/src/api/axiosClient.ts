import axios from 'axios';
import { logout } from '../utils/authLogout';
import { refreshAccessToken } from '../services/tokenService';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add Authorization header
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});


// Response interceptor to handle 401 errors and refresh token
axiosClient.interceptors.response.use((response) => response, async (error) => {
  const originalRequest = error.config;
  const isUnauthorized = error.response?.status === 401;
  const hasRetried = originalRequest?.headers?.['X-Retry-Attempt'];

  // Has error 401 and not try refresh
  if (isUnauthorized && !hasRetried) {
    try {
      const newAccessToken = await refreshAccessToken();      

      localStorage.setItem('accessToken', newAccessToken);  // Save new access token

      originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
      originalRequest.headers['X-Retry-Attempt'] = '1';
      console.log('REFRESH SUCCESS! New accessToken:', newAccessToken); 
      return axiosClient(originalRequest);
    } catch (refreshError) {
      logout();
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
});

export default axiosClient;
