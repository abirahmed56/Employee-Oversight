import React from 'react';

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="p-4 rounded-lg shadow-lg bg-white flex items-center justify-between space-x-4">
      {/* Icon Section */}
      <div className={`p-4 rounded-full ${color} text-white flex items-center justify-center`}>
        {icon}
      </div>
      {/* Text and Number Section */}
      <div>
        <p className="text-lg font-semibold text-gray-700">{text}</p>
        <p className="text-xl font-bold text-gray-900">{number}</p>
      </div>
    </div>
  );
}

export default SummaryCard;
