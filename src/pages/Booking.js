import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  HiOutlineArrowLeft,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineTrendingUp,
  HiOutlineEye,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
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

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [advertiser, setAdvertiser] = useState(null);

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isSelectingRange, setIsSelectingRange] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const advertiserData = getStoredAdvertiserData();
    if (!advertiserData) {
      navigate("/advertiser/login");
      return;
    }
    setAdvertiser(advertiserData);

    // Fetch booking details
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

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 59);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    clickedDate.setHours(0, 0, 0, 0);

    // Check if date is within valid range
    if (clickedDate < today || clickedDate > maxDate) {
      return;
    }

    if (!startDate || (startDate && endDate)) {
      // Start new selection
      setStartDate(clickedDate);
      setEndDate(null);
      setIsSelectingRange(true);
    } else {
      // End selection
      if (clickedDate < startDate) {
        // If clicked date is before start, swap them
        setEndDate(startDate);
        setStartDate(clickedDate);
      } else {
        setEndDate(clickedDate);
      }
      setIsSelectingRange(false);
    }
  };

  const isDateInRange = (day) => {
    if (!startDate || !endDate) return false;
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    date.setHours(0, 0, 0, 0);
    return date >= startDate && date <= endDate;
  };

  const isDateSelected = (day) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    date.setHours(0, 0, 0, 0);
    return (startDate && date.getTime() === startDate.getTime()) ||
      (endDate && date.getTime() === endDate.getTime())
      ? true
      : false;
  };

  const isDateDisabled = (day) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    date.setHours(0, 0, 0, 0);
    return date < today || date > maxDate;
  };

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const daysCount = calculateDays();
  const totalPrice =
    bookingData && daysCount > 0
      ? Number(bookingData.price_per_day) * daysCount
      : 0;

  const renderCalendar = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="p-2 text-gray-200 text-sm font-medium"
        />,
      );
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const isDisabled = isDateDisabled(day);
      const isSelected = isDateSelected(day);
      const inRange = isDateInRange(day);

      days.push(
        <button
          key={day}
          onClick={() => !isDisabled && handleDateClick(day)}
          disabled={isDisabled}
          className={`p-2 text-sm font-medium rounded-lg transition-all ${
            isDisabled
              ? "text-gray-300 cursor-not-allowed bg-gray-50"
              : isSelected
                ? "bg-primary-600 text-white"
                : inRange
                  ? "bg-primary-100 text-primary-700"
                  : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {day}
        </button>,
      );
    }

    return days;
  };

  const monthYear = currentMonth.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  // Check hoarding availability
  const isHoardingAvailable =
    bookingData && bookingData.hoarding_status_name === "AVAILABLE";

  // Get selected booking IDs for date range
  const getSelectedBookingIds = () => {
    if (!startDate || !endDate || !bookingData?.dates) return [];
    return bookingData.dates
      .filter((dateItem) => {
        const itemDate = new Date(dateItem.ad_dates);
        itemDate.setHours(0, 0, 0, 0);
        return itemDate >= startDate && itemDate <= endDate;
      })
      .map((dateItem) => dateItem.id);
  };

  const handleProceedBooking = async () => {
    const bookingIds = getSelectedBookingIds();
    if (bookingIds.length === 0) {
      toast.error("Please select dates");
      return;
    }

    setIsBooking(true);
    try {
      const res = await bookHoardingSlot({ booking_ids: bookingIds });
      if (res.data.successstatus) {
        // Navigate to checkout summary with booking data
        navigate("/advertiser/booking/checkout", {
          state: {
            bookingIds,
            bookingReference: res.data.data.booking_reference,
            bookingData,
            advertiser,
            startDate,
            endDate,
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
      opacity: 1, y: 0,
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

            {/* Calendar Card */}
            <motion.div
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <HiOutlineCalendar className="w-5 h-5 text-primary-600" />
                Select Booking Dates
              </h3>

              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() - 1,
                      ),
                    )
                  }
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <HiOutlineChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h4 className="text-sm font-semibold text-gray-900">
                  {monthYear}
                </h4>
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() + 1,
                      ),
                    )
                  }
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <HiOutlineChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-xs font-semibold text-gray-500 py-2"
                    >
                      {day}
                    </div>
                  ),
                )}
                {renderCalendar()}
              </div>

              {/* Date Info */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                {startDate && endDate ? (
                  <div>
                    <p className="text-blue-800">
                      <strong>Selected:</strong>{" "}
                      {startDate.toLocaleDateString("en-IN")} to{" "}
                      {endDate.toLocaleDateString("en-IN")}
                    </p>
                    <p className="text-blue-700 mt-1">
                      <strong>
                        {daysCount} day{daysCount !== 1 ? "s" : ""}
                      </strong>{" "}
                      selected
                    </p>
                  </div>
                ) : startDate ? (
                  <p className="text-blue-800">
                    <strong>Start:</strong>{" "}
                    {startDate.toLocaleDateString("en-IN")} — Select end date
                  </p>
                ) : (
                  <p className="text-blue-700">
                    Click on a date to start selecting (max 59 days from today)
                  </p>
                )}
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
                    disabled={!startDate || !endDate || isBooking}
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
