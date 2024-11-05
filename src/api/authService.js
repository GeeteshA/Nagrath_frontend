import axios from 'axios';

const API_URL = 'https://nagrath-backend.onrender.com/api/auth';

// User login (Super Admin or Admin)
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error("Error during login:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Login failed. Please try again.");
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('user');
};

// Get current user from localStorage
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

