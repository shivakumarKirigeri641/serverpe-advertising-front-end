import { Link } from "react-router-dom";
import {
  HiOutlineLocationMarker,
  HiOutlineTrendingUp,
  HiOutlineBadgeCheck,
  HiOutlineEye,
} from "react-icons/hi";

export default function HoardingCard({ hoarding }) {
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const trafficColor = {
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-orange-100 text-orange-700",
    "Very High": "bg-red-100 text-red-700",
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={hoarding.image}
          alt={hoarding.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
            trafficColor[hoarding.traffic] || "bg-gray-100 text-gray-600"
          }`}
        >
          {hoarding.traffic} Traffic
        </span>
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700 flex items-center gap-1">
            <HiOutlineBadgeCheck className="w-3.5 h-3.5" />
            Verified
          </span>
          {hoarding.lit && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary-100 text-primary-700">
              Lit
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 text-lg group-hover:text-primary-600 transition-colors">
          {hoarding.title}
        </h3>

        <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-500">
          <HiOutlineLocationMarker className="w-4 h-4 text-gray-400" />
          {hoarding.location}
        </div>

        <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
          <HiOutlineTrendingUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
          {hoarding.size}
        </div>

        <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
          <HiOutlineEye className="w-4 h-4 text-gray-400 flex-shrink-0" />
          {hoarding.impressionsPerDay} impressions/day
        </div>

        <div className="mt-3">
          <span className="inline-flex items-center gap-1 text-xs font-medium bg-accent-50 text-accent-600 px-3 py-1 rounded-full border border-accent-100">
            ✓ Installation Included
          </span>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Price
            </p>
            <p className="text-lg font-bold text-primary-600">
              {formatPrice(hoarding.price)}
            </p>
          </div>
          <Link
            to={`/hoardings/${hoarding.id}`}
            className="text-sm font-medium bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white px-4 py-2 rounded-lg transition-all duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
