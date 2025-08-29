export const detailedProfiles = [
  {
    _id: "1",
    name: "Emma Watson",
    rating: 4.8,
    ratingCount: 120,
    experienceYears: 5,
    completedProjects: 200,
        location: "New York, USA",
        skills: ["Wedding", "Portrait", "Event"],
        profilePic: "/profilePic (1).jpg",
        displayName: "Emma Stuios",
    bio:"The photo which captures memories of the most precious life time moments.Let me be the part of this precious moment  and create my magic with my phtographical skiils",
    portfolio: [
      {
        title: "Portraits",
        description: "Creative portrait sessions.",
        url: ["/gallery (1).jpg", "/gallery (2).jpg", "/gallery (3).jpg"]
      }
    ],
    pricing: {
      packages: [
  {
    name: "Basic",
    price: 120,
    duration: "1 hour",
    services: [
      "Digital delivery",
      "Basic photo editing",
      "Up to 10 high-resolution photos",
      "1 outfit change allowed"
    ],
    description: "Quick session perfect for portraits or small shoots. Includes 10 edited photos."
  },
  {
    name: "Standard",
    price: 250,
    duration: "2 hours",
    services: [
      "Digital delivery",
      "Advanced photo editing",
      "Up to 25 high-resolution photos",
      "2 outfit changes allowed",
      "Priority scheduling"
    ],
    description: "Extended session ideal for events or detailed portraits. Includes 25 professionally edited photos."
  },
  {
    name: "Premium",
    price: 400,
    duration: "4 hours",
    services: [
      "Digital delivery",
      "Advanced photo editing",
      "Up to 50 high-resolution photos",
      "Multiple outfit changes allowed",
      "Photo album included",
      "Priority scheduling",
      "On-location shooting"
    ],
    description: "Full session with extensive coverage for weddings, events, or professional shoots. Includes 50 high-resolution edited photos."
  }
      ]
        },
    specialty: "Portrait Photographer",
        location: {
            state: "Chicago",
            city:"LA",
            country:"USA"
    },
  },
  {
    _id: "2",
    name: "John Doe",
    rating: 4.5,
    ratingCount: 80,
    experienceYears: 3,
    completedProjects: 90,
    location: "Los Angeles, USA",
    skills: ["Wedding", "Portrait", "Event"],
    portfolio: [
      {
        title: "Fashion",
        description: "High-fashion photoshoots.",
        url: ["/images/fashion1.jpg", "/images/fashion2.jpg"]
      }
    ],
    pricing: {
      packages: [
        { name: "Basic", price: 150, description: "1-hour session, 15 photos" },
        { name: "Premium", price: 350, description: "3-hour session, 40 photos" }
      ]
    }
  },
  {
    _id: "3",
    name: "Sophia Lee",
    rating: 4.9,
    ratingCount: 200,
    experienceYears: 6,
    completedProjects: 250,
    location: "Chicago, USA",
    skills: ["Wedding", "Portrait", "Event"],
    portfolio: [
      {
        title: "Event Photography",
        description: "Capturing events with creativity.",
        url: ["/images/event1.jpg", "/images/event2.jpg", "/images/event3.jpg"]
      },
      {
        title: "Portraits",
        description: "Elegant and expressive portraits.",
        url: ["/images/portrait3.jpg", "/images/portrait4.jpg"]
      }
    ],
    pricing: {
      packages: [
        { name: "Basic", price: 120, description: "1-hour session, 12 photos" },
        { name: "Standard", price: 250, description: "2-hour session, 25 photos" },
        { name: "Premium", price: 400, description: "5-hour session, 60 photos" }
      ]
    }
  },
  {
    _id: "4",
    name: "Michael Chen",
    rating: 4.6,
    ratingCount: 95,
    experienceYears: 4,
    completedProjects: 130,
    location: "San Francisco, USA",
    skills: ["Wedding", "Portrait", "Event"],
    portfolio: [
      {
        title: "Commercial",
        description: "Professional photos for businesses.",
        url: ["/images/commercial1.jpg", "/images/commercial2.jpg"]
      },
      {
        title: "Lifestyle",
        description: "Capturing authentic lifestyle moments.",
        url: ["/images/lifestyle1.jpg", "/images/lifestyle2.jpg", "/images/lifestyle3.jpg"]
      }
    ],
    pricing: {
      packages: [
        { name: "Basic", price: 180, description: "1-hour session, 15 photos" },
        { name: "Standard", price: 300, description: "2-hour session, 30 photos" },
        { name: "Premium", price: 450, description: "4-hour session, 60 photos" }
      ]
    }
  },
  {
    _id: "5",
    name: "Olivia Brown",
    rating: 5.0,
    ratingCount: 150,
    experienceYears: 7,
    completedProjects: 300,
    location: "Miami, USA",
    skills: ["Wedding", "Portrait", "Event"],
    portfolio: [
      {
        title: "Travel Photography",
        description: "Capturing scenic and exotic destinations.",
        url: ["/images/travel1.jpg", "/images/travel2.jpg", "/images/travel3.jpg"]
      },
      {
        title: "Portraits",
        description: "Stunning portraits with natural light.",
        url: ["/images/portrait5.jpg", "/images/portrait6.jpg"]
      }
    ],
    pricing: {
      packages: [
        { name: "Basic", price: 200, description: "1-hour session, 15 photos" },
        { name: "Standard", price: 350, description: "2-hour session, 30 photos" },
        { name: "Premium", price: 500, description: "4-hour session, 70 photos" }
      ]
    }
  },
  {
    _id: "6",
    name: "Liam Smith",
    rating: 4.7,
    ratingCount: 110,
    experienceYears: 5,
    completedProjects: 180,
    location: "Seattle, USA",
    skills: ["Wedding", "Portrait", "Event"],
    portfolio: [
      {
        title: "Architectural",
        description: "Modern architecture photography.",
        url: ["/images/architecture1.jpg", "/images/architecture2.jpg"]
      },
      {
        title: "Event Photography",
        description: "Capturing events with style.",
        url: ["/images/event4.jpg", "/images/event5.jpg"]
      }
    ],
    pricing: {
      packages: [
        { name: "Basic", price: 150, description: "1-hour session, 15 photos" },
        { name: "Standard", price: 280, description: "2-hour session, 28 photos" },
        { name: "Premium", price: 400, description: "4-hour session, 60 photos" }
      ]
    }
  }
];

export const defaultPackages = [
  {
    name: "Basic",
    price: 120,
    duration: "1 hour",
    services: ["Digital delivery", "Basic editing"],
    description: "Quick session perfect for portraits or small shoots. Includes 10 edited photos."
  },
  {
    name: "Standard",
    price: 250,
    duration: "2 hours",
    services: ["Digital delivery", "Advanced editing", "1 outfit change"],
    description: "Extended session ideal for events or detailed portraits. Includes 25 professionally edited photos."
  },
  {
    name: "Premium",
    price: 400,
    duration: "4 hours",
    services: ["Digital delivery", "Advanced editing", "Multiple outfit changes", "Photo album included"],
    description: "Full session with extensive coverage. Includes 50 high-resolution edited photos."
  }
];



