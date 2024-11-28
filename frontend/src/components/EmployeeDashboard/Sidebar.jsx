import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBuilding, FaDollarSign, FaCogs } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';

function Sidebar() {
    const {user} = useAuth()
  return (
    <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white flex flex-col p-4">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-center text-white-400">Employee MA</h3>
      </div>
      <div className="space-y-4">
        <NavLink 
          to="/employee-dashboard" 
          className={({ isActive }) =>
            `flex items-center gap-4 p-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
          }
          end
        >
          <FaTachometerAlt className="text-xl" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink 
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `flex items-center gap-4 p-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
          }
        >
          <FaUsers className="text-xl" />
          <span>My Profile</span>
        </NavLink>
        <NavLink 
          to={`/employee-dashboard/leaves/${user._id}` }
          className={({ isActive }) =>
            `flex items-center gap-4 p-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
          }
        >
          <FaBuilding className="text-xl" />
          <span>Leaves</span>
        </NavLink>
        <NavLink 
          to={`/employee-dashboard/salary/${user._id}`}
          className={({ isActive }) =>
            `flex items-center gap-4 p-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
          }
        >
          <FaDollarSign className="text-xl" />
          <span>Salary</span>
        </NavLink>
        <NavLink 
          to="/employee-dashboard/settings" 
          className={({ isActive }) =>
            `flex items-center gap-4 p-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
          }
        >
          <FaCogs className="text-xl" />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
