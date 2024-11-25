import React from 'react';
import { FaUsers, FaBuilding, FaDollarSign, FaCalendarAlt, FaCheck, FaTimes } from 'react-icons/fa'; // Import icons
import SummaryCard from './SummaryCard';

const AdminSummary = () => {
  return (
    <div className="p-8 space-y-8">
      {/* Dashboard Overview */}
      <h3 className="text-2xl font-bold text-gray-800">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard icon={<FaUsers />} text="Total Employees" number={13} color="bg-teal-600" />
        <SummaryCard icon={<FaBuilding />} text="Total Departments" number={5} color="bg-blue-600" />
        <SummaryCard icon={<FaDollarSign />} text="Monthly Salary" number={15000} color="bg-green-600" />
      </div>

      {/* Leave Details */}
      <h4 className="text-xl font-semibold text-gray-800">Leave Details</h4>
      <div className="grid grid-cols-2 gap-6">
        <SummaryCard icon={<FaCalendarAlt />} text="Leave Applied" number={8} color="bg-orange-600" />
        <SummaryCard icon={<FaCheck />} text="Leave Approved" number={5} color="bg-teal-600" />
        <SummaryCard icon={<FaTimes />} text="Leave Rejected" number={2} color="bg-red-600" />
        <SummaryCard icon={<FaCalendarAlt />} text="Leave Pending" number={1} color="bg-yellow-600" />
      </div>
    </div>
  );
}

export default AdminSummary;
