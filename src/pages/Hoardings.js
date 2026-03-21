import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { HiOutlineFilter, HiOutlineSearch } from "react-icons/hi";
import HoardingCard from "../components/HoardingCard";
import { getHoardings } from "../utils/api";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: "easeOut" },
  }),
};

const LIMIT = 10;

export default function Hoardings() {
  const [hoardingsList, setHoardingsList] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    currentPage: 1,
    hasNextPage: false,
  });

  const sentinelRef = useRef(null);
  const isFetchingRef = useRef(false);

  const fetchPage = useCallback((page, isInitial = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    if (isInitial) setLoadingInitial(true);
    else setLoadingMore(true);
    setError(null);

    getHoardings(page, LIMIT)
      .then((res) => {
        const { hoardings, pagination: pg } = res.data.data;
        console.log(res.data.data);
        setHoardingsList((prev) =>
          isInitial ? hoardings : [...prev, ...hoardings],
        );
        setPagination(pg);
      })
      .catch(() => setError("Failed to load hoardings. Please try again."))
      .finally(() => {
        isFetchingRef.current = false;
        if (isInitial) setLoadingInitial(false);
        else setLoadingMore(false);
      });
  }, []);

  // Initial load
  useEffect(() => {
    fetchPage(1, true);
  }, [fetchPage]);

  // IntersectionObserver — fires when sentinel scrolls into view
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          pagination.hasNextPage &&
          !isFetchingRef.current
        ) {
          fetchPage(pagination.currentPage + 1, false);
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [pagination.hasNextPage, pagination.currentPage, fetchPage]);

  const filtered = search
    ? hoardingsList.filter((h) => {
        const q = search.toLowerCase();
        return (
          h.hoarding_title.toLowerCase().includes(q) ||
          h.address1.toLowerCase().includes(q) ||
          h.city.toLowerCase().includes(q)
        );
      })
    : hoardingsList;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <motion.div
        className="mb-8"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Explore Hoardings
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Browse premium billboard locations in Bangalore
        </p>
      </motion.div>

      {/* Search + Filter toggle */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, address, or city..."
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

      {/* Filters panel — coming soon */}
      {showFilters && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 shadow-sm animate-fade-in">
          <p className="text-sm text-gray-400">
            Server-side filters (city, traffic, price) coming soon.
          </p>
        </div>
      )}

      {/* Initial skeleton */}
      {loadingInitial ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
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
      ) : error && hoardingsList.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={() => fetchPage(1, true)}
            className="mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            Retry
          </button>
        </div>
      ) : filtered.length > 0 ? (
        <>
          <p className="text-sm text-gray-400 mb-4">
            Showing {filtered.length} of {pagination.total} hoarding
            {pagination.total !== 1 && "s"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((h, i) => (
              <motion.div
                key={h.id}
                custom={i % 6}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <HoardingCard hoarding={h} />
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No hoardings found.</p>
        </div>
      )}

      {/* Sentinel — observed to trigger next page load */}
      <div ref={sentinelRef} className="h-1" />

      {/* Load-more spinner */}
      {loadingMore && (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        </div>
      )}

      {/* End of results */}
      {!loadingInitial &&
        !loadingMore &&
        !pagination.hasNextPage &&
        hoardingsList.length > 0 && (
          <p className="text-center text-sm text-gray-300 py-8">
            You've seen all {pagination.total} hoarding
            {pagination.total !== 1 && "s"}
          </p>
        )}
    </div>
  );
}
