import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPatient } from '../api/patientService';
import SuperAdminLayout from './Layouts/SuperAdminLayout';

const CreatePatient = () => {
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
    documentFile: '', // new field for document file

    // Medical Test 
    bloodPressure: { value: '', range: '', unit: '' },
    heartRate: { value: '', range: '', unit: '' },
    weight: { value: '', range: '', unit: '' },
    hemoglobin: { value: '', range: '', unit: '' },
    bloodGroup: { value: '', range: '', unit: '' },
    fastingBloodSugar: { value: '', range: '', unit: '' },
    cbc: { value: '', range: '', unit: '' },
    urinalysis: { value: '', range: '', unit: '' },
    serumElectrolytes: { value: '', range: '', unit: '' },
    lipidProfile: { value: '', range: '', unit: '' },
    tsh: { value: '', range: '', unit: '' },
    sgpt: { value: '', range: '', unit: '' },
    platelet: { value: '', range: '', unit: '' },
    hiv: { value: '', range: '', unit: '' },
    chronicDisease: { value: '', range: '', unit: '' },
    medicalHistory: {
      currentMedication: { value: '', range: '', unit: '' },
      previousCondition: { value: '', range: '', unit: '' },
      vaccination: { value: '', range: '', unit: '' }
    }
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        [name]: reader.result // base64 string
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

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
        medicalHistory: {
          ...prevData.medicalHistory,
          [nameParts[1]]: {
            ...prevData.medicalHistory[nameParts[1]],
            [nameParts[2]]: value
          }
        }
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem('user')).token;
      await createPatient(formData, token);
      setSuccess('Patient created successfully');
      navigate('/admin/patients');
    } catch (err) {
      setError('Error creating patient');
    }
  };

  return (
    <SuperAdminLayout>
      <div className="p-8 bg-white shadow-md rounded-lg max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Patient Registration</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <form onSubmit={handleSubmit}>
          {/* ALL General Information  */}
          <div className='grid grid-cols-2 gap-4'>

            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block font-bold mb-1">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Patient Full Name"
                required
                className="w-full border p-2 mb-4"
              />
            </div>

            {/* Aadhar Number */}
            <div>
              <label htmlFor="aadharNumber" className="block font-bold mb-1">Aadhar Number *</label>
              <input
                type="number"
                id="aadharNumber"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                placeholder="Enter Your Aadhar Number"
                required
                className="w-full border p-2 mb-4"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="block font-bold mb-1">Date of Birth *</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="w-full border p-2 mb-4"
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block font-bold mb-1">Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter Your Address"
                required
                className="w-full border p-2 mb-4"
              />
            </div>

            {/* Address Line 1 */}
            <div>
              <label htmlFor="addressLine1" className="block font-bold mb-1">Address Line 1 *</label>
              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                placeholder="Enter Your Address Line 1"
                required
                className="w-full border p-2 mb-4"
              />
            </div>

            {/* State */}
            <div>
              <label htmlFor="state" className="block font-bold mb-1">State *</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter Your State"
                required
                className="w-full border p-2 mb-4"
              />
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block font-bold mb-1">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter Your City"
                required
                className="w-full border p-2 mb-4"
              />
            </div>

            {/* District */}
            <div>
              <label htmlFor="district" className="block font-bold mb-1">District *</label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="Enter Your District"
                required
                className="w-full border p-2 mb-4"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label htmlFor="mobile" className="block font-bold mb-1">Mobile Number *</label>
              <input
                type="number"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter Your Mobile number"
                required
                className="w-full border p-2 mb-4"
              />
            </div>

            {/* Pincode */}
            <div>
              <label htmlFor="pincode" className="block font-bold mb-1">Pincode *</label>
              <input
                type="number"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter Your Pincode"
                required
                className="w-full border p-2 mb-4"
              />
            </div>

            {/* Age */}
            <div>
              <label htmlFor="age" className="block font-bold mb-1">Age *</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter Your Age"
                required
                className="w-full border p-2 mb-4"
              />
            </div>

            {/* Country */}
            <div>
              <label htmlFor="country" className="block font-bold mb-1">Country *</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter Your Country"
                required
                className="w-full border p-2 mb-4"
              />
            </div>

            {/* Gender Section */}
            <div>
              <label className="block font-bold mb-1">Gender *</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === 'Male'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Male
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === 'Female'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Female
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={formData.gender === 'Other'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Other
                </label>
              </div>
            </div>

            {/* Photo  */}
            <div><label htmlFor="photo" className="block font-bold mb-1">Upload Photo *</label><input type="file" id="photo" name="photo" accept="image/*" onChange={handleFileChange} required className="w-full border p-2 mb-4" /></div>
          </div>

          {/* Medical Reports in Rows of Three */}
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border border-gray-300 font-semibold">Name of Test</th>
                <th className="p-2 border border-gray-300 font-semibold">Observed Values</th>
                <th className="p-2 border border-gray-300 font-semibold">Unit</th>
                <th className="p-2 border border-gray-300 font-semibold">Normal Range</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Hemoglobin', name: 'hemoglobin' },
                { label: 'Blood Group', name: 'bloodGroup' },
                { label: 'Blood Pressure Range (B.P)', name: 'bloodPressure' },
                { label: 'Heart Rate/Pulse Rate', name: 'heartRate' },
                { label: 'Weight', name: 'weight' },
                { label: 'Fasting Blood Sugar', name: 'fastingBloodSugar' },
                { label: 'Blood CBC', name: 'cbc' },
                { label: 'Urine', name: 'urinalysis' },
                { label: 'Serum Electrolytes', name: 'serumElectrolytes' },
                { label: 'Lipid Profile', name: 'lipidProfile' },
                { label: 'TSH', name: 'tsh' },
                { label: 'SGPT', name: 'sgpt' },
                { label: 'Platelet', name: 'platelet' },
                { label: 'HIV', name: 'hiv' },
                { label: 'Chronic Disease', name: 'chronicDisease' },
              ].map((test) => (
                <tr key={test.name} className="border border-gray-300">
                  <td className="p-2 border border-gray-300 font-medium">{test.label} *</td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="text"
                      name={`${test.name}.value`}
                      value={formData[test.name]?.value || ''}
                      onChange={handleChange}
                      placeholder={`Enter ${test.label}`}
                      required
                      className="w-full border p-2"
                    />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      name={`${test.name}.unit`}
                      value={formData[test.name]?.unit || ''}
                      onChange={handleChange}
                      placeholder={`Enter unit`}
                      required
                      className='w-full border p-2'

                    />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="text"
                      name={`${test.name}.range`}
                      value={formData[test.name]?.range || ''}
                      onChange={handleChange}
                      placeholder="Enter Normal Range"
                      required
                      className="w-full border p-2"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Medical History Table */}
          <h2 className="text-lg font-semibold mt-8 mb-4">Medical History</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border border-gray-300 font-semibold">Name of Condition</th>
                <th className="p-2 border border-gray-300 font-semibold">Observed Values</th>
                <th className="p-2 border border-gray-300 font-semibold">Unit</th>
                <th className="p-2 border border-gray-300 font-semibold">Normal Range</th>
              </tr>
            </thead>
            <tbody>
              {['currentMedication', 'previousCondition', 'vaccination'].map((subfield) => (
                <tr key={subfield}>
                  <td className="p-2 border border-gray-300">{subfield.replace(/([A-Z])/g, ' $1')}</td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="text"
                      id={`${subfield}Value`}
                      name={`medicalHistory.${subfield}.value`}
                      value={formData.medicalHistory[subfield]?.value || ''}
                      onChange={handleChange}
                      placeholder="Value"
                      required
                      className="w-full border p-2"
                    />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="text"
                      id={`${subfield}Unit`}
                      name={`medicalHistory.${subfield}.unit`}
                      value={formData.medicalHistory[subfield]?.unit || ''}
                      onChange={handleChange}
                      placeholder="Unit"
                      required
                      className="w-full border p-2"
                    />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="text"
                      id={`${subfield}Range`}
                      name={`medicalHistory.${subfield}.range`}
                      value={formData.medicalHistory[subfield]?.range || ''}
                      onChange={handleChange}
                      placeholder="Range"
                      required
                      className="w-full border p-2"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Document File Field */}
            {/* Document Upload */}
            <div><label htmlFor="documentFile" className="block font-bold mb-1">Medical Document *</label><input type="file" id="documentFile" name="documentFile" accept=".pdf,.docx,.jpg,.jpeg,.png" onChange={handleFileChange} required className="w-full border p-2 mb-4" /></div>

          {/* Submit Button */}
          <button type="submit" className="col-span-2 bg-[#302C51] hover:bg-[#ff6015] text-white py-2 px-4 rounded">
            Create Patient
          </button>
        </form>
      </div>
    </SuperAdminLayout>
  );
};

export default CreatePatient;
