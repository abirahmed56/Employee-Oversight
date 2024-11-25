import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EmployeeButtons, columns } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import axios from "axios";

const List = () => {
    const [employees, setEmployees] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true);
            try {
                const response = await axios.get("http://localhost:5000/api/employee", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.data.success) {
                    let sno = 1;
                    const data = response.data.employees.map((emp) => ({
                        _id: emp._id,
                        sno: sno++,
                        dept_name: emp.department.dept_name,
                        name: emp.userId.name,
                        dob: new Date(emp.dob).toLocaleDateString(),
                        profileImage: (
                            <img
                                width={40}
                                className="rounded-full"
                                src={`http://localhost:5000/${emp.userId.profileImage}`}
                                alt="Profile"
                            />
                        ),
                        action: <EmployeeButtons Id={emp._id} />,
                    }));
                    setEmployees(data);
                    setFilteredEmployees(data);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            } finally {
                setEmpLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    const handleFilter = (e) => {
        const records = employees.filter((emp) =>
            emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredEmployees(records);
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            {/* Title */}
            <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Manage Employees</h3>
            </div>

            {/* Search and Add Employee */}
            <div className="flex justify-between items-center space-x-4">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search by Name"
                    className="w-full max-w-xs p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    onChange={handleFilter}
                />

                {/* Add Employee Button */}
                <Link
                    to="/admin-dashboard/add-employee"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm shadow-sm hover:bg-blue-700 transition"
                >
                    Add New Employee
                </Link>
            </div>

            {/* Employee Table */}
            <div>
                {empLoading ? (
                    <div className="text-center">Loading...</div>
                ) : filteredEmployees.length === 0 ? (
                    <p className="text-center text-gray-500">No employees found</p>
                ) : (
                    <DataTable columns={columns} data={filteredEmployees} pagination />
                )}
            </div>
        </div>
    );
};

export default List;
