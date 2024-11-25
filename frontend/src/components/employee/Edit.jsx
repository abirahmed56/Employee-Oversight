import React, { useEffect, useState } from 'react';
import { fecthDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { data } from '@remix-run/router';

const Edit = () => {
    const [departments, setDepartments] = useState(null)
    const [employee, setEmployee] = useState({
        name: '',
        maritalStatus: '',
        designation: '',
        salary: 0,
        departmentId: ''
    });
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fecthDepartments()
            setDepartments(departments)
        }
        getDepartments();
    }, [])

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.data.success) {
                    const employee = response.data.employee;
                    setEmployee((prev)=>({
                        ...prev,
                        name: employee.userId.name,
                        maritalStatus: employee.maritalStatus,
                        designation: employee.designation,
                        salary: employee.salary,
                        departmentId: employee.department._id
                    }));
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        };
        fetchEmployee();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
         setEmployee((prevData) => ({ ...prevData, [name]: value }))
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:5000/api/employee/${id}`, employee, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                navigate('/admin-dashboard/employees')
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }

    }
    return (
        <>{departments && employee ? (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Employee</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={employee.name}
                                onChange={handleChange}
                                placeholder="Insert Name"
                                required
                                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            />
                        </div>

                        {/* Marital Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Marital Status</label>
                            <select
                                name="maritalStatus"
                                onChange={handleChange}
                                value={employee.maritalStatus}
                                required
                                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                <option value="">Select Status</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                            </select>
                        </div>

                        {/* Designation */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Designation</label>
                            <input
                                type="text"
                                name="designation"
                                onChange={handleChange}
                                value={employee.designation}
                                placeholder="Designation"
                                required
                                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            />
                        </div>

                        {/* Salary */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Salary</label>
                            <input
                                type="number"
                                name="salary"
                                onChange={handleChange}
                                value={employee.salary}
                                placeholder="Salary"
                                required
                                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            />
                        </div>
                         {/* Department */}
                         <div className='col-span-2'>
                            <label className="block text-sm font-medium text-gray-700">Department</label>
                            <select
                                name="department"
                                onChange={handleChange}
                                value={employee.departmentId}
                                required
                                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                <option value="">Select Department</option>
                                {departments.map(dept => (
                                    <option key={dept._id} value={dept._id}>{dept.dept_name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2 flex justify-end">
                            <button
                                type="submit"
                                className="bg-gray-800 text-white font-medium py-2 px-6 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
                            >
                                Update Employee
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        ) : <div>Loading .... </div>}</>
    );
};

export default Edit;
