import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PatientQR from './PatientQR';


const PatientCard = ({ patient }) => {
  const cardRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => cardRef.current,
  });

  return (
    <div ref={cardRef} className="p-6 bg-white shadow-md rounded-lg flex items-center justify-between max-w-3xl mx-auto">
      {/* Patient Photo */}
      {/* <div className="flex items-center">
        {patient.photo ? (
          <img
            src={patient.photo}
            alt={`${patient.name}'s photo`}
            className="w-32 h-32 object-cover rounded-full border"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-500">No photo available</span>
          </div>
        )}
      </div> */}

      {/* Patient Details */}
      <div className="flex-1 mx-6">
        <h2 className="text-2xl font-semibold">{patient.name}</h2>
        <p><strong>Age:</strong> {patient.age || 'N/A'}</p>
        <p><strong>Gender:</strong> {patient.gender || 'N/A'}</p>
        <p><strong>City:</strong> {patient.city || 'N/A'}</p>
      </div>

      {/* QR Code */}
      <div className="flex items-center justify-center">
        {patient && <PatientQR patientId={patient._id} />}
      </div>

      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="mt-4 ml-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Print   
      </button>
    </div>
  );
};

export default PatientCard;
