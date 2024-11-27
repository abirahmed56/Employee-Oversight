import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const Settings = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [settings, setSettings] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings({ ...settings, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (settings.newPassword !== settings.confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }

        try {
            const response = await axios.put(
                'http://localhost:5000/api/setting/change-password',
                settings,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success) {
                setSuccess("Password changed successfully!");
                setError("");
                
                setTimeout(() => {
                    if (user.role === "admin") {
                        navigate("/admin-dashboard");
                    } else {
                        navigate("/employee-dashboard");
                    }
                }, 2000);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
            } else {
                setError("Server Error");
            }
        }
    };

    return (
        <div className='p-6'>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Change Password</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <form onSubmit={handleSubmit}>
                {/* Old Password */}
                <div className="mb-4">
                    <label htmlFor="oldPassword" className="block text-gray-700 font-medium mb-2">
                        Old Password
                    </label>
                    <input
                        type="password"
                        id="oldPassword"
                        name="oldPassword"
                        placeholder="Enter your old password"
                        value={settings.oldPassword}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                    />
                </div>

                {/* New Password */}
                <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        placeholder="Enter a new password"
                        value={settings.newPassword}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                    />
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Re-enter the new password"
                        value={settings.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 focus:outline-none transition duration-300"
                >
                    Change Password
                </button>
            </form>
        </div>
        </div>
    );
};

export default Settings;
