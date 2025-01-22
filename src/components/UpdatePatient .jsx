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
    bloodGroup: '',
    photo: '',
    hemoglobin: { value: '', range: '', unit: '' },
    bloodPressure: { value: '', range: '', unit: '' },
    heartRate: { value: '', range: '', unit: '' },
    fastingBloodSugar: { value: '', range: '', unit: '' },
    calcium: { value: '', range: '', options: ['Adult: 8.5-11.0', 'Child: 6.7-10.5'], unit: 'mg/dL' },
    bloodCbc: {
      rbcCount: { value: '', unit: 'milli./cu.mm', range: '4.5-5.9' },
      packedCellVolume: { value: '', unit: '%', range: '37.53' },
      meanCellVolume: { value: '', unit: 'fl', range: '80-100' },
      meanCellHemoglobin: { value: '', unit: 'pg/g/dl', range: '26.34' },
      meanCellHbConc: { value: '', unit: '%', range: '11-16' },
      rdwCV: { value: '', unit: 'fl', range: '35-56' },
      rdwSD: { value: '', unit: '/cumm', range: '4500-11000' },
    },
    urineTest: {
      colour: { value: '', unit: '-', range: 'Pale Yellow' },
      appearance: { value: '', unit: '-', range: 'Clear' },
      reaction: { value: '', unit: '-', range: '6.0-8.5' },
      specificGravity: { value: '', unit: '-', range: '1.005-1.030' },
      pusCells: { value: '', unit: '/HFP', range: '0-5' },
      epithelialCells: { value: '', unit: '/HFP', range: '-' },
      redBloodCell: { value: '', unit: '/HFP', range: 'Nil' },
      spermatozoa: { value: '', unit: '/HFP', range: 'Absent' },
      casts: { value: '', unit: '/HPF', range: 'Absent' },
      crystals: { value: '', unit: '/HPF', range: 'Absent' },
      yeastCell: { value: '', unit: '/HPF', range: 'Absent' },
      bacteria: { value: '', unit: '/HPF', range: 'Absent' },
      esr: { value: '', unit: '-', range: '', options: ['1-13 male', '0-20 female'] },
    },
    lipidProfile: {
      cholesterolTotal: {
        value: '',
        unit: 'mg/dL',
        options: ['Desirable: Up to 200', 'Borderline High: 200-239', 'High: >250'],
      },
      triglycerides: {
        value: '',
        unit: 'mg/dL',
        options: ['Normal: <150', 'Borderline: 150-199', 'High: 200-499', 'Very High: >500'],
      },
      hdlCholesterol: {
        value: '',
        unit: 'mg/dL',
        options: ['Male: 35-70', 'Female: 35-90'],
      },
      ldlCholesterol: {
        value: '',
        unit: 'mg/dL',
        options: ['Low Risk: <100', 'Normal Risk: 130-160', 'High Risk: >160'],
      },
      vldlCholesterol: {
        value: '',
        unit: 'mg/dL',
        range: '<40',
      },
      cholHdlCholRatio: {
        value: '',
        unit: 'mg/dL',
        range: '<4.30',
      },
      ldlHdlCholRatio: {
        value: '',
        unit: 'mg/dL',
        range: '0.3',
      },
    },
    tshTest: {
      triiodothyronine: { value: '', unit: 'ng/d', range: '0.58-1.62' },
      thyroxine: { value: '', unit: 'ug/dl', range: '5.0-14.5' },
      tsh: { value: '', unit: 'uIU/mL', options: ['Normal: 0.35-5.1', 'Pregnant T1: 0.05-4.73', 'Pregnant T2: 0.30-4.79', 'Pregnant T3: 0.50-6.02'] },
      sgot: { value: '', unit: 'IU/L', range: '00-46' },
      sgpt: { value: '', unit: 'IU/L', range: '00-49' },
      alkalinePhosphatase: { value: '', unit: 'U/L', range: '30-145' },
      totalProtein: { value: '', unit: 'g/dl', range: '6.0-8.30' },
      albumin: { value: '', unit: 'g/dl', range: '3.5-5.0' },
      globulin: { value: '', unit: 'g/dl', range: '1.50-3.0' },
      albRatio: { value: '', unit: 'milli./cu.mm', range: '0.90-2.00' },
      plateletCount: { value: '', unit: 'Lakh/cumm', range: '1.5-4.5' },
      mpv: { value: '', unit: 'fl', range: '6.5-12.0' },
      pdw: { value: '', unit: 'fl', range: '15-17' },
      hivFirst: { value: '', unit: 'fl', range: 'Non - Reactive' },
      hivSecond: { value: '', unit: 'fl', range: 'Non - Reactive' },
      HBA1C: { value: '', unit: '%', options: ['Non-Diabetic: 4-6', 'Excellent Control: 6-7', 'Fair to Good Control: 7-8', 'Unsatisfactory Control: 8-10', 'Poor Control: >10'] },
    },
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
          calcium: patientData.calcium || { value: '', range: '', options: ['Adult: 8.5-11.0', 'Child: 6.7-10.5'], unit: 'mg/dL' },
          bloodCbc: {
            ...formData.bloodCbc,
            ...patientData.bloodCbc,
            rbcCount: patientData.bloodCbc?.rbcCount || { value: '', unit: 'milli./cu.mm', range: '4.5-5.9' },
            packedCellVolume: patientData.bloodCbc?.packedCellVolume || { value: '', unit: '%', range: '37.53' },
            meanCellVolume: patientData.bloodCbc?.meanCellVolume || { value: '', unit: 'fl', range: '80-100' },
            meanCellHemoglobin: patientData.bloodCbc?.meanCellHemoglobin || { value: '', unit: 'pg/g/dl', range: '26.34' },
            meanCellHbConc: patientData.bloodCbc?.meanCellHbConc || { value: '', unit: '%', range: '11-16' },
            rdwCV: patientData.bloodCbc?.rdwCV || { value: '', unit: 'fl', range: '35-56' },
            rdwSD: patientData.bloodCbc?.rdwSD || { value: '', unit: '/cumm', range: '4500-11000' },
          },
          urineTest: {
            ...formData.urineTest,
            ...patientData.urineTest,
            colour: patientData.urineTest?.colour || { value: '', unit: 'NA', range: 'Pale Yellow' },
            appearance: patientData.urineTest?.appearance || { value: '', unit: 'NA', range: 'Clear' },
            reaction: patientData.urineTest?.reaction || { value: '', unit: 'NA', range: '6.0-8.5' },
            specificGravity: patientData.urineTest?.specificGravity || { value: '', unit: 'NA', range: '1.005-1.030' },
            pusCells: patientData.urineTest?.pusCells || { value: '', unit: '/HFP', range: '0-5' },
            epithelialCells: patientData.urineTest?.epithelialCells || { value: '', unit: '/HFP', range: '-' },
            redBloodCell: patientData.urineTest?.redBloodCell || { value: '', unit: '/HFP', range: 'Nil' },
            spermatozoa: patientData.urineTest?.spermatozoa || { value: '', unit: '/HFP', range: 'Absent' },
            casts: patientData.urineTest?.casts || { value: '', unit: '/HPF', range: 'Absent' },
            crystals: patientData.urineTest?.crystals || { value: '', unit: '/HPF', range: 'Absent' },
            yeastCell: patientData.urineTest?.yeastCell || { value: '', unit: '/HPF', range: 'Absent' },
            bacteria: patientData.urineTest?.bacteria || { value: '', unit: '/HPF', range: 'Absent' },
            esr: patientData.urineTest?.esr || { value: '', unit: 'NA', range: '', options: ['1-13 male', '0-20 female'] },
          },
          lipidProfile: {
            ...formData.lipidProfile,
            ...patientData.lipidProfile,
            cholesterolTotal: patientData.lipidProfile?.cholesterolTotal || { value: '', unit: 'mg/dL', options: ['Desirable: Up to 200', 'Borderline High: 200-239', 'High: >250'] },
            triglycerides: patientData.lipidProfile?.triglycerides || { value: '', unit: 'mg/dL', options: ['Normal: <150', 'Borderline: 150-199', 'High: 200-499', 'Very High: >500'] },
            hdlCholesterol: patientData.lipidProfile?.hdlCholesterol || { value: '', unit: 'mg/dL', range: 'Male: 35-70, Female: 35-90' },
            ldlCholesterol: patientData.lipidProfile?.ldlCholesterol || { value: '', unit: 'mg/dL', options: ['Low Risk: <100', 'Normal Risk: 130-160', 'High Risk: >160'] },
            vldlCholesterol: patientData.lipidProfile?.vldlCholesterol || { value: '', unit: 'mg/dL', range: '<40' },
            cholHdlCholRatio: patientData.lipidProfile?.cholHdlCholRatio || { value: '', unit: 'mg/dL', range: '<4.30' },
            ldlHdlCholRatio: patientData.lipidProfile?.ldlHdlCholRatio || { value: '', unit: 'mg/dL', range: '0.3' },
          },
          tshTest: {
            ...formData.tshTest,
            ...patientData.tshTest,
            triiodothyronine: patientData.tshTest?.triiodothyronine || { value: '', unit: 'ng/d', range: '0.58-1.62' },
            thyroxine: patientData.tshTest?.thyroxine || { value: '', unit: 'ug/dl', range: '5.0-14.5' },
            tsh: patientData.tshTest?.tsh || { value: '', unit: 'uIU/mL', options: ['Normal: 0.35-5.1', 'Pregnant T1: 0.05-4.73', 'Pregnant T2: 0.30-4.79', 'Pregnant T3: 0.50-6.02'] },
            sgot: patientData.tshTest?.sgot || { value: '', unit: 'IU/L', range: '00-46' },
            sgpt: patientData.tshTest?.sgpt || { value: '', unit: 'IU/L', range: '00-49' },
            alkalinePhosphatase: patientData.tshTest?.alkalinePhosphatase || { value: '', unit: 'U/L', range: '30-145' },
            totalProtein: patientData.tshTest?.totalProtein || { value: '', unit: 'g/dl', range: '6.0-8.30' },
            albumin: patientData.tshTest?.albumin || { value: '', unit: 'g/dl', range: '3.5-5.0' },
            globulin: patientData.tshTest?.globulin || { value: '', unit: 'g/dl', range: '1.50-3.0' },
            albRatio: patientData.tshTest?.albRatio || { value: '', unit: 'milli./cu.mm', range: '0.90-2.00' },
            plateletCount: patientData.tshTest?.plateletCount || { value: '', unit: 'Lakh/cumm', range: '1.5-4.5' },
            mpv: patientData.tshTest?.mpv || { value: '', unit: 'fl', range: '6.5-12.0' },
            pdw: patientData.tshTest?.pdw || { value: '', unit: 'fl', range: '15-17' },
            hivFirst: patientData.tshTest?.hivFirst || { value: '', unit: 'fl', range: 'Non - Reactive' },
            hivSecond: patientData.tshTest?.hivSecond || { value: '', unit: 'fl', range: 'Non - Reactive' },
            HBA1C: patientData.tshTest?.HBA1C || { value: '', unit: '%', options: ['Non-Diabetic: 4-6', 'Excellent Control: 6-7', 'Fair to Good Control: 7-8', 'Unsatisfactory Control: 8-10', 'Poor Control: >10'] },
          },

        });
      } catch (err) {
        console.error('Error fetching patient details:', err);
        setError('Error fetching patient details');
      }
    };
    fetchPatient();
  }, [id]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   const nameParts = name.split('.');
  //   if (nameParts.length === 2) {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [nameParts[0]]: {
  //         ...prevData[nameParts[0]],
  //         [nameParts[1]]: value
  //       }
  //     }));
  //   } else if (nameParts.length === 3) {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [nameParts[0]]: {
  //         ...prevData[nameParts[0]],
  //         [nameParts[1]]: {
  //           ...prevData[nameParts[0]][nameParts[1]],
  //           [nameParts[2]]: value
  //         }
  //       }
  //     }));
  //   } else {
  //     setFormData({ ...formData, [name]: value || '' });
  //   }
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const nameParts = name.split('.');

    // Handle nested objects (like tshTest.tsh.value or tshTest.tsh.range)
    if (nameParts.length === 2) {
      setFormData((prevData) => ({
        ...prevData,
        [nameParts[0]]: {
          ...prevData[nameParts[0]],
          [nameParts[1]]: value,
        },
      }));
    } else if (nameParts.length === 3) {
      setFormData((prevData) => ({
        ...prevData,
        [nameParts[0]]: {
          ...prevData[nameParts[0]],
          [nameParts[1]]: {
            ...prevData[nameParts[0]][nameParts[1]],
            [nameParts[2]]: value,
          },
        },
      }));
    } else if (nameParts.length === 4) {
      // Specifically handle `options` for nested values like tshTest.tsh.options
      setFormData((prevData) => ({
        ...prevData,
        [nameParts[0]]: {
          ...prevData[nameParts[0]],
          [nameParts[1]]: {
            ...prevData[nameParts[0]][nameParts[1]],
            [nameParts[2]]: {
              ...prevData[nameParts[0]][nameParts[1]][nameParts[2]],
              [nameParts[3]]: value,
            },
          },
        },
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
            {['name', 'age', 'mobile', 'address', 'addressLine1', 'pincode', 'gender', 'dateOfBirth', 'aadharNumber', 'city', 'district', 'state', 'country', 'bloodGroup'].map((field) => (
              <div key={field} className="flex flex-col">
                <label htmlFor={field} className="mb-1 font-medium">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
                {field === 'bloodGroup' ? (
                  <select
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-[#ff6015]"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                ) : (
                  <input
                    id={field}
                    type={field === 'age' || field === 'pincode' ? 'number' : field === 'dateOfBirth' ? 'date' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    required
                    className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-[#ff6015]"
                  />
                )}
              </div>
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
                {['hemoglobin', 'bloodPressure', 'heartRate', 'fastingBloodSugar', 'calcium'].map((test) => (
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
                      <span className="border border-gray-300 p-2 rounded w-full block">{formData[test]?.unit || ''}</span>
                    </td>
                    <td className="p-2 border">
                      {/* Check if `options` exist for the test */}
                      {formData[test]?.options ? (
                        <select
                          name={`${test}.range`}
                          value={formData[test]?.range || ''}
                          onChange={handleChange}
                          className="border border-gray-300 p-2 rounded w-full"
                        >
                          <option value="">Select Range</option>
                          {formData[test].options.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="border border-gray-300 p-2 rounded w-full block">{formData[test]?.range || ''}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Additional Sections */}
          {/* Blood CBC Table */}
          <div className="overflow-auto">
            <h2 className="text-lg font-bold mb-2">Blood CBC</h2>
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
                {Object.keys(formData.bloodCbc || {}).map((test) => (
                  <tr key={test}>
                    <td className="p-2 border">{test}</td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        name={`bloodCbc.${test}.value`}
                        value={formData.bloodCbc[test]?.value || ''}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded w-full"
                      />
                    </td>
                    <td className="p-2 border">
                      <span className="border border-gray-300 p-2 rounded w-full block">{formData.bloodCbc[test]?.unit || ''}</span>
                    </td>
                    <td className="p-2 border">
                      <span className="border border-gray-300 p-2 rounded w-full block">{formData.bloodCbc[test]?.range || ''}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Urine Test Table */}
          <div className="overflow-auto mt-6">
            <h2 className="text-lg font-bold mb-2">Urine Test</h2>
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
                {Object.keys(formData.urineTest || {}).map((test) => (
                  <tr key={test}>
                    <td className="p-2 border">{test}</td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        name={`urineTest.${test}.value`}
                        value={formData.urineTest[test]?.value || ''}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded w-full"
                      />
                    </td>
                    <td className="p-2 border">
                      {/* Display unit as uneditable */}
                      <span className="border border-gray-300 p-2 rounded w-full block">{formData.urineTest[test]?.unit || ''}</span>
                    </td>
                    <td className="p-2 border">
                      {/* Check if `options` exist for the test */}
                      {formData.urineTest[test]?.options ? (
                        <select
                          name={`urineTest.${test}.range`}
                          value={formData.urineTest[test]?.range || ''}
                          onChange={handleChange}
                          className="border border-gray-300 p-2 rounded w-full"
                        >
                          <option value="">Select Range</option>
                          {formData.urineTest[test].options.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="border border-gray-300 p-2 rounded w-full block">{formData.urineTest[test]?.range || ''}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Lipid Profile Table */}
          <div className="overflow-auto mt-6">
            <h2 className="text-lg font-bold mb-2">Lipid Profile</h2>
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
                {Object.keys(formData.lipidProfile || {}).map((test) => {
                  const testData = formData.lipidProfile[test] || {};
                  const { value = '', unit = '', range = '', options = [] } = testData;
                  return (
                    <tr key={test}>
                      <td className="p-2 border">{test}</td>
                      <td className="p-2 border">
                        <input
                          type="text"
                          name={`lipidProfile.${test}.value`}
                          value={value}
                          onChange={handleChange}
                          className="border border-gray-300 p-2 rounded w-full"
                        />
                      </td>
                      <td className="p-2 border">
                        <span className="border border-gray-300 p-2 rounded w-full block">{unit}</span>
                      </td>
                      <td className="p-2 border">
                        {options && options.length > 0 ? (
                          <select
                            name={`lipidProfile.${test}.range`}
                            value={range}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded w-full"
                          >
                            <option value="">Select Range</option>
                            {options.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="border border-gray-300 p-2 rounded w-full block">{range}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>


          {/* TSH Test Table */}
          {/* <div className="overflow-auto mt-6">
            <h2 className="text-lg font-bold mb-2">TSH Test</h2>
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
                {Object.keys(formData.tshTest || {}).map((test) => (
                  <tr key={test}>
                    <td className="p-2 border">{test}</td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        name={`tshTest.${test}.value`}
                        value={formData.tshTest[test]?.value || ''}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded w-full"
                      />
                    </td>
                    <td className="p-2 border">
                      <span className="border border-gray-300 p-2 rounded w-full block">{formData.tshTest[test]?.unit || ''}</span>
                    </td>
                    <td className="p-2 border">
                      {formData.tshTest[test]?.options ? (
                        <select
                          name={`tshTest.${test}.range`}
                          value={formData.tshTest[test]?.range || ''}
                          onChange={handleChange}
                          className="border border-gray-300 p-2 rounded w-full"
                        >
                          <option value="">Select Range</option>
                          {formData.tshTest[test].options.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="border border-gray-300 p-2 rounded w-full block">{formData.tshTest[test]?.range || ''}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
          <div className="overflow-auto mt-6">
            <h2 className="text-lg font-bold mb-2">TSH Test</h2>
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
                {Object.keys(formData.tshTest || {}).map((test) => (
                  <tr key={test}>
                    <td className="p-2 border">{test}</td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        name={`tshTest.${test}.value`}
                        value={formData.tshTest[test]?.value || ''}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded w-full"
                      />
                    </td>
                    <td className="p-2 border">
                      <span className="border border-gray-300 p-2 rounded w-full block">
                        {formData.tshTest[test]?.unit || ''}
                      </span>
                    </td>
                    <td className="p-2 border">
                      {formData.tshTest[test]?.options ? (
                        <select
                          name={`tshTest.${test}.range`}
                          value={formData.tshTest[test]?.range || ''}
                          onChange={handleChange}
                          className="border border-gray-300 p-2 rounded w-full"
                        >
                          <option value="">Select Range</option>
                          {formData.tshTest[test].options.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="border border-gray-300 p-2 rounded w-full block">
                          {formData.tshTest[test]?.range || ''}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Submit */}
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
