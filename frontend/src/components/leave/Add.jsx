import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
    const {user} = useAuth()
    const [leave, setLeave] = useState({
        userId: user._id,
    })
    const navigate = useNavigate()
    const handleChange = (e) => {
        const {name, value} = e.target;
        setLeave ((prevState)=>({...prevState, [name]: value}))
    };
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/leave/add`, leave, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });
            if (response.data.success) {
              navigate('/employee-dashboard/leaves')
            }
          } catch (error) {
            if (error.response && !error.response.data.success) {
              alert(error.response.data.error);
            }
          }
    }

    return (
        <div className='p-6'>
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Request for Leave</h2>
                <form onSubmit={handleSubmit}>
                    {/* Leave Type */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Leave Type</label>
                        <select
                            name="leaveType"
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                        >
                            <option value="">Select Leave Type</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Casual Leave">Casual Leave</option>
                            <option value="Annual Leave">Annual Leave</option>
                        </select>
                    </div>

                    {/* Dates Row */}
                    <div className="flex space-x-4 mb-4">
                        {/* From Date */}
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-medium mb-2">From Date</label>
                            <input
                                type="date"
                                name="startDate"
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                            />
                        </div>

                        {/* To Date */}
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-medium mb-2">To Date</label>
                            <input
                                type="date"
                                name="endDate"
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Description</label>
                        <textarea
                            name="reason"
                            rows="4"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                            placeholder="Enter a reason for leave"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:ring-2 focus:ring-gray-600 focus:outline-none transition duration-300"
                    >
                        Add Leave
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Add;
