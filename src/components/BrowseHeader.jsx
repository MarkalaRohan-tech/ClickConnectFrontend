import React, { useState } from "react";
import { Search } from "lucide-react";

const BrowseHeader = ({ onSearch, onSort, searchQuery, sortOrder }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearchQuery);
  };

  const handleSortChange = () => {
    let newOrder;
    if (sortOrder === "default") {
      newOrder = "low-to-high";
    } else if (sortOrder === "low-to-high") {
      newOrder = "high-to-low";
    } else {
      newOrder = "default";
    }
    onSort(newOrder);
  };

  const getSortButtonText = () => {
    switch (sortOrder) {
      case "low-to-high":
        return "Price: Low to High";
      case "high-to-low":
        return "Price: High to Low";
      default:
        return "Sort by Price";
    }
  };

  const getSortIcon = () => {
    if (sortOrder === "high-to-low") {
      return "fa-arrow-down-wide-short";
    } else if (sortOrder === "low-to-high") {
      return "fa-arrow-up-short-wide";
    }
    return "fa-sort";
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center m-2 mb-5 border-b-2 border-white rounded-2xl p-4 gap-4">
      <h1 className="poppins-regular text-2xl lg:text-3xl text-white text-center lg:text-left">
        Browse Photographers
      </h1>

      {/* All in one row */}
      <div className="flex flex-row items-center gap-3 w-full lg:w-auto">
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-row items-center gap-2 flex-1"
        >
          <label className="flex w-[180px] md:w-[350px] items-center border border-gray-300 rounded-lg px-3 py-2 bg-white flex-1">
            <Search className="h-5 w-5 opacity-50 mr-2 text-gray-500" />
            <input
              type="search"
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              placeholder="Search by name, location, or genre..."
              className="outline-none w-full flex-1 text-black placeholder-gray-500"
            />
          </label>
          <button
            type="submit"
            className="bg-white cursor-pointer text-black border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            Search
          </button>
        </form>

        <button
          onClick={handleSortChange}
          className="bg-white text-black cursor-pointer border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 whitespace-nowrap"
          title={getSortButtonText()}
        >
          <i className={`fas ${getSortIcon()}`}></i>
          <span className="hidden sm:inline">{getSortButtonText()}</span>
        </button>
      </div>
    </div>
  );
};

export default BrowseHeader;
