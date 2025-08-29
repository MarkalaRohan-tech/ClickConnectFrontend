import React from 'react'

const StatCard = ({ icon: Icon, label, value, color = "text-black" }) => (
  <div
    className={`bg-white border ${color} border-black rounded-lg p-6 text-center hover:bg-gray-100 transition-colors`}
    >
        <div className='flex gap-1 justify-center'>
            <Icon className={`w-8 h-8 mb-3`} />
            <p className="text-2xl font-bold">{value}</p>
        </div>
    <p className="text-gray-600 text-sm mb-1">{label}</p>
  </div>
);

export default StatCard


