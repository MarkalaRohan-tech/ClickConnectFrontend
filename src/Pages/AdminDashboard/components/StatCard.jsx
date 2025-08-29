import React from 'react'

const StatCard = ({ title, value, subtitle, icon: Icon, color }) => (
  <div className="bg-white border border-white rounded-xl p-6 hover:transform hover:-translate-y-1 transition-all duration-200 hover:shadow-2xl">
    <div className={`mb-3 ${color}`}>
      <div className="flex items-center">
        <Icon className="w-6 h-6 mr-2 " />
        <span className=" text-sm font-medium">{title}</span>
      </div>
      <div className="text-3xl font-bold mb-1 ">{value}</div>
    </div>
    <div className="text-black text-xs opacity-70">{subtitle}</div>
  </div>
);

export default StatCard


