import React, { useEffect, useState } from 'react';
import { fecthDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [departments, setDepartments] = useState([])
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fecthDepartments()
            setDepartments(departments)
        }
        getDepartments();
    }, [])

    const handleChange = (e)=>{
        const {name, value, files} = e.target;
        if (name=='image'){
            setFormData((prevData)=> ({...prevData, [name]: files[0]}))
        }else{
            setFormData((prevData)=> ({...prevData, [name]: value}))
        }
    }
    const handleSubmit = async (e) =>{
        e.preventDefault()
        const formDataObj = new FormData()
        Object.keys(formData).forEach((key)=>{
            formDataObj.append(key, formData[key])
        })

            try {
                const response = await axios.post('http://localhost:5000/api/employee/add', formDataObj, {
                    headers:{
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if(response.data.success){
                    navigate('/admin-dashboard/employees')
                }
            } catch (error) {
                if (error.response && !error.response.data.success){
                    alert(error.response.data.error)
                }
            }
    
    }
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Employee</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            placeholder="Insert Name"
                            required
                            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="Insert Email"
                            required
                            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    </div>

                    {/* Employee ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                        <input
                            type="text"
                            name="employeeId"
                            placeholder="Employee ID"
                            onChange={handleChange}
                            required
                            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            onChange={handleChange}
                            required
                            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <select
                            name="gender"
                            onChange={handleChange}
                            required
                            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Marital Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Marital Status</label>
                        <select
                            name="maritalStatus"
                            onChange={handleChange}
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
                            placeholder="Designation"
                            required
                            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    </div>

                    {/* Department */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <select
                            name="department"
                            onChange={handleChange}
                            required
                            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            <option value="">Select Department</option>
                            {departments.map(dept => (
                                <option key={dept._id} value={dept._id}>{dept.dept_name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Salary */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Salary</label>
                        <input
                            type="number"
                            name="salary"
                            onChange={handleChange}
                            placeholder="Salary"
                            required
                            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            placeholder="*********"
                            required
                            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            name="role"
                            onChange={handleChange}
                            required
                            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>

                    {/* Upload Image */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            accept="image/*"
                            required
                            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            className="bg-gray-800 text-white font-medium py-2 px-6 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
                        >
                            Add Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Add;
