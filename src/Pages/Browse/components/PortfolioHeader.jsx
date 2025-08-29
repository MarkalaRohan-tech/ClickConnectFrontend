import React from 'react'
import { Star, MapPin } from 'lucide-react'

const PortfolioHeader = ({ profile }) => {
    console.log(profile)
    return (
    <div className="px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 border-b border-gray-700 pb-10">
            <img
                src={profile.profilePic}
                alt={profile.displayName}
                className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg"
            />
            <div className="flex-1">
                <h1 className="text-4xl font-bold">{profile.displayName}</h1>
                <p className="text-gray-400 mt-2 text-lg">{profile.bio}</p>
                <div className="flex items-center gap-6 mt-4">
                    <span className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-semibold">{profile.rating}</span>
                        <span className="text-gray-400">({profile.ratingCount} reviews)</span>
                    </span>
                    <span className="flex items-center gap-1 text-gray-400">
                        <MapPin className="w-4 h-4 text-red-400" />
                        {profile.location
                            ? `${profile.location.city}, ${profile.location.state}, ${profile.location.country}`
                            : "Location not available"}
                        </span>
                </div>
                <p className="mt-3 text-gray-300">
                    Genres: <span className="font-medium text-white">{profile.genres?.join(', ')||[]}</span>
                </p>
            </div>
        </div>
    </div>
)}

export default PortfolioHeader


