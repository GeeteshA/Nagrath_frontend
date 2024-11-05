import React, { useEffect, useState } from 'react';
import { fetchQRCode } from '../api/patientService';

const PatientQR = ({ patientId }) => {
  const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQRCode = async () => {
      if (!patientId) {
        setError("Patient ID is missing");
        setLoading(false);
        return;
      }

      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = storedUser?.token;

        if (!token) {
          setError("Authorization token not found");
          setLoading(false);
          return;
        }

        // Fetch the QR code data for the patient
        const qrData = await fetchQRCode(patientId, token);

        if (qrData) {
          setQrCode(qrData);
        } else {
          setError("QR code not available in response data");
        }
      } catch (error) {
        console.error("Error fetching QR code:", error);
        setError("Failed to load QR code");
      } finally {
        setLoading(false);
      }
    };

    loadQRCode();
  }, [patientId]);

  if (loading) return <p>Loading QR code...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h4>Patient QR Code</h4>
      {qrCode ? (
        <img src={qrCode} alt="Patient's QR Code" className="w-32 h-32 object-cover" />
      ) : (
        <p className="text-red-600">QR code unavailable</p>
      )}
    </div>
  );
};

export default PatientQR;
