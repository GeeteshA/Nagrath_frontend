import axios from 'axios';

const API_URL = 'https://nagrath-backend.onrender.com/api/auth';

// Fetch all admins
export const getAdmins = async (token) => {
  const response = await axios.get(`${API_URL}/admins`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Create new Admin
export const createAdmin = async (adminData, token) => {
  const response = await axios.post(`${API_URL}/createAdmin`, adminData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete an Admin
export const deleteAdmin = async (adminId, token) => {
  const response = await axios.delete(`${API_URL}/admin/${adminId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get current admin profile
export const getAdminProfile = async (token) => {
  const response = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
