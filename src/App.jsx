import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PatientList from './components/PatientList';
import PatientDetails from './components/PatientDetails';
import Login from './pages/Login';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import CreatePatient from './components/CreatePatient';
import ProfileSection from './pages/ProfileSection';
import UpdatePatient from './components/UpdatePatient ';
import NotFound from './pages/NotFound'
import Dashboard from './components/Dashboard';
import PatientSearch from './components/PatientSearch';
import PublicPatientDetails from './components/PublicPatientDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/create-patient" element={<CreatePatient />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/patients/:id/edit" element={<UpdatePatient />} />
        <Route path="/admin/profile" element={<ProfileSection />} />
        <Route path="/admin/patients" element={<PatientList />} />
        <Route path="/admin/patients/:id" element={<PatientDetails />} />
        <Route path="/public/patient/:id" element={<PublicPatientDetails />} />
        <Route path='/admin/patients/search' element={<PatientSearch />} /> 
        <Route path='/super-admin/dashboard' element={<SuperAdminDashboard/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
