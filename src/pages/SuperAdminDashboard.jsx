import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdmins, createAdmin, deleteAdmin } from '../api/adminService';
import Header from '../components/Header';

const SuperAdminDashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const data = await getAdmins(token);
        setAdmins(data);
      } catch (err) {
        setError('Error fetching admins');
      }
    };
    fetchAdmins();
  }, []);

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem('user')).token;
      await createAdmin({ name, email, password }, token);
      setSuccess('Admin created successfully');
      setEmail('');
      setPassword('');
      setName('');
      const updatedAdmins = await getAdmins(token);
      setAdmins(updatedAdmins);
    } catch (err) {
      setError('Error creating admin');
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    try {
      const token = JSON.parse(localStorage.getItem('user')).token;
      await deleteAdmin(adminId, token);
      const updatedAdmins = await getAdmins(token);
      setAdmins(updatedAdmins);
    } catch (err) {
      setError('Error deleting admin');
    }
  };

  return (
    <>
    <Header/>
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Super Admin Dashboard</h1>

        {/* Error & Success Messages */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        {/* Create Admin Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create Admin</h2>
          <form onSubmit={handleCreateAdmin} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                className="border border-gray-300 rounded p-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="border border-gray-300 rounded p-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="border border-gray-300 rounded p-2"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Create Admin
            </button>
          </form>
        </div>

        {/* Admin List Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Admin List</h2>
          {admins.length === 0 ? (
            <p className="text-gray-500">No admins found</p>
          ) : (
            <ul className="space-y-4">
              {admins.map((admin) => (
                <li
                  key={admin._id}
                  className="flex justify-between items-center p-4 bg-white shadow rounded-lg"
                >
                  <div>
                    <p className="text-lg font-medium text-gray-700">{admin.name}</p>
                    <p className="text-sm text-gray-500">{admin.email}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteAdmin(admin._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default SuperAdminDashboard;
