import axios from 'axios';


const BASE_URL = `https://nagrath-backend.onrender.com/api/patients`;

// Search patients based on filters
export const searchPatients = async (token, searchParams = {}) => {
  try {
    const query = new URLSearchParams(searchParams).toString();
    const url = `${BASE_URL}/search${query ? `?${query}` : ''}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching for patients:', error.response?.data || error.message);
    throw error;
  }
};

// Fetch all patients
export const getPatients = async (token) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching patients:', error.response?.data || error.message);
    throw error;
  }
};

// Fetch public patient details (no authentication required)
export const getPublicPatientById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/public/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching public patient details:', error.response?.data || error.message);
    throw error;
  }
};


// Fetch a specific patient by ID
export const getPatientById = async (id, token) => {
  try {
    console.log("Fetching patient details...");
    const response = await axios.get(`${BASE_URL}/${id}`, {
      
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching patient:', error.response?.data || error.message);
    throw error;
  }
};

// Delete a patient
export const deletePatient = async (id, token) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error deleting patient:', error.response?.data || error.message);
    throw error;
  }
};

// Update an existing patient
export const updatePatient = async (id, patientData, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, patientData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating patient:', error.response?.data || error.message);
    throw error;
  }
};

// Create a new patient
export const createPatient = async (patientData, token) => {
  try {
    const response = await axios.post(BASE_URL, patientData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating patient:', error.response?.data || error.message);
    throw error;
  }
};

export const fetchQRCode = async (patientId, token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${patientId}/qrcode`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const qrData = response.data && response.data.qrCode
      ? response.data.qrCode.startsWith("data:image/png;base64,")
        ? response.data.qrCode
        : `data:image/png;base64,${response.data.qrCode}`
      : null;

    return qrData;
  } catch (error) {
    console.error("Error fetching QR code:", error);
    throw error; // Rethrow error to handle it in the component
  }
};

