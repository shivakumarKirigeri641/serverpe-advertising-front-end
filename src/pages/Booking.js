import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  HiOutlineArrowLeft,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineTrendingUp,
  HiOutlineEye,
} from "react-icons/hi";
import { getHoardingBookingDetails, bookHoardingSlot } from "../utils/api";
import { getStoredAdvertiserData } from "../utils/authApi";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price));
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [advertiser, setAdvertiser] = useState(null);

  // Range selection: click start, click/drag end
  const [rangeStart, setRangeStart] = useState(null); // index into flat dates
  const [rangeEnd, setRangeEnd] = useState(null);
  const [hoverIdx, setHoverIdx] = useState(null); // preview while selecting
  const [isDragging, setIsDragging] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const advertiserData = getStoredAdvertiserData();
    if (!advertiserData) {
      navigate("/advertiser/login");
      return;
    }
    setAdvertiser(advertiserData);

    setLoading(true);
    setError(null);
    getHoardingBookingDetails(id)
      .then((res) => {
        if (res.data.successstatus) {
          setBookingData(res.data.data);
        } else {
          setError(res.data.message || "Failed to load booking details");
        }
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Error loading booking");
        toast.error("Error loading booking details");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  // Flat ordered list of all dates from the API
  const allDates = useMemo(() => {
    if (!bookingData?.dates) return [];
    return bookingData.dates;
  }, [bookingData]);

  // Group dates by month for display
  const datesByMonth = useMemo(() => {
    if (!allDates.length) return [];
    const groups = {};
    allDates.forEach((d) => {
      const dt = new Date(d.ad_dates);
      const key = `${dt.getFullYear()}-${dt.getMonth()}`;
      if (!groups[key]) {
        groups[key] = {
          label: dt.toLocaleString("en-IN", { month: "long", year: "numeric" }),
          dates: [],
        };
      }
      groups[key].dates.push(d);
    });
    return Object.values(groups);
  }, [allDates]);

  // Index lookup: date id -> position in flat array
  const idToIdx = useMemo(() => {
    const map = {};
    allDates.forEach((d, i) => (map[d.id] = i));
    return map;
  }, [allDates]);

  // Compute the effective range [lo, hi] indices
  const getRange = useCallback(() => {
    if (rangeStart === null) return null;
    const end = rangeEnd !== null ? rangeEnd : hoverIdx;
    if (end === null) return { lo: rangeStart, hi: rangeStart };
    const lo = Math.min(rangeStart, end);
    const hi = Math.max(rangeStart, end);
    return { lo, hi };
  }, [rangeStart, rangeEnd, hoverIdx]);

  // Set of selected AVAILABLE date ids within range
  const selectedIds = useMemo(() => {
    const range = getRange();
    if (!range) return new Set();
    const ids = new Set();
    for (let i = range.lo; i <= range.hi; i++) {
      if (allDates[i]?.booking_status === "AVAILABLE") {
        ids.add(allDates[i].id);
      }
    }
    return ids;
  }, [getRange, allDates]);

  // Is a date index within the current range (for highlighting)?
  const isInRange = useCallback(
    (idx) => {
      const range = getRange();
      if (!range) return false;
      return idx >= range.lo && idx <= range.hi;
    },
    [getRange],
  );

  const handleDateClick = (idx) => {
    if (allDates[idx]?.booking_status !== "AVAILABLE") return;

    if (rangeStart === null || rangeEnd !== null) {
      // Start new range
      setRangeStart(idx);
      setRangeEnd(null);
      setIsDragging(true);
    } else {
      // Finish range
      setRangeEnd(idx);
      setIsDragging(false);
    }
  };

  const handleMouseEnter = (idx) => {
    if (isDragging && rangeStart !== null && rangeEnd === null) {
      setHoverIdx(idx);
    }
  };

  const handleMouseUp = (idx) => {
    if (isDragging && rangeStart !== null && rangeEnd === null) {
      setRangeEnd(idx);
      setIsDragging(false);
      setHoverIdx(null);
    }
  };

  const clearSelection = () => {
    setRangeStart(null);
    setRangeEnd(null);
    setHoverIdx(null);
    setIsDragging(false);
  };

  const selectAllAvailable = () => {
    // Find first and last available indices
    let first = -1,
      last = -1;
    allDates.forEach((d, i) => {
      if (d.booking_status === "AVAILABLE") {
        if (first === -1) first = i;
        last = i;
      }
    });
    if (first !== -1) {
      setRangeStart(first);
      setRangeEnd(last);
      setIsDragging(false);
      setHoverIdx(null);
    }
  };

  // Compute summary values from selected range
  const rangeInfo = useMemo(() => {
    const range = getRange();
    if (!range || selectedIds.size === 0) return null;
    const firstDate = new Date(allDates[range.lo]?.ad_dates);
    const lastDate = new Date(allDates[range.hi]?.ad_dates);
    return { firstDate, lastDate };
  }, [getRange, selectedIds, allDates]);

  const daysCount = selectedIds.size;
  const totalPrice =
    bookingData && daysCount > 0
      ? Number(bookingData.price_per_day) * daysCount
      : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  // Check hoarding availability (has dates with AVAILABLE status)
  const isHoardingAvailable =
    bookingData &&
    bookingData.dates &&
    bookingData.dates.some((date) => date.booking_status === "AVAILABLE");

  const handleProceedBooking = async () => {
    if (selectedIds.size === 0) {
      toast.error("Please select at least one available date");
      return;
    }

    setIsBooking(true);
    try {
      const res = await bookHoardingSlot({
        hoarding_id: parseInt(id),
        slots: Array.from(selectedIds),
      });
      if (res.data.successstatus) {
        navigate("/advertiser/booking/checkout", {
          state: {
            bookingIds: Array.from(selectedIds),
            bookingReference: res.data.data.booking_reference,
            bookingData,
            advertiser,
            daysCount,
            totalPrice,
          },
        });
        toast.success("Proceed to payment");
      } else {
        toast.error(res.data.message || "Booking failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error processing booking");
    } finally {
      setIsBooking(false);
    }
  };

  if (error || !bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Booking details not found"}
          </h2>
          <button
            onClick={() => navigate("/advertiser/dashboard")}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!isHoardingAvailable) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Hoarding Not Available
          </h2>
          <p className="text-gray-600 mb-6">
            This hoarding is currently not available for booking.
          </p>
          <button
            onClick={() => navigate("/hoardings")}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Back to Hoardings
          </button>
        </div>
      </div>
    );
  }

  const hoarding = bookingData;

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.45, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => navigate("/advertiser/dashboard")}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 mb-6 transition-colors"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Advertiser & Hoarding Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Advertiser Card */}
            <motion.div
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Advertiser Details
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Contact Person
                  </p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {advertiser.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Business Name
                  </p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {advertiser.businessName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Mobile Number
                  </p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {advertiser.phoneNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Email
                  </p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {advertiser.email || "Not provided"}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Hoarding Card */}
            <motion.div
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Hoarding Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">
                      {hoarding.hoarding_title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Code: {hoarding.hoarding_code}
                    </p>
                  </div>
                  <span className="text-xs font-semibold bg-green-50 text-green-600 px-3 py-1 rounded-full">
                    Available
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <HiOutlineLocationMarker className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium text-gray-900">
                        {hoarding.city}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <HiOutlineTrendingUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Size</p>
                      <p className="text-sm font-medium text-gray-900">
                        {hoarding.width_feet}ft × {hoarding.height_feet}ft
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <HiOutlineEye className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Visibility</p>
                      <p className="text-sm font-medium text-gray-900">
                        {hoarding.total_visibility_score}/10
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <HiOutlineTrendingUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Traffic</p>
                      <p className="text-sm font-medium text-gray-900">
                        {hoarding.traffic_type_name}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>₹{hoarding.price_per_day}</strong> per day
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Date Picker Card */}
            <motion.div
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <HiOutlineCalendar className="w-5 h-5 text-primary-600" />
                  Select Dates
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={selectAllAvailable}
                    className="text-xs font-medium text-primary-600 hover:text-primary-700 px-3 py-1.5 rounded-lg border border-primary-200 hover:bg-primary-50 transition-colors"
                  >
                    Select All
                  </button>
                  {daysCount > 0 && (
                    <button
                      onClick={clearSelection}
                      className="text-xs font-medium text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-4">
                {rangeStart === null
                  ? "Click a start date, then click or drag to an end date."
                  : rangeEnd === null
                    ? "Now click or drag to your end date."
                    : "Range selected! Click a new start date to change."}
              </p>

              {/* Date grid grouped by month */}
              <div
                className="space-y-5 max-h-[420px] overflow-y-auto pr-1 select-none"
                onMouseLeave={() => isDragging && setHoverIdx(null)}
              >
                {datesByMonth.map((group) => (
                  <div key={group.label}>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 sticky top-0 bg-white py-1 z-10">
                      {group.label}
                    </p>
                    <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-1.5">
                      {group.dates.map((d) => {
                        const dt = new Date(d.ad_dates);
                        const idx = idToIdx[d.id];
                        const isAvailable = d.booking_status === "AVAILABLE";
                        const inRange = isInRange(idx);
                        const isStart = idx === rangeStart;
                        const isEnd =
                          idx === rangeEnd ||
                          (rangeEnd === null && idx === hoverIdx);

                        return (
                          <button
                            key={d.id}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              handleDateClick(idx);
                            }}
                            onMouseEnter={() => handleMouseEnter(idx)}
                            onMouseUp={() => handleMouseUp(idx)}
                            onTouchStart={(e) => {
                              e.preventDefault();
                              handleDateClick(idx);
                            }}
                            disabled={!isAvailable}
                            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-center transition-all cursor-pointer ${
                              !isAvailable
                                ? "bg-red-50 text-red-300 cursor-not-allowed line-through"
                                : isStart || isEnd
                                  ? "bg-primary-600 text-white ring-2 ring-primary-400 scale-105"
                                  : inRange && isAvailable
                                    ? "bg-primary-100 text-primary-700"
                                    : "bg-gray-50 text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                            }`}
                            title={
                              !isAvailable
                                ? "Booked"
                                : isStart
                                  ? "Start date"
                                  : isEnd
                                    ? "End date"
                                    : `${dt.getDate()} ${dt.toLocaleString("en-IN", { month: "short" })}`
                            }
                          >
                            <span className="text-[10px] leading-none font-medium opacity-70">
                              {DAY_NAMES[dt.getDay()]}
                            </span>
                            <span className="text-sm font-bold leading-tight mt-0.5">
                              {dt.getDate()}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Range info */}
              {rangeInfo && (
                <div className="mt-4 p-3 bg-primary-50 border border-primary-200 rounded-lg text-sm text-primary-800 flex items-center justify-between">
                  <span>
                    <strong>
                      {rangeInfo.firstDate.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </strong>
                    {" → "}
                    <strong>
                      {rangeInfo.lastDate.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </strong>
                  </span>
                  <span className="font-bold">
                    {daysCount} day{daysCount !== 1 ? "s" : ""}
                  </span>
                </div>
              )}

              {/* Legend */}
              <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-gray-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-primary-600 inline-block" />
                  Start / End
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-primary-100 inline-block" />
                  In Range
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-red-50 border border-red-200 inline-block" />
                  Booked
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right: Price Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24 space-y-4"
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <h3 className="text-lg font-bold text-gray-900">
                Booking Summary
              </h3>

              {daysCount > 0 ? (
                <>
                  <div className="space-y-3 py-4 border-y border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rate (per day)</span>
                      <span className="font-medium text-gray-900">
                        {formatPrice(hoarding.price_per_day)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium text-gray-900">
                        {daysCount} day{daysCount !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Platform Fee</span>
                      <span className="font-bold text-green-600">FREE</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-900">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-primary-600">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  <button
                    onClick={handleProceedBooking}
                    disabled={selectedIds.size === 0 || isBooking}
                    className="w-full bg-primary-600 text-white font-semibold py-3 rounded-xl hover:bg-primary-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isBooking ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Proceed to Checkout"
                    )}
                  </button>
                </>
              ) : (
                <>
                  <div className="py-8 text-center">
                    <HiOutlineCalendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">
                      Select dates to see pricing
                    </p>
                  </div>

                  <button
                    disabled={true}
                    className="w-full bg-gray-300 text-gray-500 font-semibold py-3 rounded-xl cursor-not-allowed"
                  >
                    Proceed to Checkout
                  </button>
                </>
              )}

              <button
                onClick={() => navigate(-1)}
                className="w-full text-sm font-medium text-gray-600 hover:text-gray-900 py-2 transition-colors"
              >
                Change Hoarding
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
