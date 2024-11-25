import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployee();
  }, [id]);

  return (
    <>
      {employee ? (
        <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-10">
          <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-gray-800 text-white p-6">
              <h1 className="text-3xl font-bold text-center">Employee Details</h1>
            </div>
            <div className="p-10 flex flex-col lg:flex-row items-start gap-8">
              {/* Profile Section */}
              <div className="flex-shrink-0 w-full lg:w-1/3 flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-800 shadow-lg">
                  <img
                    src={`http://localhost:5000/${employee.userId.profileImage}`}
                    alt={employee.userId.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-800">
                  {employee.userId.name}
                </h2>
                <p className="text-gray-600">Employee ID: {employee.employeeId}</p>
              </div>

              {/* Employee Details Section */}
              <div className="flex-1 bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-medium">
                      Date of Birth
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {new Date(employee.dob).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-medium">
                      Gender
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {employee.gender}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-medium">
                      Department
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {employee.department.dept_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-medium">
                      Marital Status
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {employee.maritalStatus}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500 uppercase font-medium">
                      Designation
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {employee.designation || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
          <p className="text-xl font-medium text-gray-600">Loading...</p>
        </div>
      )}
    </>
  );
};

export default View;
