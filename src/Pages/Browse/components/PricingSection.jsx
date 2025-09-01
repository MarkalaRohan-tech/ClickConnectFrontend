import React from 'react'

const PricingSection = ({ packages = [], onBook }) => {
  return(
  <div className="px-6 py-10">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Pricing Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className={`bg-gray-900 rounded-2xl p-8 border-2 transform transition-all duration-300 hover:scale-105 border-gray-700 hover:border-gray-600`}
          >
            <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
            <div className="text-4xl font-bold text-white mb-2">
              {" "}
              &#8377;{pkg.price}/-
            </div>
            <p className="text-gray-400 mb-6">{pkg.duration}</p>
            <ul className="space-y-3 mb-8">
              {(pkg.features || []).map((service, serviceIndex) => (
                <li
                  key={serviceIndex}
                  className="flex items-center text-gray-300"
                >
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  {service}
                </li>
              ))}
            </ul>
            <button
              className="w-full py-3 cursor-pointer rounded-xl font-semibold bg-gradient-to-r from-white to-gray-300 text-black transition-all duration-300 transform hover:scale-105 shadow-lg mt-2"
              onClick={onBook}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
)};

export default PricingSection


