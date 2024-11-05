import React, { useState } from 'react';
import { getPatients } from '../api/patientService';
import SuperAdminLayout from './Layouts/SuperAdminLayout';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

const PatientSearch = () => {
    const [filterType, setFilterType] = useState('');  // State for selected filter type
    const [filterValue, setFilterValue] = useState(''); // State for input search value
    const [error, setError] = useState('');
    const [filteredPatients, setFilteredPatients] = useState([]);
    const navigate = useNavigate();

    // Available filter options
    const filterOptions = ['name', 'city', 'district', 'state', 'country'];

    // Fetch and filter patients based on selected filter and input value
    const searchPatients = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('user')).token;
            const response = await getPatients(token);
            const filtered = response.filter(patient => {
                if (!filterType || !filterValue) return true;
                return patient[filterType]?.toLowerCase().includes(filterValue.toLowerCase());
            });
            setFilteredPatients(filtered);
            setError('');
        } catch (error) {
            console.error('Error searching patients:', error);
            setError('Error searching for patients');
        }
    };

    // Trigger search on Enter key
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchPatients();
        }
    };

    return (
        <SuperAdminLayout>
            <div className="p-4">
                <h2 className="text-2xl font-semibold mb-4">Patient Search</h2>

                <div className="flex gap-2 mb-4">
                    {/* Dropdown for selecting filter type */}
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select Filter</option>
                        {filterOptions.map(option => (
                            <option key={option} value={option}>
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </option>
                        ))}
                    </select>

                    {/* Input for typing filter value */}
                    <input
                        type="text"
                        placeholder={`Enter ${filterType || 'value'}`}
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        onKeyDown={handleKeyPress}  // Triggers search on Enter key
                        className="p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                {error && <p className="text-red-500 mt-2">{error}</p>}

                {/* Render Filtered Patients */}
                <ul className="mt-4">
                    {filteredPatients.length > 0 ? (
                        filteredPatients.map((patient) => (
                            <li key={patient._id} className="p-2 border-b border-gray-200 flex justify-between items-center">
                                <span>
                                    {patient.name} - {patient.age} - {patient.city} - {patient.state}
                                </span>
                                <button
                                    onClick={() => navigate(`/admin/patients/${patient._id}`)}
                                    className="flex items-center bg-[#302C51] text-white px-4 py-2 rounded-lg hover:bg-[#ff6015] transition-colors"
                                >
                                    <FaEye className="mr-2" /> View
                                </button>
                            </li>
                        ))
                    ) : (
                        <p>No patients found with the specified criteria.</p>
                    )}
                </ul>
            </div>
        </SuperAdminLayout>
    );
};

export default PatientSearch;
