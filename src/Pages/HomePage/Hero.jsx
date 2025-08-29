import React from 'react'

const Hero = () => {
    return (
        <div
            className="w-full h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('/photo.jpg')" }}
        >
            <div className="flex flex-col gap-5 items-start justify-center h-full bg-transparent bg-opacity-50 m-5 ">
                <div className="flex justify-center item-center w-1/2">
                    <img
                        src="/Icon1.png"
                        alt="Logo"
                        className="w-50 h-50 rounded-full border-2 border-black shadow-lg shadow-amber-50"
                    />
                </div>
                <h1 className="text-white text-5xl font-semibold dancing-script">
                    Find the best Photographers & Videographers
                </h1>
                <p className="poppins-regular mt-5 w-1/2">
                    Connect with talented Photographers and Videographers for your events, weddings, portraits, projects and more. Let the best capture your life time precious moments. Browser portfolios, compare prices and book instantly
                </p>
            </div>
        </div>
    )
}

export default Hero


