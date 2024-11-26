import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewSalary = () => {
    const [salaries, setSalaries] = useState(null);
    const [filteredSalaries, setFilteredSalaries] = useState(null);
    const { id } = useParams();
    let sno = 1;

    const fetchSalaries = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/salary/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.data.success) {
                setSalaries(response.data.salary);
                setFilteredSalaries(response.data.salary);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        fetchSalaries();
    }, []);

    const filterSalaries = (e) => {
        const query = e.target.value.toLowerCase();
        const filteredRecords = salaries.filter((salary) =>
            salary.employeeId.employeeId.toLowerCase().includes(query)
        );
        setFilteredSalaries(filteredRecords);
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            {/* Title */}
            <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Salary History</h3>
            </div>

            {/* Search Bar */}
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by Emp ID"
                    className="w-full max-w-xs p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    onChange={filterSalaries}
                />
            </div>

            {/* Salary Table */}
            {filteredSalaries === null ? (
                <div className="text-center">Loading...</div>
            ) : filteredSalaries.length > 0 ? (
                <table className="w-full border-collapse border border-gray-200 rounded-md overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border border-gray-300">SNO</th>
                            <th className="p-2 border border-gray-300">Emp ID</th>
                            <th className="p-2 border border-gray-300">Salary</th>
                            <th className="p-2 border border-gray-300">Allowances</th>
                            <th className="p-2 border border-gray-300">Deductions</th>
                            <th className="p-2 border border-gray-300">Total</th>
                            <th className="p-2 border border-gray-300">Pay Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSalaries.map((salary) => (
                            <tr key={salary.id} className="text-center">
                                <td className="p-2 border border-gray-300">{sno++}</td>
                                <td className="p-2 border border-gray-300">{salary.employeeId.employeeId}</td>
                                <td className="p-2 border border-gray-300">{salary.basicSalary}</td>
                                <td className="p-2 border border-gray-300">{salary.allowances}</td>
                                <td className="p-2 border border-gray-300">{salary.deductions}</td>
                                <td className="p-2 border border-gray-300">
                                    {salary.netSalary}
                                </td>
                                <td className="p-2 border border-gray-300">
                                    {new Date(salary.payDate).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-gray-500">No salary records found</p>
            )}
        </div>
    );
};

export default ViewSalary;
