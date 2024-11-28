import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { columns } from '../../utils/LeaveHelper'
import axios from 'axios'
import { LeaveButtons } from '../../utils/LeaveHelper'

const Table = () => {

    const [leaves, setLeaves] = useState([])
    const [filteredLeaves, setFilteredLeaves] = useState([])

    const calculateDays = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    };
    const fetchLeaves = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/leave/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success) {
                let sno = 1;
                const data = response.data.leaves.map((leave) => ({
                    sno: sno++,
                    employeeId: leave.employeeId.employeeId,
                    name: leave.employeeId.userId.name,
                    leaveType: leave.leaveType,
                    department: leave.employeeId.department.dept_name,
                    Days: calculateDays(leave.startDate, leave.endDate),
                    status: leave.status,
                    action: <LeaveButtons Id={leave._id} />,
                }));
                console.log(data)

                setLeaves(data);
                setFilteredLeaves(data);
            }
        } catch (error) {
            console.error(error);
            if (error.response && !error.response.data.success) {
                alert(error.message);
            }
        }
    };
    useEffect(() => {
        fetchLeaves();
    }, [])
    const filterByInput = (e) => {
        const data = leaves.filter((leave) =>
            leave.employeeId
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
        );
        setFilteredLeaves(data)
    }
    const filterByButton = (status) => {
        const data = leaves.filter((leave) =>
            leave.status.toLowerCase().includes(status.toLowerCase())
        );
        setFilteredLeaves(data);
    };
    
    return (
        <>
            {filteredLeaves ? (
                <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-10">
                    <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="bg-gray-800 text-white p-6 rounded-t-lg">
                            <h3 className="text-2xl font-bold text-center">Manage Leave</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Search Section */}
                            <div className="flex flex-col lg:flex-row gap-4 items-center">
                                <input
                                    type="text"
                                    placeholder="Search by Emp Id"
                                    className="w-full lg:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                                    onChange={filterByInput}
                                />
                                <div className="flex space-x-4">
                                    <button
                                        className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
                                        onClick={() => filterByButton("Pending")}
                                    >
                                        Pending
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
                                        onClick={() => filterByButton("Approved")}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                                        onClick={() => filterByButton("Rejected")}
                                    >
                                        Rejected
                                    </button>
                                </div>
                            </div>

                            {/* Data Table Section */}
                            <div className="mt-6">
                                <DataTable
                                    columns={columns}
                                    data={filteredLeaves}
                                    pagination
                                    className="bg-gray-50 rounded-lg shadow"
                                />
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

    )
}

export default Table