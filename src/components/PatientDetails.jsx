import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatientById, updatePatient } from '../api/patientService';
import SuperAdminLayout from './Layouts/SuperAdminLayout';

const UpdatePatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    mobile: '',
    address: '',
    addressLine1: '',
    pincode: '',
    gender: '',
    dateOfBirth: '',
    aadharNumber: '',
    city: '',
    district: '',
    state: '',
    country: '',
    photo: '',
    bloodPressure: { value: '', range: '', unit: '' },
    heartRate: { value: '', range: '', unit: '' },
    hemoglobin: { value: '', range: '', unit: '' },
    fastingBloodSugar: { value: '', range: '', unit: '' },
    medicalHistory: {
      currentMedication: { value: '', range: '', unit: '' },
      previousCondition: { value: '', range: '', unit: '' },
      vaccination: { value: '', range: '', unit: '' }
    }
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const patientData = await getPatientById(id, token);
        setFormData({
          ...formData,
          ...patientData,
          dateOfBirth: patientData.dateOfBirth?.split('T')[0] || '',
          hemoglobin: patientData.hemoglobin || { value: '', range: '', unit: '' },
          bloodPressure: patientData.bloodPressure || { value: '', range: '', unit: '' },
          heartRate: patientData.heartRate || { value: '', range: '', unit: '' },
          fastingBloodSugar: patientData.fastingBloodSugar || { value: '', range: '70-100', unit: 'mg/dL' }, 
          calcium: patientData.calcium || { value: '', range: '', unit: '' }, 
          medicalHistory: {
            currentMedication: patientData.medicalHistory?.currentMedication || { value: '', range: '', unit: '' },
            previousCondition: patientData.medicalHistory?.previousCondition || { value: '', range: '', unit: '' },
            vaccination: patientData.medicalHistory?.vaccination || { value: '', range: '', unit: '' }
          }
        });
      } catch (err) {
        console.error('Error fetching patient details:', err);
        setError('Error fetching patient details');
      }
    };
    fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nameParts = name.split('.');
    if (nameParts.length === 2) {
      setFormData((prevData) => ({
        ...prevData,
        [nameParts[0]]: {
          ...prevData[nameParts[0]],
          [nameParts[1]]: value
        }
      }));
    } else if (nameParts.length === 3) {
      setFormData((prevData) => ({
        ...prevData,
        [nameParts[0]]: {
          ...prevData[nameParts[0]],
          [nameParts[1]]: {
            ...prevData[nameParts[0]][nameParts[1]],
            [nameParts[2]]: value
          }
        }
      }));
    } else {
      setFormData({ ...formData, [name]: value || '' });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, photo: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem('user')).token;
      await updatePatient(id, formData, token);
      setSuccess('Patient updated successfully');
      navigate('/admin/patients');
    } catch (err) {
      console.error('Error updating patient:', err);
      setError('Error updating patient');
    }
  };

  return (
    <SuperAdminLayout>
      <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto mt-6 mb-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Update Patient</h1>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* General Information Fields */}
            {['name', 'age', 'mobile', 'bloodGroup', 'address', 'addressLine1', 'pincode', 'gender', 'dateOfBirth', 'aadharNumber', 'city', 'district', 'state', 'country'].map((field) => (
              <input
                key={field}
                type={field === 'age' || field === 'pincode' ? 'number' : field === 'dateOfBirth' ? 'date' : 'text' ? 'bloodGroup' : 'text' }
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                required
                className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-[#ff6015]"
              />
            ))}
          </div>

          {/* Photo Upload and Preview */}
          <div className="mt-4">
            {formData.photo && typeof formData.photo === 'string' && (
              <img src={`data:image/jpeg;base64,${formData.photo}`} alt="Patient" className="mb-2 rounded-lg w-24 h-24 object-cover" />
            )}
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#302C51] file:text-white hover:file:bg-[#ff471a]"
            />
          </div>

          {/* Medical Reports Table */}
          <div className="overflow-auto">
            <table className="w-full border border-gray-300 mt-4 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border border-gray-300">Name of Test</th>
                  <th className="p-2 border border-gray-300">Observed Value</th>
                  <th className="p-2 border border-gray-300">Unit</th>
                  <th className="p-2 border border-gray-300">Normal Range</th>
                </tr>
              </thead>
              <tbody>
                {['hemoglobin', 'bloodPressure', 'heartRate', 'fastingBloodSugar' , 'calcium' ].map((test) => (
                  <tr key={test}>
                    <td className="p-2 border">{test.charAt(0).toUpperCase() + test.slice(1)}</td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        name={`${test}.value`}
                        value={formData[test]?.value || ''}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded w-full"
                        required
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        name={`${test}.unit`}
                        value={formData[test]?.unit || ''}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded w-full"
                        required
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        name={`${test}.range`}
                        value={formData[test]?.range || ''}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded w-full"
                        required
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Medical History Table */}
          {/* <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border border-gray-300 font-semibold">Medical History</th>
                <th className="p-2 border border-gray-300 font-semibold">Observed Values</th>
                <th className="p-2 border border-gray-300 font-semibold">Unit</th>
                <th className="p-2 border border-gray-300 font-semibold">Normal Range</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Current Medication', name: 'currentMedication' },
                { label: 'Previous Condition', name: 'previousCondition' },
                { label: 'Vaccination', name: 'vaccination' }
              ].map((item) => (
                <tr key={item.name} className="border border-gray-300">
                  <td className="p-2 border border-gray-300 font-medium">{item.label}</td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="text"
                      name={`medicalHistory.${item.name}.value`}
                      value={formData.medicalHistory[item.name]?.value || ''}
                      onChange={handleChange}
                      placeholder={`Enter ${item.label}`}
                      required
                      className="w-full border p-2"
                    />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      name={`medicalHistory.${item.name}.unit`}
                      value={formData.medicalHistory[item.name]?.unit || ''}
                      onChange={handleChange}
                      placeholder="Unit"
                      required
                      className="w-full border p-2"
                    />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="text"
                      name={`medicalHistory.${item.name}.range`}
                      value={formData.medicalHistory[item.name]?.range || ''}
                      onChange={handleChange}
                      placeholder="Range"
                      required
                      className="w-full border p-2"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}

          <div className="text-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-[#ff6015] text-white font-bold rounded hover:bg-[#ff471a] focus:outline-none"
            >
              Update Patient
            </button>
          </div>
        </form>
      </div>
    </SuperAdminLayout>
  );
};

export default UpdatePatient;
