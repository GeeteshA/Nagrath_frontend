import React, { useEffect, useState } from 'react'
import { getPatients } from '../api/patientService';
import SuperAdminLayout from './Layouts/SuperAdminLayout';


const Dashboard = () => {
    const [adminName, setAdminName] = useState('Admin');
    const [patients, setPatients] = useState([]);
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('user')).token;
                const data = await getPatients(token);
                setPatients(data);
            } catch (error) {
                console.error('Error fetching patients', error);
            }
        };
        fetchPatients();

        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.name) {
            setAdminName(storedUser.name);
        }
    }, []);


    return (
        <SuperAdminLayout>
            <div className="flex flex-col lg:flex-row items-center lg:justify-between bg-white p-6 rounded-lg shadow-md">
                <div className="text-center lg:text-left mb-4 lg:mb-0">
                    <h1 className="text-xl lg:text-2xl font-medium">Welcome,</h1>
                    <span className="text-2xl lg:text-3xl py-7 px-7 font-semibold text-[#302C51]">{adminName}</span>
                </div>
                <div className="mt-4 lg:mt-0 p-6 bg-[#302C51] hover:bg-[#ff6015] text-white rounded-xl transition transform hover:scale-105">
                    <h2 className="text-3xl text-center font-bold">{patients.length}</h2>
                    <p className="text-lg">Total Patients</p>
                </div>
            </div>
        </SuperAdminLayout>
    )
}

export default Dashboard