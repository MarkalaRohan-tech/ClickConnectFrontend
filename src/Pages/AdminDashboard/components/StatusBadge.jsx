import React from 'react'

const StatusBadge = ({ status }) => {
    const colors = {
        pending: "bg-black text-white border border-white",
        confirmed: "bg-white text-black border border-black",
        completed: "bg-white text-black border border-black",
        cancelled: "bg-black text-white border border-white",
        active: "bg-white text-black border border-black",
        inactive: "bg-black text-white border border-white",
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status] || colors.pending}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

export default StatusBadge


