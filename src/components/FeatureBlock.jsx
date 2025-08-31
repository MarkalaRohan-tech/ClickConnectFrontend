import React from 'react'
import { motion } from 'framer-motion';

const FeatureBlock = ({ align = 'left', title, iconClass, children }) => {
    const containerAlignment = align === 'right' ? 'items-end' : 'items-start';
    return (
        <div className={`poppins-regular flex flex-col justify-center ${containerAlignment} gap-3 m-5 hover:scale-115 transition-transform duration-300 hover:cursor-pointer`}
            
        >
            
            <h1 className="text-4xl dancing-script w-1/2 text-center text-white font-bold mb-2">
                <i className={iconClass}></i> &nbsp; {title}
            </h1>
            <motion.p className="text-gray-300 pl-5 w-1/2"
            
            initial={{ opacity: 0.45}}
            animate={{ opacity: 1}}
            transition={{ duration: 6, ease: "easeInOut" , repeat: Infinity, repeatType: "reverse" }}
            >
                {children}
            </motion.p>
        </div>
    )
}

export default FeatureBlock


