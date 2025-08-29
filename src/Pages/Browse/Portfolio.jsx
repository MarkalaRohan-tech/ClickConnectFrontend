import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Add this import
import { Star, Calendar, Award, Users, MapPin,IndianRupee } from "lucide-react";
import { detailedProfiles, defaultPackages } from "./portfolioData";
import PortfolioHeader from "./components/PortfolioHeader";
import PricingSection from "./components/PricingSection";
import BookingModal from "./components/BookingModal";
import PortfolioCarousel from "./components/PortfolioCarousel";
import EnlargedImageModal from "./components/EnlargedImageModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "../../../Services/Notification";

const Portfolio = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: "", text: "", rating: 0,userId: "",photographerId: "" });
  const [carouselIndices, setCarouselIndices] = useState({});
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [bookingForm, setBookingForm] = useState({
    date: "",
    from: "",
    to: "",
    notes: "",
  });
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/api/reviews/${id}`);
        setReviews(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`/api/profiles/getProtfolio/${id}`, {
          withCredentials: true,
        });
        console.log("Response DataL",res.data);
        setProfileData(res.data);

        // Set initial selected package based on fetched data
        if (res.data?.pricing?.packages) {
          const packages = transformPackages(res.data.pricing.packages);
          if (packages.length > 0) {
            setSelectedPackage(packages[0].name);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile data");
        // Fallback to mock data if API fails
        const fallbackProfile =
          detailedProfiles.find((p) => p._id === id) || detailedProfiles[0];
        setProfileData(fallbackProfile);
        const pkgs = Array.isArray(fallbackProfile?.pricing?.packages)
          ? fallbackProfile.pricing.packages
          : defaultPackages;
        setSelectedPackage(pkgs[0]?.name || "");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfile();
    }
  }, [id]); // Add dependency array to prevent infinite loop

  // Transform MongoDB schema packages to component expected format
  const transformPackages = (packages) => {
    if (!packages) return defaultPackages;

    const transformed = [];
    if (packages.basic) {
      transformed.push({
        name: "Basic",
        price: packages.basic.price,
        duration: packages.basic.duration,
        features: packages.basic.services || [],
      });
    }
    if (packages.premium) {
      transformed.push({
        name: "Premium",
        price: packages.premium.price,
        duration: packages.premium.duration,
        features: packages.premium.services || [],
      });
    }
    if (packages.deluxe) {
      transformed.push({
        name: "Deluxe",
        price: packages.deluxe.price,
        duration: packages.deluxe.duration,
        features: packages.deluxe.services || [],
      });
    }
    return transformed.length > 0 ? transformed : defaultPackages;
  };

  // Transform portfolio data to expected format
  const transformPortfolio = (portfolio) => {
    if (!portfolio || !Array.isArray(portfolio)) return [];

    // Group portfolio items by genre
    const groupedByGenre = portfolio.reduce((acc, item) => {
      const genre = item.genre || "General";
      if (!acc[genre]) {
        acc[genre] = [];
      }
      acc[genre].push(item);
      return acc;
    }, {});

    // Convert to expected format
    return Object.entries(groupedByGenre).map(([genre, items]) => {
      const urls = items
        .map((item) => item.url)
        .filter((url) => typeof url === "string" && url.trim() !== ""); // 🔑 filter out bad ones

      return {
        title: genre,
        description: `${genre} photography collection`,
        url: urls,
        captions: items.map((item) => item.caption || ""),
      };
    });
  };


  const getCurrentIndex = (portfolioIndex) =>
    typeof carouselIndices[portfolioIndex] === "number"
      ? carouselIndices[portfolioIndex]
      : 0;

  const nextImage = (portfolioIndex) => {
    const portfolio = transformPortfolio(profileData?.portfolio);
    const total = portfolio?.[portfolioIndex]?.url?.length || 0;
    if (!total) return;
    setCarouselIndices((prev) => ({
      ...prev,
      [portfolioIndex]: (getCurrentIndex(portfolioIndex) + 1) % total,
    }));
  };

  const prevImage = (portfolioIndex) => {
    const portfolio = transformPortfolio(profileData?.portfolio);
    const total = portfolio?.[portfolioIndex]?.url?.length || 0;
    if (!total) return;
    setCarouselIndices((prev) => ({
      ...prev,
      [portfolioIndex]: (getCurrentIndex(portfolioIndex) - 1 + total) % total,
    }));
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !profileData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-white text-black px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Don't render if no profile data
  if (!profileData) {
    return null;
  }

  const availablePackages = transformPackages(profileData?.pricing?.packages);
  const portfolioData = transformPortfolio(profileData?.portfolio);

  const submitReview = () => {
  async function postReview () {
    try {
      const user = JSON.parse(localStorage.getItem("User"));
      const reviewPayload = { 
        ...newReview,
        userId: user.id,
        photographerId: profileData._id
      };
      const res = await axios.post("/api/reviews", reviewPayload, { withCredentials: true });
      console.log(res.data);
      Notification.success(res.data.message);
    } catch (error) {
      Notification.error(error.response?.data?.message || error.message);
    }
  }
  postReview();
  };

  const confirmBooking = () => {

    const bookingConifrmation = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("User"));
        const bookingPayload = {
          ...bookingForm,
          userId: user.id,
          timeSlot: `${bookingForm.from} - ${bookingForm.to}`,
          photographerId: id,
          selectedPackage: selectedPackage,
        };
        const res = await axios.post("/api/bookings", bookingPayload, { withCredentials: true });
        console.log(res.data);
        Notification.success(res.data.message);
      } catch (error) {
        Notification.error(error.response?.data?.message || error.message);
      }
    }
    bookingConifrmation();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <PortfolioHeader profile={profileData} />

      <div className="px-6 py-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br bg-white p-6 rounded-xl text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-black" />
              <div className="text-2xl text-black font-bold">
                {profileData.rating || "0.0"}
              </div>
              <div className="text-black">Average Rating</div>
            </div>
            <div className="bg-gradient-to-br bg-white p-6 rounded-xl text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-black" />
              <div className="text-2xl text-black font-bold">
                {profileData.ratingCount || "0"}
              </div>
              <div className="text-black">Happy Clients</div>
            </div>
            <div className="bg-gradient-to-br bg-white p-6 rounded-xl text-center">
              <Award className="w-8 h-8 mx-auto mb-2 text-black" />
              <div className="text-2xl text-black font-bold">
                {profileData.experienceYears || "5"}+
              </div>
              <div className="text-black">Years Experience</div>
            </div>
            <div className="bg-gradient-to-br bg-white p-6 rounded-xl text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-black" />
              <div className="text-2xl text-black font-bold">
                {profileData.completedProjects ||
                  portfolioData.reduce(
                    (sum, genre) => sum + genre.url.length,
                    0
                  )}
              </div>
              <div className="text-black">Projects Done</div>
            </div>
          </div>
        </div>
      </div>

      <PricingSection
        packages={availablePackages}
        onBook={() => setBookingModalOpen(true)}
      />

      {typeof window !== "undefined" && (
        <BookingModal
          open={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          onBook={confirmBooking}
          bookingForm={bookingForm}
          setBookingForm={setBookingForm}
          selectedPackage={selectedPackage}
          setSelectedPackage={setSelectedPackage}
          packages={availablePackages}
        />
      )}

      <div className="px-6 py-10 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Portfolio</h2>
          {portfolioData.length === 0 ? (
            <p className="text-gray-400 text-center">
              No portfolio items available.
            </p>
          ) : (
            portfolioData.map((item, portfolioIndex) => (
              <div key={item.title} className="mb-16">
                <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 mb-6">{item.description}</p>
                <PortfolioCarousel
                  item={item}
                  index={portfolioIndex}
                  getIndex={getCurrentIndex}
                  onPrev={prevImage}
                  onNext={nextImage}
                  onDot={(i, idx) =>
                    setCarouselIndices((prev) => ({ ...prev, [i]: idx }))
                  }
                  onEnlarge={setEnlargedImage}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <EnlargedImageModal
        src={enlargedImage}
        onClose={() => setEnlargedImage(null)}
      />

      <div className="max-w-3xl mx-auto mt-16 mb-20 bg-gray-900 rounded-2xl p-8 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center">Leave a Review</h2>
        <form
          className="mb-10"
          onSubmit={(e) => {
            e.preventDefault();
            if (newReview.name && newReview.text && newReview.rating) {
              setReviews([
                {
                  name: newReview.name,
                  text: newReview.text,
                  rating: newReview.rating,
                  date: new Date().toISOString().slice(0, 10),
                },
                ...reviews,
              ]);
              setNewReview({ name: "", text: "", rating: 0 });
            }
          }}
        >
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Your Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
              value={newReview.name}
              onChange={(e) =>
                setNewReview((r) => ({ ...r, name: e.target.value }))
              }
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Your Review</label>
            <textarea
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
              rows={3}
              value={newReview.text}
              onChange={(e) =>
                setNewReview((r) => ({ ...r, text: e.target.value }))
              }
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setNewReview((r) => ({ ...r, rating: star }))}
                  className="focus:outline-none cursor-pointer"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= newReview.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-600"
                    }`}
                    fill={star <= newReview.rating ? "currentColor" : "none"}
                  />
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={submitReview}
            className="bg-gradient-to-r from-white cursor-pointer to-gray-300 text-black px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >

            Submit Review
          </button>
        </form>

        <h3 className="text-xl font-semibold mb-4">User Reviews</h3>
        <div className="space-y-6">
          {reviews.length === 0 && (
            <p className="text-gray-400 text-center">No reviews yet.</p>
          )}
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-gray-800 rounded-xl p-5 border border-gray-700"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-white">{review.name}</span>
                <span className="text-gray-400 text-xs">{review.date}</span>
              </div>
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-600"
                    }`}
                    fill={star <= review.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <p className="text-gray-300">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Portfolio;
