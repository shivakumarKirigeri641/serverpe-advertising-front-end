import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineArrowLeft,
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineExclamation,
  HiOutlinePencilAlt,
  HiOutlineX,
  HiOutlineCash,
  HiOutlineEye,
  HiOutlineTrendingUp,
  HiOutlineCheck,
} from "react-icons/hi";
import { getHoardingByIdAuthenticated } from "../utils/api";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const fmtINR = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);

const STATUS_COLORS = {
  CONFIRMED: "bg-green-100 text-green-700",
  BOOKED: "bg-blue-100 text-blue-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  CANCELLED: "bg-gray-100 text-gray-400 line-through",
};

function computeDateRanges(bookings) {
  if (!bookings?.length) return [];
  const sorted = [...bookings].sort(
    (a, b) => new Date(a.ad_dates) - new Date(b.ad_dates),
  );
  const ranges = [];
  let start = sorted[0];
  let prev = sorted[0];
  for (let i = 1; i < sorted.length; i++) {
    const curr = sorted[i];
    const prevStatus = prev.status || prev.temp_status || "PENDING";
    const currStatus = curr.status || curr.temp_status || "PENDING";
    const diff = Math.round(
      (new Date(curr.ad_dates) - new Date(prev.ad_dates)) / 86400000,
    );
    if (diff === 1 && currStatus === prevStatus) {
      prev = curr;
    } else {
      ranges.push({
        from: start.ad_dates,
        to: prev.ad_dates,
        status: prevStatus,
      });
      start = curr;
      prev = curr;
    }
  }
  ranges.push({
    from: start.ad_dates,
    to: prev.ad_dates,
    status: prev.status || prev.temp_status || "PENDING",
  });
  return ranges;
}

export default function BookingAction() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // action: "modify" | "cancel", bookingData: the hoarding object from myHoardings
  const { action = "cancel", bookingData = null } = location.state || {};

  const [hoarding, setHoarding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isCancel = action === "cancel";
  const isModify = action === "modify";

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getHoardingByIdAuthenticated(id)
      .then((res) => setHoarding(res.data?.data || null))
      .catch(() => setError("Failed to load hoarding details."))
      .finally(() => setLoading(false));
  }, [id]);

  const ranges = computeDateRanges(bookingData?.bookings);

  const totalDays = bookingData?.bookings?.length || 0;
  const pricePerDay = Number(bookingData?.pricing?.price_per_day) || 0;
  const totalValue = totalDays * pricePerDay;

  const confirmedDays =
    bookingData?.bookings?.filter(
      (b) =>
        (b.status || b.temp_status) === "CONFIRMED" ||
        (b.status || b.temp_status) === "BOOKED",
    ).length || 0;
  const walletCreditAmount = confirmedDays * pricePerDay;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="text-primary-600 hover:underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        {/* Page header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-1">
            {isCancel ? (
              <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                <HiOutlineX className="w-3.5 h-3.5" />
                Cancel Booking
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                <HiOutlinePencilAlt className="w-3.5 h-3.5" />
                Modify Booking
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isCancel ? "Cancel Hoarding Booking" : "Modify Booking Dates"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review your booking details below before proceeding.
          </p>
        </motion.div>

        {/* Hoarding Details Card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5"
        >
          {/* Image strip */}
          {hoarding?.image_path?.length > 0 && (
            <div className="h-48 overflow-hidden">
              <img
                src={hoarding.image_path[0]}
                alt={hoarding.hoarding_name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {hoarding?.hoarding_title ||
                    hoarding?.hoarding_name ||
                    bookingData?.hoarding_name}
                </h2>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <HiOutlineLocationMarker className="w-3.5 h-3.5" />
                  {hoarding?.address1 || hoarding?.area},{" "}
                  {hoarding?.city || bookingData?.city}
                  {hoarding?.pincode ? ` – ${hoarding.pincode}` : ""}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-gray-400">Price/day</p>
                <p className="text-lg font-bold text-gray-900">
                  {fmtINR(hoarding?.price_per_day || pricePerDay)}
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                  Visibility Score
                </p>
                <p className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                  <HiOutlineEye className="w-3.5 h-3.5 text-primary-500" />
                  {hoarding?.total_visibility_score ??
                    bookingData?.visibility?.total_score ??
                    "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                  Daily Impressions
                </p>
                <p className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                  <HiOutlineTrendingUp className="w-3.5 h-3.5 text-primary-500" />
                  {(
                    hoarding?.daily_impressions ??
                    bookingData?.impressions?.daily
                  )?.toLocaleString("en-IN") || "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                  Size
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  {hoarding?.size_name ||
                    (hoarding?.width_feet && hoarding?.height_feet
                      ? `${hoarding.width_feet}ft × ${hoarding.height_feet}ft`
                      : "—")}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Current Bookings Summary */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">
              Current Bookings
            </h3>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>
                <strong className="text-gray-800">{totalDays}</strong> day
                {totalDays !== 1 ? "s" : ""}
              </span>
              <span>·</span>
              <span className="font-semibold text-gray-900">
                {fmtINR(totalValue)}
              </span>
            </div>
          </div>

          {ranges.length === 0 ? (
            <p className="text-sm text-gray-400">No bookings found.</p>
          ) : (
            <div className="space-y-2">
              {ranges.map((r, ri) => {
                const days =
                  Math.round((new Date(r.to) - new Date(r.from)) / 86400000) +
                  1;
                const isSameDay = r.from === r.to;
                const colorClass =
                  STATUS_COLORS[r.status] || "bg-gray-100 text-gray-500";
                return (
                  <div
                    key={ri}
                    className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <HiOutlineCalendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {isSameDay
                            ? fmtDate(r.from)
                            : `${fmtDate(r.from)} → ${fmtDate(r.to)}`}
                        </p>
                        {!isSameDay && (
                          <p className="text-xs text-gray-500">
                            {days} day{days !== 1 ? "s" : ""}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colorClass}`}
                      >
                        {r.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {fmtINR(pricePerDay * days)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* ── CANCEL notice ─────────────────────────────────────────── */}
        {isCancel && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mb-5"
          >
            {/* Wallet credit notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-9 h-9 bg-amber-100 rounded-full flex items-center justify-center">
                  <HiOutlineCash className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800 mb-1">
                    Cancellation adds to your Wallet — not a refund
                  </h4>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    Cancellations do <strong>not</strong> result in a direct
                    refund to your payment method. Instead, the equivalent
                    amount is credited to your{" "}
                    <strong>ServerPe Ads Wallet</strong>, which you can use for
                    future hoarding bookings on this platform.
                  </p>
                </div>
              </div>
            </div>

            {/* What you'll receive */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                Cancellation Summary
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total booked days</span>
                  <span className="font-medium text-gray-900">
                    {totalDays} day{totalDays !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Rate per day</span>
                  <span className="font-medium text-gray-900">
                    {fmtINR(pricePerDay)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Confirmed / booked days</span>
                  <span className="font-medium text-gray-900">
                    {confirmedDays} day{confirmedDays !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="pt-3 border-t border-gray-100 flex justify-between">
                  <span className="text-sm font-semibold text-gray-800">
                    Wallet credit on cancellation
                  </span>
                  <span className="text-lg font-bold text-green-700">
                    {fmtINR(walletCreditAmount)}
                  </span>
                </div>
              </div>

              {/* Key points */}
              <ul className="mt-4 space-y-1.5">
                {[
                  "Amount credited to wallet within 24 hours of cancellation.",
                  "Wallet balance can be applied to any future booking.",
                  "No cash refunds will be issued for cancellations.",
                  "Pending dates (not yet confirmed) are not eligible for credit.",
                ].map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-gray-500"
                  >
                    <HiOutlineCheck className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Warning */}
            <div className="mt-4 flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl p-4">
              <HiOutlineExclamation className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">
                <strong>This action cannot be undone.</strong> Once confirmed,
                your booking will be permanently cancelled and the wallet credit
                will be processed.
              </p>
            </div>
          </motion.div>
        )}

        {/* ── MODIFY notice ─────────────────────────────────────────── */}
        {isModify && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="bg-primary-50 border border-primary-200 rounded-2xl p-5 mb-5"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center">
                <HiOutlinePencilAlt className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h4 className="font-semibold text-primary-800 mb-1">
                  Modifying your booking
                </h4>
                <p className="text-sm text-primary-700 leading-relaxed">
                  You can add more available dates to this hoarding from the
                  booking page. To remove specific dates, use the{" "}
                  <strong>Cancel Booking</strong> option instead and re-book
                  only the dates you need.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="flex flex-col sm:flex-row gap-3"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            Go Back
          </button>

          {isModify && (
            <button
              onClick={() => navigate(`/advertiser/booking/${id}`)}
              className="flex-1 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
            >
              <HiOutlinePencilAlt className="w-4 h-4" />
              Go to Booking Page
            </button>
          )}

          {isCancel && (
            <button
              disabled
              title="Cancellation — coming soon"
              className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <HiOutlineX className="w-4 h-4" />
              Confirm Cancellation
            </button>
          )}
        </motion.div>

        {isCancel && (
          <p className="text-center text-xs text-gray-400 mt-3">
            Cancellation processing is coming soon — the summary above reflects
            what will happen.
          </p>
        )}
      </div>
    </div>
  );
}
