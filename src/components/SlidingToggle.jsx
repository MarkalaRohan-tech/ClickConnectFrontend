import React from "react";

const SlidingToggle = ({ options, selected, onChange, className = "" }) => {
  const selectedIndex = options.indexOf(selected);
  const optionCount = options.length;

  // Calculate width percentage based on number of options
  const getSliderWidth = () => {
    return `calc(${100 / optionCount}% - 4px)`;
  };

  // Calculate transform position based on selected index
  const getSliderTransform = () => {
    const movePercentage = selectedIndex * (100 / optionCount) * optionCount;
    return `translateX(${movePercentage}%)`;
  };

  return (
    <div
      className={`relative bg-gray-100 rounded-full  p-1 flex mb-6 ${className}`}
    >
      {options.map((option, index) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`
            relative z-10 flex-1 py-2 px-2  text-xs md:text-md font-medium 
            transition-all duration-300 rounded-full text-center
            cursor-pointer
            ${
              selected === option
                ? "text-white"
                : "text-gray-600 hover:text-gray-800"
            }
          `}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}

      {/* Sliding Background */}
      <div
        className="absolute top-1 bottom-1 bg-black rounded-full transition-transform duration-300 ease-in-out z-0"
        style={{
          width: getSliderWidth(),
          transform: getSliderTransform(),
          left: "2px",
        }}
      />
    </div>
  );
};

export default SlidingToggle;
