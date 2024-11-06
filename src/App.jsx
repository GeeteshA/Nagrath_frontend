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


// PrivateRoute component for protected routes
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const isAuthenticated = localStorage.getItem('user');

  return (
    <Router>
      <Routes>
        {/* Redirect to dashboard if authenticated, otherwise to login */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <Login />} 
        />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <Login />} 
        />

        {/* Protected Routes for Admins */}
        <Route 
          path="/admin/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin/create-patient" 
          element={
            <PrivateRoute>
              <CreatePatient />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin/patients/:id/edit" 
          element={
            <PrivateRoute>
              <UpdatePatient />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin/profile" 
          element={
            <PrivateRoute>
              <ProfileSection />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin/patients" 
          element={
            <PrivateRoute>
              <PatientList />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin/patients/:id" 
          element={
            <PrivateRoute>
              <PatientDetails />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin/patients/search" 
          element={
            <PrivateRoute>
              <PatientSearch />
            </PrivateRoute>
          } 
        />

        {/* Super Admin Route */}
        <Route 
          path="/super-admin/dashboard" 
          element={
            <PrivateRoute>
              <SuperAdminDashboard />
            </PrivateRoute>
          } 
        />

        {/* Public Route */}
        <Route 
          path="/public-patient/:id" 
          element={<PublicPatientDetails />} 
        />

        {/* Fallback for unknown routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;