import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineCreditCard,
  HiOutlineArrowRight,
  HiOutlineLocationMarker,
  HiOutlineChevronDown,
  HiOutlineOfficeBuilding,
  HiOutlineTrendingUp,
  HiOutlineEye,
  HiOutlineCash,
  HiOutlinePencilAlt,
  HiOutlineX,
} from "react-icons/hi";
import { getStoredAdvertiserData } from "../utils/authApi";
import { getMyHoardings } from "../utils/api";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
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
  }).format(n);

const STATUS_COLORS = {
  CONFIRMED: "bg-green-100 text-green-700",
  BOOKED: "bg-blue-100 text-blue-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  CANCELLED: "bg-gray-100 text-gray-400 line-through",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [advertiser, setAdvertiser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [myHoardings, setMyHoardings] = useState(null);
  const [hoardingsLoading, setHoardingsLoading] = useState(false);
  const [expandedHoarding, setExpandedHoarding] = useState(null);

  useEffect(() => {
    const data = getStoredAdvertiserData();
    if (!data) {
      navigate("/advertiser/login");
      return;
    }
    setAdvertiser(data);
  }, [navigate]);

  useEffect(() => {
    if (!advertiser) return;
    setHoardingsLoading(true);
    getMyHoardings()
      .then((res) => {
        setMyHoardings(res.data?.data?.result || []);
      })
      .catch(() => setMyHoardings([]))
      .finally(() => setHoardingsLoading(false));
  }, [advertiser]);

  const stats = useMemo(() => {
    if (!myHoardings) return { activeBookings: 0, totalSpent: 0 };
    let active = 0;
    let spent = 0;
    myHoardings.forEach((group) => {
      group.hoardings?.forEach((h) => {
        const pricePerDay = Number(h.pricing?.price_per_day) || 0;
        h.bookings?.forEach((b) => {
          const status = b.status || b.temp_status;
          if (status === "CONFIRMED" || status === "BOOKED") {
            active++;
            spent += pricePerDay;
          }
        });
      });
    });
    return { activeBookings: active, totalSpent: spent };
  }, [myHoardings]);

  if (!advertiser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back, {advertiser.name}
          </p>
        </div>
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {[
            { id: "overview", label: "Overview" },
            { id: "bookings", label: "My Bookings" },
            { id: "payments", label: "Payments" },
            { id: "profile", label: "Profile" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium transition-all border-b-2 ${
                activeTab === tab.id
                  ? "border-primary-600 text-primary-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: "Active Bookings",
                  value:
                    myHoardings === null
                      ? "—"
                      : stats.activeBookings.toString(),
                  icon: HiOutlineCalendar,
                },
                {
                  label: "Total Spent",
                  value: myHoardings === null ? "—" : fmtINR(stats.totalSpent),
                  icon: HiOutlineCreditCard,
                },
                {
                  label: "Wallet",
                  value: "Coming Soon",
                  icon: HiOutlineCash,
                },
                {
                  label: "Member Since",
                  value: advertiser.createdAt
                    ? new Date(advertiser.createdAt).toLocaleDateString(
                        "en-IN",
                        { month: "short", year: "numeric" },
                      )
                    : "—",
                  icon: HiOutlineUser,
                },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </h3>
                    <stat.icon className="w-5 h-5 text-primary-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <motion.div
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => navigate("/hoardings")}
                  className="flex items-center justify-between p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl hover:shadow-md transition-all group"
                >
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">
                      Browse Hoardings
                    </p>
                    <p className="text-sm text-gray-600 mt-0.5">
                      Find new locations
                    </p>
                  </div>
                  <HiOutlineArrowRight className="w-5 h-5 text-primary-600 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="flex items-center justify-between p-4 bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl hover:shadow-md transition-all group">
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">
                      View Campaigns
                    </p>
                    <p className="text-sm text-gray-600 mt-0.5">
                      Track your ads
                    </p>
                  </div>
                  <HiOutlineArrowRight className="w-5 h-5 text-accent-600 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {stats.activeBookings > 0 ? (
              <motion.div
                className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 flex items-center justify-between"
                variants={fadeUp}
                custom={5}
                initial="hidden"
                animate="visible"
              >
                <div>
                  <p className="text-sm font-medium text-green-700 mb-1">
                    Active Campaigns
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.activeBookings} booking
                    {stats.activeBookings !== 1 ? "s" : ""} running
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("bookings")}
                  className="flex items-center gap-2 bg-green-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  View Bookings <HiOutlineArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center"
                variants={fadeUp}
                custom={5}
                initial="hidden"
                animate="visible"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-200 rounded-full mb-4">
                  <HiOutlineCalendar className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Active Bookings
                </h3>
                <p className="text-gray-600 mb-4">
                  Start by browsing our premium hoarding locations and book your
                  first campaign today!
                </p>
                <button
                  onClick={() => navigate("/hoardings")}
                  className="inline-block bg-primary-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Explore Hoardings
                </button>
              </motion.div>
            )}
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="space-y-8">
            {hoardingsLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
              </div>
            ) : !myHoardings || myHoardings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm text-center py-16">
                <HiOutlineCalendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Bookings Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  You haven't made any hoarding bookings yet
                </p>
                <button
                  onClick={() => navigate("/hoardings")}
                  className="inline-block bg-primary-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Browse Hoardings
                </button>
              </div>
            ) : (
              myHoardings.map((group, gi) => (
                <motion.div
                  key={gi}
                  custom={gi}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="space-y-3"
                >
                  {/* Business type label */}
                  <div className="flex items-center gap-2 px-1">
                    <HiOutlineOfficeBuilding className="w-4 h-4 text-gray-400" />
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                      {group.business_type_name}
                    </h2>
                  </div>

                  {group.hoardings?.map((h) => {
                    const isExpanded =
                      expandedHoarding === h.hoarding_profile_id;
                    const ranges = computeDateRanges(h.bookings);
                    const confirmedCount =
                      h.bookings?.filter(
                        (b) =>
                          (b.status || b.temp_status) === "CONFIRMED" ||
                          (b.status || b.temp_status) === "BOOKED",
                      ).length || 0;

                    return (
                      <div
                        key={h.hoarding_profile_id}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                      >
                        {/* ── Accordion Header (always visible) ───────────────── */}
                        <button
                          onClick={() =>
                            setExpandedHoarding(
                              isExpanded ? null : h.hoarding_profile_id,
                            )
                          }
                          className="w-full text-left px-6 py-5 flex items-start justify-between hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex-1 min-w-0 pr-4">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900 text-base">
                                {h.hoarding_name}
                              </h3>
                              {confirmedCount > 0 && (
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                                  {confirmedCount} confirmed
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <HiOutlineLocationMarker className="w-3.5 h-3.5" />
                                {h.city}
                              </span>
                              <span className="flex items-center gap-1">
                                <HiOutlineCreditCard className="w-3.5 h-3.5" />
                                {fmtINR(h.pricing?.price_per_day || 0)}/day
                              </span>
                              <span className="flex items-center gap-1">
                                <HiOutlineCalendar className="w-3.5 h-3.5" />
                                {h.bookings?.length || 0} date
                                {(h.bookings?.length || 0) !== 1
                                  ? "s"
                                  : ""}{" "}
                                booked
                              </span>
                            </div>
                          </div>
                          <HiOutlineChevronDown
                            className={`w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5 transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* ── Accordion Body ───────────────────────────────── */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              key="body"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              {/* Details strip */}
                              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div>
                                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                                    Owner
                                  </p>
                                  <p className="text-sm font-medium text-gray-700">
                                    {h.owner?.name || "—"}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {h.owner?.mobile}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                                    Daily Impressions
                                  </p>
                                  <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    <HiOutlineTrendingUp className="w-3.5 h-3.5 text-primary-500" />
                                    {h.impressions?.daily?.toLocaleString(
                                      "en-IN",
                                    ) || "—"}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                                    Monthly Impressions
                                  </p>
                                  <p className="text-sm font-medium text-gray-700">
                                    {h.impressions?.monthly?.toLocaleString(
                                      "en-IN",
                                    ) || "—"}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                                    Visibility Score
                                  </p>
                                  <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    <HiOutlineEye className="w-3.5 h-3.5 text-primary-500" />
                                    {h.visibility?.total_score ?? "—"}
                                  </p>
                                </div>
                              </div>

                              {/* Booking date ranges */}
                              <div className="px-6 py-4 border-t border-gray-100">
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                                  Booking Ranges ({ranges.length} range
                                  {ranges.length !== 1 ? "s" : ""})
                                </p>
                                {ranges.length === 0 ? (
                                  <p className="text-sm text-gray-400">
                                    No bookings found
                                  </p>
                                ) : (
                                  <div className="space-y-2">
                                    {ranges.map((r, ri) => {
                                      const days =
                                        Math.round(
                                          (new Date(r.to) - new Date(r.from)) /
                                            86400000,
                                        ) + 1;
                                      const colorClass =
                                        STATUS_COLORS[r.status] ||
                                        "bg-gray-100 text-gray-500";
                                      const isSameDay = r.from === r.to;
                                      return (
                                        <div
                                          key={ri}
                                          className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
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
                                                  {days} day
                                                  {days !== 1 ? "s" : ""}
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
                                              {fmtINR(
                                                (h.pricing?.price_per_day ||
                                                  0) * days,
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>

                              {/* Footer actions */}
                              <div className="px-6 py-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                                <div className="flex flex-wrap items-center gap-2">
                                  {/* Modify Dates */}
                                  <button
                                    onClick={() =>
                                      navigate(
                                        `/advertiser/booking/${h.hoarding_profile_id}/action`,
                                        {
                                          state: {
                                            action: "modify",
                                            bookingData: h,
                                          },
                                        },
                                      )
                                    }
                                    className="flex items-center gap-1.5 px-4 py-2 bg-primary-50 text-primary-700 font-medium text-sm rounded-xl hover:bg-primary-100 transition-colors"
                                  >
                                    <HiOutlinePencilAlt className="w-4 h-4" />
                                    Modify Dates
                                  </button>

                                  {/* Cancel Booking */}
                                  <button
                                    onClick={() =>
                                      navigate(
                                        `/advertiser/booking/${h.hoarding_profile_id}/action`,
                                        {
                                          state: {
                                            action: "cancel",
                                            bookingData: h,
                                          },
                                        },
                                      )
                                    }
                                    className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-600 font-medium text-sm rounded-xl hover:bg-red-100 transition-colors"
                                  >
                                    <HiOutlineX className="w-4 h-4" />
                                    Cancel Booking
                                  </button>
                                </div>

                                <button
                                  onClick={() =>
                                    navigate(
                                      `/advertiser/booking/${h.hoarding_profile_id}`,
                                    )
                                  }
                                  className="text-xs font-medium text-gray-400 hover:text-primary-600 flex items-center gap-1 transition-colors"
                                >
                                  Book More Dates{" "}
                                  <HiOutlineArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </motion.div>
              ))
            )}
          </div>
        )}

        {activeTab === "payments" && (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm text-center py-16">
            <HiOutlineCreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Payment History
            </h3>
            <p className="text-gray-600">
              Your payment history will appear here once you make a booking
            </p>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {advertiser.name.charAt(0)}
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {advertiser.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {advertiser.businessName}
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Phone
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
              </div>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  Account Information
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={advertiser.businessName}
                      disabled
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      value={advertiser.name}
                      disabled
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={advertiser.phoneNumber}
                      disabled
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                    />
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                      Edit Profile (Coming Soon)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
