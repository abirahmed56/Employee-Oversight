import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditDepartment = () => {
    const { id } = useParams()
    const [department, setDepartment] = useState([])
    const [deptLoading, setDeptLoading] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const fecthDepartments = async () => {
            setDeptLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    setDepartment(response.data.department)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } finally {
                setDeptLoading(false)
            }
        };
        fecthDepartments();
    }, []);
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setDepartment({...department, [name]: value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:5000/api/department/${id}`, department, {
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success){
                navigate('/admin-dashboard/departments')
            }
        } catch (error) {
            if (error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
    }
    return (
        <>{deptLoading ? <div>Loading...</div> :
            <div className="min-h-screen flex items-start justify-center p-6 bg-gray-100">
                {/* Form Container */}
                <div className="bg-white shadow-md rounded-lg max-w-md w-full p-6">
                    {/* Title */}
                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800">Edit Department</h3>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Department Name */}
                        <div>
                            <label
                                htmlFor="dept_name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Department Name
                            </label>
                            <input
                                id="dept_name"
                                name='dept_name'
                                type="text"
                                onChange={handleChange}
                                value={department.dept_name}
                                placeholder="Enter Dept Name"
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                onChange={handleChange}
                                value={department.description}
                                placeholder="Description"
                                rows="4"
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
                        >
                            Update Department
                        </button>
                    </form>
                </div>
            </div>
        }</>
    )
}

export default EditDepartment