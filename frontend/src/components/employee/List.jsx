import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const List = () => {
    const [employees, setEmployees] = useState([])
    const [empLoading, setEmpLoading] = useState(false)

    useEffect(() => {
        const fecthEmployees = async () => {
          setEmpLoading(true);
          try {
            const response = await axios.get('http://localhost:5000/api/employee', {
              headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
              }
            })
            if (response.data.success) {
              let sno = 1;
              const data = await response.data.employees.map((emp) => (
                {
                  _id: emp._id,
                  sno: sno++,
                  dept_name: emp.department.dept_name,
                  name: emp.userId.name,
                  dob: emp.dob,
                  profileImage: emp.userId.profileImage,
                  action: <DepartmentButtons Id={dept._id} onDepartmentDelete={onDepartmentDelete}/>,
                }
              ));
              setDepartments(data);
              setFilteredDepartments(data);
            }
          } catch (error) {
            if (error.response && !error.response.data.success) {
              alert(error.response.data.error)
            }
          } finally{
            setEmpLoading(false)
          }
        };
        fecthEmployees();
      }, []);
    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            {/* Title */}
            <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Manage Employees</h3>
            </div>

            {/* Search and Add Department */}
            <div className="flex justify-between items-center space-x-4">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search by Dept Name"
                    className="w-full max-w-xs p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />

                {/* Add Department Button */}
                <Link
                    to="/admin-dashboard/add-employee"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm shadow-sm hover:bg-blue-700 transition"
                >
                    Add New Employee
                </Link>
            </div>
        </div>
    )
}

export default List