import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  HiOutlineLogout,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineCreditCard,
  HiOutlineCog,
  HiOutlineArrowRight,
  HiOutlineBell,
} from "react-icons/hi";
import { getStoredAdvertiserData, logoutAdvertiser } from "../utils/authApi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [advertiser, setAdvertiser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const data = getStoredAdvertiserData();
    if (!data) {
      navigate("/advertiser/login");
      return;
    }
    setAdvertiser(data);
  }, [navigate]);

  const handleLogout = () => {
    logoutAdvertiser();
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (!advertiser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Welcome back, {advertiser.name}
              </p>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <HiOutlineBell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center text-white font-semibold">
                    {advertiser.name.charAt(0)}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">
                      {advertiser.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {advertiser.businessName}
                    </p>
                  </div>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-fade-in">
                    <a
                      href="#profile"
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 transition-colors"
                    >
                      <HiOutlineUser className="w-4 h-4" />
                      Profile
                    </a>
                    <a
                      href="#settings"
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 transition-colors"
                    >
                      <HiOutlineCog className="w-4 h-4" />
                      Settings
                    </a>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-sm text-red-600 transition-colors text-left"
                    >
                      <HiOutlineLogout className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
                  value: "0",
                  icon: HiOutlineCalendar,
                },
                {
                  label: "Total Spent",
                  value: "₹0",
                  icon: HiOutlineCreditCard,
                },
                {
                  label: "Available Budget",
                  value: "Unlimited",
                  icon: HiOutlineCreditCard,
                },
                { label: "Member Since", value: "Today", icon: HiOutlineUser },
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

            {/* Empty State Message */}
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
          </div>
        )}

        {activeTab === "bookings" && (
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
