import { useState, useMemo, useEffect } from "react";
import { HiOutlineFilter, HiOutlineSearch } from "react-icons/hi";
import HoardingCard from "../components/HoardingCard";
import { getHoardings } from "../utils/api";
import mockHoardings, {
  cities as mockCities,
  trafficLevels,
} from "../data/hoardings";

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹30,000", min: 0, max: 30000 },
  { label: "₹30,000 – ₹70,000", min: 30000, max: 70000 },
  { label: "₹70,000 – ₹1,00,000", min: 70000, max: 100000 },
  { label: "Above ₹1,00,000", min: 100000, max: Infinity },
];

export default function Hoardings() {
  const [hoardingsList, setHoardingsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState(mockCities);
  const [city, setCity] = useState("");
  const [traffic, setTraffic] = useState("");
  const [priceIdx, setPriceIdx] = useState(0);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // TODO: Replace mock fallback with real data once API is connected
    getHoardings()
      .then((res) => {
        setHoardingsList(res.data);
        setCities([...new Set(res.data.map((h) => h.city))]);
      })
      .catch(() => {
        setHoardingsList(mockHoardings);
        setCities(mockCities);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const range = priceRanges[priceIdx];
    return hoardingsList.filter((h) => {
      if (city && h.city !== city) return false;
      if (traffic && h.traffic !== traffic) return false;
      if (h.currentBid < range.min || h.currentBid > range.max) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          h.title.toLowerCase().includes(q) ||
          h.location.toLowerCase().includes(q) ||
          h.city.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [city, traffic, priceIdx, search, hoardingsList]);

  const clearFilters = () => {
    setCity("");
    setTraffic("");
    setPriceIdx(0);
    setSearch("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Explore Hoardings
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Browse premium billboard location
          {hoardingsList.length !== 1 ? "s" : ""} in Bangalore
        </p>
      </div>

      {/* Search + Filter toggle */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, location, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-11"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center gap-2 btn-outline text-sm py-2.5 px-5"
        >
          <HiOutlineFilter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 shadow-sm animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                City
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="input-field"
              >
                <option value="">All Cities</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Traffic Level
              </label>
              <select
                value={traffic}
                onChange={(e) => setTraffic(e.target.value)}
                className="input-field"
              >
                <option value="">All Levels</option>
                {trafficLevels.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Price Range
              </label>
              <select
                value={priceIdx}
                onChange={(e) => setPriceIdx(Number(e.target.value))}
                className="input-field"
              >
                {priceRanges.map((r, i) => (
                  <option key={r.label} value={i}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={clearFilters}
            className="mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse"
            >
              <div className="aspect-[4/3] bg-gray-100" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-100 rounded-lg w-3/4" />
                <div className="h-3 bg-gray-100 rounded-lg w-1/2" />
                <div className="h-3 bg-gray-100 rounded-lg w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <>
          <p className="text-sm text-gray-400 mb-4">
            Showing {filtered.length} hoarding{filtered.length !== 1 && "s"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((h) => (
              <HoardingCard key={h.id} hoarding={h} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">
            No hoardings match your filters.
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            Clear filters to see all
          </button>
        </div>
      )}
    </div>
  );
}
