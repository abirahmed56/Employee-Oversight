import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';

const SummaryCard = () => {
    const { user } = useAuth();
    return (
        <div className='p-6'>
            <div className="p-4 rounded-lg shadow-lg bg-white flex items-center justify-left space-x-4">
                {/* Icon Section */}
                <div className={`p-4 bg-gray-800 text-white flex items-center justify-center`}>
                    <FaUser />
                </div>
                {/* Text and Number Section */}
                <div>
                    <p className="text-lg font-semibold text-gray-700 text-right">Welcome Back</p>
                    <p className="text-xl font-bold text-gray-900 text-left">{user.name}</p>
                </div>
            </div>
        </div>

    );
};

export default SummaryCard;
