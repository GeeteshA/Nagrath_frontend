import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import ProfileDropdown from './ProfileDropdown';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <header className="flex items-center justify-between p-4 text-white shadow-md">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="max-w-[145px] object-cover" />
      </div>
      <nav>
        {user ? (

          <ProfileDropdown/>
        ) : (
          <Link to="/login" className="bg-green-500 py-1 px-3 rounded hover:bg-green-600">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
