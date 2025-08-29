import React from 'react'

const FeatureBlock = ({ align = 'left', title, iconClass, children }) => {
    const containerAlignment = align === 'right' ? 'items-end' : 'items-start';
    return (
        <div className={`poppins-regular flex flex-col justify-center ${containerAlignment} gap-3 m-5`}>
            <h1 className="text-4xl dancing-script w-1/2 text-center text-white font-bold mb-2">
                <i className={iconClass}></i> &nbsp; {title}
            </h1>
            <p className="text-gray-300 pl-5 w-1/2">
                {children}
            </p>
        </div>
    )
}

export default FeatureBlock


