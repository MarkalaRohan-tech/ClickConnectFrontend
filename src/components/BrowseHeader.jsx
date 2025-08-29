import React, { useState } from "react";
import { Search, SortAsc } from "lucide-react";

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

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center w-full sm:w-auto"
        >
          <label className="input flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white min-w-[250px]">
            <Search className="h-5 w-5 opacity-50 mr-2 text-gray-500" />
            <input
              type="search"
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              placeholder="Search by name, location, or genre..."
              className="outline-none flex-1 text-black placeholder-gray-500"
            />
          </label>
          <button
            type="submit"
            className="btn ml-2 bg-white text-black border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Search
          </button>
        </form>

        <button
          onClick={handleSortChange}
          className="btn bg-white text-black border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 whitespace-nowrap"
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
