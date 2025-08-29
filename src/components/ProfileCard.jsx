import React from "react";
import { useNavigate } from "react-router-dom";
import { Camera, MapPin, Tags, IndianRupee, Star,User } from "lucide-react";

const ProfileCard = ({ profile }) => {
  const navigate = useNavigate();

  return (
    <div className="w-[90%] mt-5 rounded-2xl bg-white m-2 flex flex-col hover:scale-105 transition-transform duration-200 shadow-md">
      <img
        src={profile.profilePic}
        alt={profile.name}
        className="w-full h-56 object-cover rounded-t-2xl"
      />
      <div className="p-4 space-y-2">
        {/* Name */}
        <h2 className="text-xl text-black font-bold flex items-center gap-2">
          <User className="w-5 h-5 text-gray-600" />
          {profile.name}
        </h2>

        {/* Genres */}
        <p className="text-black truncate flex items-center gap-2">
          <Tags className="w-5 h-5 text-purple-600" />
          <b>Genres:</b>&nbsp;{profile.genres.join(", ")}
        </p>

        {/* Location */}
        <p className="text-black flex items-center gap-2">
          <MapPin className="w-5 h-5 text-red-600" />
          <b>Location:</b>&nbsp;{profile.location}
        </p>

        {/* Pricing + Rating */}
        <div className="flex flex-col justify-between items-start gap-2 mt-2">
          <span className="text-lg text-black flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-green-600" />
            <b>Base Rate:</b> &#8377;{profile.pricing?.baseRate ?? "N/A"} /
            session
          </span>

          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-black">
              {profile.rating === 0 ? "New" : profile.rating} (
              {profile.ratingCount} reviews)
            </span>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => navigate(`/profile/${profile._id}`)}
            className="btn bg-black text-white px-4 py-2 rounded-lg"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
