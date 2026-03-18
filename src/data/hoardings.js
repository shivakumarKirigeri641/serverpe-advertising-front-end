// Mock data — used as fallback while API is not yet connected.
// All locations are in Bangalore (currently operational city).
const hoardings = [
  {
    id: 1,
    title: "MG Road Junction Hoarding",
    location: "MG Road, Bangalore",
    city: "Bangalore",
    size: "30ft x 15ft",
    traffic: "Very High",
    visibility: "Excellent — prime CBD junction",
    price: 72000,
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop",
    description:
      "Highly visible hoarding at Bangalore's busiest commercial junction on MG Road. Captures IT professionals, shoppers, and daily commuters in peak hours.",
    views: 130000,
    impressionsPerDay: "~1,30,000",
    lit: true,
  },
  {
    id: 2,
    title: "Indiranagar 100ft Road Billboard",
    location: "100ft Road, Indiranagar, Bangalore",
    city: "Bangalore",
    size: "35ft x 18ft",
    traffic: "High",
    visibility: "Great — F&B and retail corridor",
    price: 58000,
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
    description:
      "Prominent billboard on Indiranagar's 100ft Road — Bangalore's most popular food, lifestyle, and nightlife belt. Ideal for premium brand visibility.",
    views: 95000,
    impressionsPerDay: "~90,000",
    lit: true,
  },
  {
    id: 3,
    title: "Koramangala 5th Block Hoarding",
    location: "5th Block, Koramangala, Bangalore",
    city: "Bangalore",
    size: "28ft x 14ft",
    traffic: "High",
    visibility: "Great — startup & youth hub",
    price: 52000,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    description:
      "Strategic placement in Koramangala, Bangalore's startup capital. Outstanding reach to young professionals, entrepreneurs, and tech-savvy consumers.",
    views: 85000,
    impressionsPerDay: "~82,000",
    lit: true,
  },
  {
    id: 4,
    title: "Hebbal Flyover Billboard",
    location: "Hebbal Flyover, Bangalore",
    city: "Bangalore",
    size: "40ft x 20ft",
    traffic: "Very High",
    visibility: "Excellent — elevated, 300m sightline",
    price: 95000,
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop",
    description:
      "Mega hoarding on Hebbal flyover — one of the highest-traffic interchange points in Bangalore. Commands attention from all directions with a dominant elevated position.",
    views: 175000,
    impressionsPerDay: "~1,75,000",
    lit: true,
  },
  {
    id: 5,
    title: "Whitefield Tech Corridor Board",
    location: "Whitefield Main Road, Bangalore",
    city: "Bangalore",
    size: "35ft x 15ft",
    traffic: "High",
    visibility: "Great — IT park corridor",
    price: 68000,
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
    description:
      "Positioned along the main IT corridor in Whitefield near ITPL and major tech campuses. Directly targets software engineers and professionals during peak commute.",
    views: 110000,
    impressionsPerDay: "~1,05,000",
    lit: true,
  },
  {
    id: 6,
    title: "Electronic City Phase 1 Hoarding",
    location: "Electronic City Phase 1, Bangalore",
    city: "Bangalore",
    size: "30ft x 15ft",
    traffic: "High",
    visibility: "Good — elevated highway proximity",
    price: 44000,
    image:
      "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=600&h=400&fit=crop",
    description:
      "Well-positioned hoarding at the entrance to Electronic City Phase 1 — home to Infosys, Wipro, and hundreds of tech firms. High weekday commuter traffic.",
    views: 88000,
    impressionsPerDay: "~85,000",
    lit: false,
  },
];

// Currently operational in Bangalore only.
export const cities = ["Bangalore"];
export const trafficLevels = ["High", "Very High"];

export default hoardings;
