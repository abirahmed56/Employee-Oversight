import React from 'react';
import { useAuth} from '../../context/authContext';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = ()=> {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4 shadow-md">
      {/* Welcome Section */}
      <div className="flex items-center gap-2">
        <FaUserCircle className="text-2xl text-green-400" />
        <p className="text-lg font-medium">Welcome, {user?.name || 'Guest'}</p>
      </div>

      {/* Logout Button */}
      <button 
      className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-800 transition"
      onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
