import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component'
import { DepartmentButtons, columns } from '../../utils/DepartmentHelper';
import axios from 'axios';


const DepartmentList = () => {

  const [departments, setDepartments] = useState([])
  const [deptLoading, setDeptLoading] = useState(false)
  const [filteredDepartments, setFilteredDepartments] = useState([])

  const onDepartmentDelete = async (id) => {
    const data = departments.filter(dept => dept._id !== id)
    setDepartments(data)
  }

  useEffect(() => {
    const fecthDepartments = async () => {
      setDeptLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/department', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.departments.map((dept) => (
            {
              _id: dept._id,
              sno: sno++,
              dept_name: dept.dept_name,
              action: (<DepartmentButtons Id={dept._id} onDepartmentDelete={onDepartmentDelete}/>),
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
        setDeptLoading(false)
      }
    };
    fecthDepartments();
  }, []);

  const filterDepartments =(e)=>{
    const records = departments.filter((dept)=>
      dept.dept_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredDepartments(records)
  }

  return (
    <>{deptLoading? <div>Loading ...</div>:
    <div className="p-6 bg-white shadow-md rounded-lg">
      {/* Title */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Manage Departments</h3>
      </div>

      {/* Search and Add Department */}
      <div className="flex justify-between items-center space-x-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by Dept Name"
          className="w-full max-w-xs p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          onChange={filterDepartments}
        />

        {/* Add Department Button */}
        <Link
          to="/admin-dashboard/add-department"
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm shadow-sm hover:bg-blue-700 transition"
        >
          Add New Department
        </Link>
      </div>
      <div className='mt-5'>
        <DataTable
          columns={columns}
          data={filteredDepartments}
          pagination
        />
      </div>
    </div>
    }</>
  );
};

export default DepartmentList;
