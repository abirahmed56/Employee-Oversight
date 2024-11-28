import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../context/authContext';
import axios from 'axios';
const List = () => {
    const {id} = useParams()
    const { user } = useAuth()
    const [leaves, setLeaves] = useState()
    const [filteredLeaves, setFilteredLeaves] = useState()

    let sno = 1;

    const fetchLeaves = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/leave/${id}/${user.role}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.data.success) {
                setLeaves(response.data.leaves);
                setFilteredLeaves(response.data.leaves);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);
    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            {/* Title */}
            <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Manage Leaves</h3>
            </div>

            {/* Search and Add Employee */}
            <div className="flex justify-between items-center space-x-4">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search by Name"
                    className="w-full max-w-xs p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                // onChange={handleFilter}
                />

                {/* Add Employee Button */}
                <Link
                    to="/employee-dashboard/add-leave"
                    className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm shadow-sm hover:bg-gray-800 transition"
                >
                    Add New Leave
                </Link>
            </div>
            <table className="w-full border-collapse border border-gray-200 rounded-md overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border border-gray-300">SNO</th>
                        <th className="p-2 border border-gray-300">Leave Type</th>
                        <th className="p-2 border border-gray-300">From</th>
                        <th className="p-2 border border-gray-300">To</th>
                        <th className="p-2 border border-gray-300">Description</th>
                        <th className="p-2 border border-gray-300">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leaves && leaves.map((leave) => (
                        <tr key={leave.id} className="text-center">
                            <td className="p-2 border border-gray-300">{sno++}</td>
                            <td className="p-2 border border-gray-300">{leave.leaveType}</td>
                            <td className="p-2 border border-gray-300">{new Date(leave.startDate).toLocaleDateString()}</td>
                            <td className="p-2 border border-gray-300">{new Date(leave.endDate).toLocaleDateString()}</td>
                            <td className="p-2 border border-gray-300">{leave.reason}</td>
                            <td className="p-2 border border-gray-300">
                                {leave.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default List