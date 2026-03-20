import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineLogout,
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineBell,
  HiOutlineHome,
} from "react-icons/hi";
import { toast } from "react-toastify";
import { getStoredAdvertiserData, logoutAdvertiser } from "../utils/authApi";

export default function AdvertiserNavbar() {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const advertiser = getStoredAdvertiserData();

  const handleLogout = () => {
    logoutAdvertiser();
    toast.success("Logged out successfully");
    setShowProfileMenu(false);
    navigate("/");
  };

  if (!advertiser) return null;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SP</span>
            </div>
            <span className="text-lg font-bold text-gray-900">
              ServerPe<sup className="text-[10px] align-super font-bold">™</sup>{" "}
              <span className="text-primary-600">Ads</span>
            </span>
          </Link>

          {/* Center links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/hoardings"
              className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
            >
              Browse Hoardings
            </Link>
            <Link
              to="/advertiser/dashboard"
              className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors flex items-center gap-2"
            >
              <HiOutlineHome className="w-4 h-4" />
              Dashboard
            </Link>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <HiOutlineBell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1.5 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {advertiser.name.charAt(0)}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-medium text-gray-900">
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
    </nav>
  );
}
