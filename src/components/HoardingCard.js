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
    }).format(Number(price));

  const trafficName = hoarding.traffic?.name ?? "";

  const trafficColor = {
    "Low Traffic": "bg-green-100 text-green-700",
    "Medium Traffic": "bg-yellow-100 text-yellow-700",
    "High Traffic": "bg-orange-100 text-orange-700",
    "Very High Traffic": "bg-red-100 text-red-700",
  };

  const imageUrl = Array.isArray(hoarding.image_path)
    ? hoarding.image_path[0]
    : hoarding.image_path;

  const sizeLabel = `${hoarding.width_feet}ft x ${hoarding.height_feet}ft`;

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={imageUrl}
          alt={hoarding.hoarding_title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
            trafficColor[trafficName] || "bg-gray-100 text-gray-600"
          }`}
        >
          {trafficName}
        </span>
        <div className="absolute top-3 right-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700 flex items-center gap-1">
            <HiOutlineBadgeCheck className="w-3.5 h-3.5" />
            Verified
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 text-lg group-hover:text-primary-600 transition-colors">
          {hoarding.hoarding_title}
        </h3>

        <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-500">
          <HiOutlineLocationMarker className="w-4 h-4 text-gray-400 flex-shrink-0" />
          {hoarding.address1}, {hoarding.city}
        </div>

        <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
          <HiOutlineTrendingUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
          {sizeLabel}
        </div>

        <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
          <HiOutlineEye className="w-4 h-4 text-gray-400 flex-shrink-0" />
          Visibility score: {hoarding.total_visibility_score}/10
        </div>

        <div className="mt-3">
          <span className="inline-flex items-center gap-1 text-xs font-medium bg-accent-50 text-accent-600 px-3 py-1 rounded-full border border-accent-100">
            ✓ Installation Included
          </span>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Price / day
            </p>
            <p className="text-lg font-bold text-primary-600">
              {formatPrice(hoarding.price_per_day)}
              <span className="text-xs font-normal text-gray-400 ml-1">
                /day
              </span>
            </p>
            {hoarding.comparable_price && (
              <p className="text-xs text-gray-400 line-through">
                {formatPrice(hoarding.comparable_price)}
              </p>
            )}
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
