import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePatient, getPatientById } from '../api/patientService';
import { FaUserEdit, FaTrash } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';
import SuperAdminLayout from './Layouts/SuperAdminLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import PatientCard from './PatientCard';

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const componentRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser?.token) {
          const token = storedUser.token;
          const data = await getPatientById(id, token);
          setPatient(data);
        } else {
          throw new Error('No token found');
        }
      } catch (error) {
        console.error('Error fetching patient:', error);
        setError('Failed to load patient details');
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  const renderField = (field) => field || 'N/A';

  const renderTestRow = (label, test) => (
    <TableRow key={label}>
      <TableCell className="border border-gray-400"><strong>{label}:</strong></TableCell>
      <TableCell className="border border-gray-400">{renderField(test?.value)}</TableCell>
      <TableCell className="border border-gray-400">{renderField(test?.range)}</TableCell>
      <TableCell className="border border-gray-400">{renderField(test?.unit)}</TableCell>
    </TableRow>
  );

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const handleDelete = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem('user')).token;
      await deletePatient(id, token);
      navigate('/admin/patients'); // Redirect to patient list after deletion
    } catch (error) {
      console.error("Error deleting patient:", error);
      setError("Failed to delete patient");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-xl">Loading patient details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <SuperAdminLayout>

      {/* Patient Card */}
    <div>
        <div ref={componentRef}>
        <PatientCard patient={patient} />
      </div>
        {/* <button onClick={handlePrint}>Print Patient Card</button> */}
      </div>

      {/* General Information Table */}
      <TableContainer component={Paper} className="p-4 mb-6 mt-5">
        <Typography variant="h6" gutterBottom>Patient Information</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="border border-gray-400"><strong>Field</strong></TableCell>
              <TableCell className="border border-gray-400"><strong>Details</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              { label: 'Name', value: patient.name },
              { label: 'Age', value: patient.age },
              { label: 'Gender', value: patient.gender },
              { label: 'Date of Birth', value: patient.dateOfBirth },
              { label: 'Mobile', value: patient.mobile },
              { label: 'Aadhar Number', value: patient.aadharNumber },
              { label: 'Address', value: patient.address },
              { label: 'City', value: patient.city },
              { label: 'Pincode', value: patient.pincode },
              { label: 'District', value: patient.district },
              { label: 'State', value: patient.state },
              { label: 'Country', value: patient.country },
            ].map(({ label, value }, index) => (
              <TableRow key={index}>
                <TableCell className="border border-gray-400"><strong>{label}:</strong></TableCell>
                <TableCell className="border border-gray-400">{renderField(value)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Tests and Measurements Table */}
      <TableContainer component={Paper} className="p-4 mb-6">
        <Typography variant="h6" gutterBottom>Tests and Measurements</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="border border-gray-400"><strong>Test</strong></TableCell>
              <TableCell className="border border-gray-400"><strong>Value</strong></TableCell>
              <TableCell className="border border-gray-400"><strong>Range</strong></TableCell>
              <TableCell className="border border-gray-400"><strong>Unit</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderTestRow("Blood Pressure", patient.bloodPressure)}
            {renderTestRow("Heart Rate", patient.heartRate)}
            {renderTestRow("Weight", patient.weight)}
            {renderTestRow("Hemoglobin", patient.hemoglobin)}
            {renderTestRow("Blood Group", patient.bloodGroup)}
            {renderTestRow("Fasting Blood Sugar", patient.fastingBloodSugar)}
            {renderTestRow("CBC", patient.cbc)}
            {renderTestRow("Urinalysis", patient.urinalysis)}
            {renderTestRow("Serum Electrolytes", patient.serumElectrolytes)}
            {renderTestRow("Lipid Profile", patient.lipidProfile)}
            {renderTestRow("TSH", patient.tsh)}
            {renderTestRow("SGPT", patient.sgpt)}
            {renderTestRow("Platelet Count", patient.platelet)}
            {renderTestRow("HIV", patient.hiv)}
            {renderTestRow("Chronic Disease", patient.chronicDisease)}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Medical History Table */}
      <TableContainer component={Paper} className="p-4 mb-6">
        <Typography variant="h6" gutterBottom>Medical History</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="border border-gray-400"><strong>Category</strong></TableCell>
              <TableCell className="border border-gray-400"><strong>Value</strong></TableCell>
              <TableCell className="border border-gray-400"><strong>Range</strong></TableCell>
              <TableCell className="border border-gray-400"><strong>Unit</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderTestRow("Current Medication", patient.medicalHistory?.currentMedication)}
            {renderTestRow("Previous Condition", patient.medicalHistory?.previousCondition)}
            {renderTestRow("Vaccination", patient.medicalHistory?.vaccination)}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="flex gap-5 px-10 pb-5 justify-end">
        <button
          onClick={() => navigate(`/admin/patients/${patient._id}/edit`)}
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <FaUserEdit className="mr-2" /> Edit
        </button>
        <button
          onClick={() => handleDelete(patient._id)}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          <FaTrash className="mr-2" /> Delete
        </button>
      </div>



      {/* Document photos */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Document Files</h3>
        <div className="grid grid-cols-2 gap-4">
          {Array.isArray(patient.documentFile) && patient.documentFile.length > 0 ? (
            patient.documentFile.map((doc, index) => (
              <img
                key={index}
                src={`data:${doc.contentType};base64,${Buffer.from(doc.data).toString('base64')}`}
                alt={`Document ${index + 1}`}
                className="w-32 h-32 object-cover rounded-lg border"
              />
            ))
          ) : patient.documentFile && patient.documentFile.data ? (
            <img
              src={`data:${patient.documentFile.contentType};base64,${Buffer.from(patient.documentFile.data).toString('base64')}`}
              alt="Document File"
              className="w-32 h-32 object-cover rounded-lg border"
            />
          ) : (
            <p className="text-gray-500">No document files available</p>
          )}
        </div>
      </div>

    </SuperAdminLayout>
  );
};

export default PatientDetails;
