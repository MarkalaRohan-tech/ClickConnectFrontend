import React from 'react'
import {motion} from 'framer-motion';

const Hero = () => {
    return (
        <motion.div
            className="w-full h-screen bg-cover bg-center"
           style={{ backgroundImage: "url('/photo.jpg')", backgroundSize: "100%", backgroundRepeat: "no-repeat" }}
            animate={{ backgroundSize: ["100%", "110%", "100%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
            <div className="flex flex-col gap-5 items-start justify-center h-full bg-transparent bg-opacity-50 m-5 ">
                <div className="flex justify-center item-center w-1/2">
                    <motion.img
                        src="/Icon1.png"
                        alt="Logo"
                        className="w-50 h-50 rounded-full border-2 border-black shadow-lg shadow-amber-50 hover:scale-105 transition-transform duration-300"

                        initial={{ scale: 1 , opacity: 0.7}}
                        animate={{scale:1, opacity: 1}}
                        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                    />
                </div>
                <h1 className="text-white text-5xl font-semibold dancing-script">
                    Find the best Photographers & Videographers
                </h1>
                <p className="poppins-regular mt-5 w-1/2">
                    Connect with talented Photographers and Videographers for your events, weddings, portraits, projects and more. Let the best capture your life time precious moments. Browser portfolios, compare prices and book instantly
                </p>
            </div>
        </motion.div>
    )
}

export default Hero


