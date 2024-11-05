import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [initial, setInitial] = useState(''); // Store the first letter of the admin name
  const [role, setRole] = useState(''); // Store the role of the user

  useEffect(() => {
    // Retrieve the admin's name and role from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      if (user.name) {
        setInitial(user.name.charAt(0).toUpperCase()); // Set the first letter of the admin's name
      }
      if (user.role) {
        setRole(user.role); // Set the role of the user
      }
    }
  }, []);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Logout function to clear local storage and redirect to login
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="relative inline-block text-left">
      {/* Profile Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full focus:outline-none"
      >
        <span className="text-lg">{initial}</span> {/* Dynamic profile initial */}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black z-10 ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {/* Conditionally render "Your Profile" link based on role */}
            {role === 'admin' && (
              <Link
                to="/admin/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Your Profile
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
