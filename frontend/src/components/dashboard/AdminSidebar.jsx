import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBuilding, FaCalendarAlt, FaDollarSign, FaCogs } from 'react-icons/fa';

function AdminSidebar() {
  return (
    <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white flex flex-col p-4">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-center text-white-400">Employee MA</h3>
      </div>
      <div className="space-y-4">
        <NavLink 
          to="/admin-dashboard" 
          className={({ isActive }) =>
            `flex items-center gap-4 p-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
          }
          end
        >
          <FaTachometerAlt className="text-xl" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink 
          to="/admin-dashboard/employees" 
          className={({ isActive }) =>
            `flex items-center gap-4 p-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
          }
        >
          <FaUsers className="text-xl" />
          <span>Employee</span>
        </NavLink>
        <NavLink 
          to="/admin-dashboard/departments" 
          className={({ isActive }) =>
            `flex items-center gap-4 p-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
          }
        >
          <FaBuilding className="text-xl" />
          <span>Department</span>
        </NavLink>
        <NavLink 
          to="/admin-leave" 
          className={({ isActive }) =>
            `flex items-center gap-4 p-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
          }
        >
          <FaCalendarAlt className="text-xl" />
          <span>Leave</span>
        </NavLink>
        <NavLink 
          to="/admin-dashboard/salary/add" 
          className={({ isActive }) =>
            `flex items-center gap-4 p-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
          }
        >
          <FaDollarSign className="text-xl" />
          <span>Salary</span>
        </NavLink>
        <NavLink 
          to="/admin-settings" 
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

export default AdminSidebar;
