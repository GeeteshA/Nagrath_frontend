import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MdAddBox, MdDashboard } from 'react-icons/md';
import { IoMdListBox } from 'react-icons/io';

const SuperAdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  const handleNavigation = (view, path) => {
    setActiveView(view);
    navigate(path);
    setSidebarOpen(false);
  };

  useEffect(() => {
    const pathToView = {
      '/admin/dashboard': 'dashboard',
      '/admin/create-patient': 'addPatient',
      '/admin/patients': 'patientList',
    };
    setActiveView(pathToView[location.pathname] || 'dashboard');
  }, [location.pathname]);

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setSelectedPatient(null);
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static top-0 left-0 z-30 w-64 bg-[#302C51] text-white flex flex-col p-6 space-y-4 transform transition-transform lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between lg:hidden mb-4">
            <h2 className="text-xl font-bold">Admin Dashboard</h2>
            <button onClick={() => setSidebarOpen(false)} className="text-2xl text-white">
              <FaTimes />
            </button>
          </div>
          <div className="hidden lg:flex items-center mb-8">
            <h2 className="text-xl font-bold">Admin Dashboard</h2>
          </div>

          {/* Sidebar Navigation */}
          {[
            { label: 'Dashboard', icon: <MdDashboard />, view: 'dashboard', path: '/admin/dashboard' },
            { label: 'Add Patient', icon: <MdAddBox />, view: 'addPatient', path: '/admin/create-patient' },
            { label: 'Patient List', icon: <IoMdListBox />, view: 'patientList', path: '/admin/patients' },
          ].map((item) => (
            <button
              key={item.view}
              onClick={() => handleNavigation(item.view, item.path)}
              className={`flex items-center gap-2 p-2 font-semibold rounded transition-colors ${
                activeView === item.view ? 'bg-[#ff6015]' : 'hover:bg-[#ff6015]'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </aside>

        {/* Overlay for Sidebar in Mobile View */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden flex flex-col items-start">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mt-2 ml-4 text-2xl text-[#302C51] z-40"
          >
            <FaBars />
          </button>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-6 transition-all">{children}</main>

        {/* Update Patient Modal */}
        {showUpdateModal && selectedPatient && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              <UpdatePatient patient={selectedPatient} onClose={handleCloseModal} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SuperAdminLayout;
