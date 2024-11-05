import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPublicPatientById } from '../api/patientService';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';

const PublicPatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const componentRef = useRef(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const data = await getPublicPatientById(id);
        setPatient(data);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.status === 404
            ? 'Patient not found.'
            : 'Error fetching patient details'
        );
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  const downloadPDF = () => {
    const input = componentRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save('patient-details.pdf');
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div ref={componentRef}>
      {patient ? (
        <>
          {/* General Information Table */}
          <TableContainer component={Paper} className="p-4 mb-6">
            <Typography variant="h6" gutterBottom>Patient Information</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>Field</strong></TableCell>
                  <TableCell className="border border-gray-400"><strong>Details</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>Name:</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.name || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>Age:</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.age || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>Gender:</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.gender || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>Aadhar Number:</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.aadharNumber || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>Date of Birth:</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.dateOfBirth || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>City:</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.city || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>State:</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.state || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>Country:</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.country || 'N/A'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {/* Tests and Measurements  */}
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
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>Hemoglobin</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.hemoglobin?.value || 'N/A'}</TableCell>
                  <TableCell className="border border-gray-400">{patient.hemoglobin?.unit || ''}</TableCell>
                  <TableCell className="border border-gray-400">{patient.hemoglobin?.range || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>Blood Group:</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.bloodGroup?.value || 'N/A'}</TableCell>
                  <TableCell className="border border-gray-400">{patient.bloodGroup?.unit || ''}</TableCell>
                  <TableCell className="border border-gray-400">{patient.bloodGroup?.range || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>Blood Pressure:</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.bloodPressure?.value || 'N/A'}</TableCell>
                  <TableCell className="border border-gray-400">{patient.bloodPressure?.unit || ''}</TableCell>
                  <TableCell className="border border-gray-400">{patient.bloodPressure?.range || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>Heart Rate</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.heartRate?.value || 'N/A'}</TableCell>
                  <TableCell className="border border-gray-400">{patient.heartRate?.unit || ''}</TableCell>
                  <TableCell className="border border-gray-400">{patient.heartRate?.range || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>Weight</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.weight?.value || 'N/A'}</TableCell>
                  <TableCell className="border border-gray-400">{patient.weight?.unit || ''}</TableCell>
                  <TableCell className="border border-gray-400">{patient.weight?.range || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>Fasting Blood Sugar:</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.fastingBloodSugar?.value || 'N/A'}</TableCell>
                  <TableCell className="border border-gray-400">{patient.fastingBloodSugar?.unit || ''}</TableCell>
                  <TableCell className="border border-gray-400">{patient.fastingBloodSugar?.range || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>CBC:</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.cbc?.value || 'N/A'}</TableCell>
                  <TableCell className="border border-gray-400">{patient.cbc?.unit || ''}</TableCell>
                  <TableCell className="border border-gray-400">{patient.cbc?.range || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>Urinalysis:</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.urinalysis?.value || 'N/A'}</TableCell>
                  <TableCell className="border border-gray-400">{patient.urinalysis?.unit || ''}</TableCell>
                  <TableCell className="border border-gray-400">{patient.urinalysis?.range || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>Serum Electrolytes:</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.serumElectrolytes?.value || 'N/A'}</TableCell>
                  <TableCell className="border border-gray-400">{patient.serumElectrolytes?.unit || ''}</TableCell>
                  <TableCell className="border border-gray-400">{patient.serumElectrolytes?.range || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>Lipid Profile:</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.lipidProfile?.value || 'N/A'}</TableCell>
                  <TableCell className="border border-gray-400">{patient.lipidProfile?.unit || ''}</TableCell>
                  <TableCell className="border border-gray-400">{patient.lipidProfile?.range || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>TSH:</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.tsh?.value || 'N/A'}</TableCell>
                  <TableCell className="border border-gray-400">{patient.tsh?.unit || ''}</TableCell>
                  <TableCell className="border border-gray-400">{patient.tsh?.range || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>SGPT:</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.sgpt?.value || 'N/A'}</TableCell>
                  <TableCell className="border border-gray-400">{patient.sgpt?.unit || ''}</TableCell>
                  <TableCell className="border border-gray-400">{patient.sgpt?.range || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>Platelet Count</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.platelet?.value || 'N/A'}</TableCell>
                  <TableCell className="border border-gray-400">{patient.platelet?.unit || ''}</TableCell>
                  <TableCell className="border border-gray-400">{patient.platelet?.range || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>HIV:</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.hiv?.value || 'N/A'}</TableCell>
                  <TableCell className="border border-gray-400">{patient.hiv?.unit || ''}</TableCell>
                  <TableCell className="border border-gray-400">{patient.hiv?.range || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>Chronic Disease</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.chronicDisease?.value || 'N/A'}</TableCell>
                  <TableCell className="border border-gray-400">{patient.chronicDisease?.unit || ''}</TableCell>
                  <TableCell className="border border-gray-400">{patient.chronicDisease?.range || 'N/A'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {/* Medical Repots  */}
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
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>Current Medication:</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.medicalHistory?.currentMedication?.value || 'N/A'}</TableCell>
                  <TableCell className="border border-gray-400">{patient.medicalHistory?.currentMedication?.unit || ''}</TableCell>
                  <TableCell className="border border-gray-400">{patient.medicalHistory?.currentMedication?.range || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>Previous Condition:</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.medicalHistory?.previousCondition?.value || 'N/A'}</TableCell>
                  <TableCell className="border border-gray-400">{patient.medicalHistory?.previousCondition?.unit || ''}</TableCell>
                  <TableCell className="border border-gray-400">{patient.medicalHistory?.previousCondition?.range || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-400"><strong>Vaccination:</strong></TableCell>
                  <TableCell className="border border-gray-400">{patient.medicalHistory?.vaccination?.value || 'N/A'}</TableCell>
                  <TableCell className="border border-gray-400">{patient.medicalHistory?.vaccination?.unit || ''}</TableCell>
                  <TableCell className="border border-gray-400">{patient.medicalHistory?.vaccination?.range || 'N/A'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

          </TableContainer>
        </>
      ) : (
        <p>No patient details available</p>
      )}
      <div className='mb-10 ml-5'>
        <Button variant="contained" color="primary" onClick={downloadPDF} className="">
          Download as PDF
        </Button>
      </div>
    </div>
  );
};

export default PublicPatientDetails;
