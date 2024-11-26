import React, { useEffect, useState } from 'react';
import { fecthDepartments, getEmployees } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSalary = () => {
    const [departments, setDepartments] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [loadingEmployees, setLoadingEmployees] = useState(false);
    const [salary, setSalary] = useState({
        department: null,
        employeeId: null,
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        payDate: null,
    });
    const navigate = useNavigate();

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const departments = await fecthDepartments();
                setDepartments(departments);
            } catch (error) {
                console.error("Failed to fetch departments", error);
                alert("Failed to load departments.");
            }
        };
        getDepartments();
    }, []);

    const handleDepartment = async (e) => {
        const departmentId = e.target.value;
        setSalary((prevData) => ({ ...prevData, department: departmentId }));
        setLoadingEmployees(true);
        try {
            const emps = await getEmployees(departmentId);
            setEmployees(emps);
        } catch (error) {
            console.error("Failed to fetch employees", error);
            alert("Failed to load employees.");
        } finally {
            setLoadingEmployees(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalary((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/salary/add`, salary, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.data.success) {
                navigate('/admin-dashboard/employees');
            }
        } catch (error) {
            if (error.response && error.response.data && !error.response.data.success) {
                alert(error.response.data.error);
            } else {
                alert("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <>
            {departments ? (
                <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
                    <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Salary</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Department */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Department</label>
                                <select
                                    name="department"
                                    onChange={handleDepartment}
                                    required
                                    className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                >
                                    <option value="">Select Department</option>
                                    {departments.map(dept => (
                                        <option key={dept._id} value={dept._id}>{dept.dept_name}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Employee */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Employee</label>
                                <select
                                    name="employeeId"
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                >
                                    <option value="">Select Employee</option>
                                    {loadingEmployees ? (
                                        <option>Loading...</option>
                                    ) : (
                                        employees.map(emp => (
                                            <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                                        ))
                                    )}
                                </select>
                            </div>
                            {/* Basic Salary */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Basic Salary</label>
                                <input
                                    type="number"
                                    name="basicSalary"
                                    onChange={handleChange}
                                    placeholder="basic salary"
                                    required
                                    min="0"
                                    className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                />
                            </div>
                            {/* Allowances */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Allowances</label>
                                <input
                                    type="number"
                                    name="allowances"
                                    onChange={handleChange}
                                    placeholder="allowances"
                                    required
                                    min="0"
                                    className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                />
                            </div>
                            {/* Deductions */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Deductions</label>
                                <input
                                    type="number"
                                    name="deductions"
                                    onChange={handleChange}
                                    placeholder="deductions"
                                    required
                                    min="0"
                                    className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                />
                            </div>
                            {/* Pay Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Pay Date</label>
                                <input
                                    type="date"
                                    name="payDate"
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                />
                            </div>
                            {/* Submit Button */}
                            <div className="col-span-full">
                                <button
                                    type="submit"
                                    className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                >
                                    Add Salary
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};

export default AddSalary;
