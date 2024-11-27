import React, { useEffect, useState } from 'react';
import { FaUsers, FaBuilding, FaDollarSign, FaCalendarAlt, FaCheck, FaTimes } from 'react-icons/fa'; // Import icons
import SummaryCard from './SummaryCard';
import axios from 'axios';

const AdminSummary = () => {

  const [summary, setSummary] = useState(null)
  useEffect(()=>{
    const fetchSummary = async () =>{
      try {
        const summary = await axios.get("http://localhost:5000/api/dashboard/summary", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })
        setSummary(summary.data)
      } catch (error) {
        if (error.response && !error.response.data.success){
          alert(error.response.data.error)
          console.log(error)
        }
      }
    }
    fetchSummary()
  }, [])

  if (!summary){
    return <div>Loading</div>
  }
  return (
    <div className="p-8 space-y-8">
      {/* Dashboard Overview */}
      <h3 className="text-2xl font-bold text-gray-800">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard icon={<FaUsers />} text="Total Employees" number={summary.totalEmployee} color="bg-teal-600" />
        <SummaryCard icon={<FaBuilding />} text="Total Departments" number={summary.totalDepartment} color="bg-blue-600" />
        <SummaryCard icon={<FaDollarSign />} text="Monthly Salary" number={summary.totalSalary} color="bg-green-600" />
      </div>

      {/* Leave Details */}
      <h4 className="text-xl font-semibold text-gray-800">Leave Details</h4>
      <div className="grid grid-cols-2 gap-6">
        <SummaryCard icon={<FaCalendarAlt />} text="Leave Applied" number={summary.leaveSummary.appliedFor} color="bg-orange-600" />
        <SummaryCard icon={<FaCheck />} text="Leave Approved" number={summary.leaveSummary.approved} color="bg-teal-600" />
        <SummaryCard icon={<FaTimes />} text="Leave Rejected" number={summary.leaveSummary.rejected} color="bg-red-600" />
        <SummaryCard icon={<FaCalendarAlt />} text="Leave Pending" number={summary.leaveSummary.pending} color="bg-yellow-600" />
      </div>
    </div>
  );
}

export default AdminSummary;
