import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Details = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchLeave();
  }, [id]);

  const handleUpdateStatus = async (status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setLeave({ ...leave, status });
        navigate('/admin-dashboard/leaves/')
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {leave ? (
        <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-10">
          <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-gray-800 text-white p-6">
              <h1 className="text-3xl font-bold text-center">Leave Details</h1>
            </div>
            <div className="p-10 flex flex-col lg:flex-row gap-8">
              <div className="flex-shrink-0 w-full lg:w-1/3 flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-800 shadow-lg">
                  <img
                    src={`http://localhost:5000/uploads/${leave.employeeId.userId.profileImage}`}
                    alt={leave.employeeId.userId.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-800">{leave.employeeId.userId.name}</h2>
                <p className="text-gray-600">Employee ID: {leave.employeeId.employeeId}</p>
              </div>

              <div className="flex-1 bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-medium">Leave Type</p>
                    <p className="text-lg font-semibold text-gray-800">{leave.leaveType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-medium">Department</p>
                    <p className="text-lg font-semibold text-gray-800">{leave.employeeId.department.dept_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-medium">Reason</p>
                    <p className="text-lg font-semibold text-gray-800">{leave.reason}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-medium">Start Date</p>
                    <p className="text-lg font-semibold text-gray-800">{new Date(leave.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-medium">End Date</p>
                    <p className="text-lg font-semibold text-gray-800">{new Date(leave.endDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-medium">Leave Status</p>
                    <p
                      className={`text-sm font-semibold ${
                        leave.status === 'Pending'
                          ? 'text-yellow-500'
                          : leave.status === 'Approved'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {leave.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 flex justify-end gap-4 bg-gray-50 border-t-2">
              <button
                onClick={() => handleUpdateStatus('Approved')}
                className="px-6 py-2 bg-green-600 text-white font-semibold text-sm rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
              >
                Accept
              </button>
              <button
                onClick={() => handleUpdateStatus('Rejected')}
                className="px-6 py-2 bg-red-600 text-white font-semibold text-sm rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
          <p className="text-xl font-medium text-gray-600">Loading Leave Details...</p>
        </div>
      )}
    </>
  );
};

export default Details;
