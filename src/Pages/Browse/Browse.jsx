import React, { useState, useEffect } from "react";
import ProfileCard from "../../components/ProfileCard";
import BrowseHeader from "../../components/BrowseHeader";
import NoResultsFound from "../../components/NoResultsFound";
import { ToastContainer } from "react-toastify";
import axios from "axios";

const Browse = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default"); // default, low-to-high, high-to-low
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("/api/profiles", { withCredentials: true });
        console.log(res.data);
        setProfiles(res.data);
        setFilteredProfiles(res.data);
      } catch (err) {
        console.error("Error fetching profiles:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    let filtered = profiles.filter(
      (profile) =>
        profile.name.toLowerCase().includes(query.toLowerCase()) ||
        profile.location.toLowerCase().includes(query.toLowerCase()) ||
        profile.genres.some((genre) =>
          genre.toLowerCase().includes(query.toLowerCase())
        )
    );

    // Apply current sort order to filtered results
    filtered = applySorting(filtered, sortOrder);
    setFilteredProfiles(filtered);
  };

  // Sort functionality
  const handleSort = (order) => {
    setSortOrder(order);
    const sorted = applySorting([...filteredProfiles], order);
    setFilteredProfiles(sorted);
  };

  const applySorting = (profilesArray, order) => {
    if (order === "low-to-high") {
      return profilesArray.sort((a, b) => {
        const priceA = a.pricing?.baseRate || 0;
        const priceB = b.pricing?.baseRate || 0;
        return priceA - priceB;
      });
    } else if (order === "high-to-low") {
      return profilesArray.sort((a, b) => {
        const priceA = a.pricing?.baseRate || 0;
        const priceB = b.pricing?.baseRate || 0;
        return priceB - priceA;
      });
    }
    return profilesArray; // default order
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredProfiles(profiles);
    setSortOrder("default");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <>
      <BrowseHeader
        onSearch={handleSearch}
        onSort={handleSort}
        searchQuery={searchQuery}
        sortOrder={sortOrder}
      />

      {filteredProfiles.length === 0 && searchQuery ? (
        <NoResultsFound searchQuery={searchQuery} onClearSearch={clearSearch} />
      ) : (
        <div className="w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center m-auto">
          {filteredProfiles.map((profile) => (
            <div className="flex justify-center items-center" key={profile._id}>
              <ProfileCard profile={profile} />
            </div>
          ))}
        </div>
      )}

      <ToastContainer position="top-center" />
    </>
  );
};

export default Browse;
