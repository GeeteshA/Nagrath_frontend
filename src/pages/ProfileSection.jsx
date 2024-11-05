import React, { useEffect, useState } from 'react';
import SuperAdminLayout from '../components/Layouts/SuperAdminLayout';

const ProfileSection = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Getting profile data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setProfile(storedUser);
    }
  }, []);

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <SuperAdminLayout>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg p-10">
        <div className="flex items-center space-x-6 mb-8">
          {/* Profile Icon */}
          <div className="flex items-center justify-center w-20 h-20 bg-green-500 text-white rounded-full text-4xl font-bold">
            {profile.name.charAt(0).toUpperCase()}
          </div>

          {/* Profile Name and Email */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{profile.name}</h2>
            <p className="text-lg text-gray-600">{profile.email}</p>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-6 space-y-4 text-lg">
          <p className="text-gray-700"><strong>Role:</strong> {profile.role}</p>
          <p className="text-gray-700"><strong>Joined:</strong> {profile.joinDate || 'N/A'}</p>
          {/* Add other profile fields as needed */}
        </div>
      </div>
    </div>
    </SuperAdminLayout>
  );
};

export default ProfileSection;
