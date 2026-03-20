import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  HiOutlineLocationMarker,
  HiOutlineEye,
  HiOutlineClock,
  HiOutlineLightningBolt,
  HiOutlineArrowLeft,
  HiOutlineBadgeCheck,
  HiOutlineShieldCheck,
  HiOutlineCheckCircle,
  HiOutlinePhotograph,
} from "react-icons/hi";
import { getHoardingById, getHoardingByIdAuthenticated } from "../utils/api";
import { getStoredAdvertiserData } from "../utils/authApi";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function HoardingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hoarding, setHoarding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [days, setDays] = useState(1);
  const [advertiser, setAdvertiser] = useState(null);

  useEffect(() => {
    const advertiserData = getStoredAdvertiserData();
    setAdvertiser(advertiserData);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Use authenticated endpoint if advertiser is logged in
    const fetchHoarding = advertiser
      ? getHoardingByIdAuthenticated(id)
      : getHoardingById(id);

    fetchHoarding
      .then((res) => setHoarding(res.data.data))
      .catch(() => setError("Failed to load hoarding details."))
      .finally(() => setLoading(false));
  }, [id, advertiser]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
        <div className="h-4 bg-gray-100 rounded w-32 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-4">
            <div className="rounded-2xl bg-gray-100 aspect-[16/9]" />
            <div className="bg-gray-50 rounded-2xl h-48" />
          </div>
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-2xl h-64" />
          </div>
        </div>
      </div>
    );
  }

  if (!hoarding) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {error || "Hoarding not found"}
        </h2>
        <Link to="/hoardings" className="btn-primary">
          Back to Hoardings
        </Link>
      </div>
    );
  }

  const pricePerDay = Number(hoarding?.price_per_day) || 0;
  const totalPrice = pricePerDay * days;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back */}
      <Link
        to="/hoardings"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 mb-6 transition-colors"
      >
        <HiOutlineArrowLeft className="w-4 h-4" />
        Back to Hoardings
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: Image & Details */}
        <div className="lg:col-span-3 space-y-6">
          {/* Image Gallery */}
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <img
              src={hoarding.image_path[activeImage]}
              alt={hoarding.hoarding_title}
              className="w-full aspect-[16/9] object-cover"
            />
          </div>

          {/* Thumbnails */}
          {hoarding.image_path.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {hoarding.image_path.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-colors ${
                    activeImage === i
                      ? "border-primary-500"
                      : "border-transparent hover:border-primary-300"
                  }`}
                >
                  <img
                    src={src}
                    alt={`View ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Details */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {hoarding.hoarding_title}
            </h1>
            <p className="text-sm text-gray-400 mb-4">
              Code: {hoarding.hoarding_code}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: HiOutlineLocationMarker,
                  label: "Location",
                  value: `${hoarding.address1}, ${hoarding.city}`,
                },
                {
                  icon: HiOutlineEye,
                  label: "Visibility Score",
                  value: `${hoarding.total_visibility_score} / 10`,
                },
                {
                  icon: HiOutlineLightningBolt,
                  label: "Traffic",
                  value: hoarding.traffic?.name,
                },
                {
                  icon: HiOutlineClock,
                  label: "Road Type",
                  value: hoarding.road?.name,
                },
              ].map((d) => (
                <div key={d.label} className="bg-gray-50 rounded-xl p-4">
                  <d.icon className="w-5 h-5 text-primary-500 mb-2" />
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    {d.label}
                  </p>
                  <p className="text-sm font-semibold text-gray-900 mt-0.5">
                    {d.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
            <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
              <div className="text-center">
                <HiOutlineLocationMarker className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">
                  {hoarding.address1}, {hoarding.city}
                </p>
                <p className="text-gray-300 text-xs mt-1">
                  Map integration coming soon
                </p>
              </div>
            </div>
          </div>

          {/* What You Get */}
          <div className="bg-primary-50 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">What You Get</h3>
            <div className="space-y-3">
              {[
                {
                  icon: HiOutlineCheckCircle,
                  text: "Installation included — no extra charges",
                },
                {
                  icon: HiOutlineEye,
                  text: "High visibility — prime location, high footfall",
                },
                {
                  icon: HiOutlineLocationMarker,
                  text: "Prime location — verified and accurate",
                },
                {
                  icon: HiOutlinePhotograph,
                  text: "Photo + video proof via WhatsApp & SMS within 24 hours",
                },
                {
                  icon: HiOutlineShieldCheck,
                  text: "Transparent per-day pricing — pay only for the days you book",
                },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 leading-snug">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Proof of Past Campaigns */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-1">
              Real Installations
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Proof of past campaigns at this location
            </p>
            {hoarding.ad_image_path && hoarding.ad_image_path.length > 0 ? (
              <>
                <div className="grid grid-cols-3 gap-3">
                  {hoarding.ad_image_path.slice(0, 6).map((src, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xl overflow-hidden bg-gray-100"
                    >
                      <img
                        src={src}
                        alt={`Installation ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-3 text-center italic">
                  Real installations from actual campaigns at this location
                </p>
              </>
            ) : (
              <p className="text-xs text-gray-400 text-center py-8 italic">
                No installation photos available yet
              </p>
            )}
          </div>
        </div>

        {/* Right: Booking Section */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Price / day
                  </p>
                  <p className="text-3xl font-bold text-primary-600">
                    {formatPrice(hoarding.price_per_day)}
                    <span className="text-base font-normal text-gray-400 ml-1">
                      /day
                    </span>
                  </p>
                  {hoarding.comparable_price && (
                    <p className="text-sm text-gray-400 line-through mt-0.5">
                      {formatPrice(hoarding.comparable_price)}/day
                    </p>
                  )}
                </div>
                <span className="text-xs font-semibold bg-green-50 text-green-600 px-3 py-1 rounded-full">
                  Available
                </span>
              </div>

              {/* Launch Offer */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 flex items-center gap-3">
                <span className="text-xl">🎉</span>
                <div>
                  <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                    Limited Launch Offer
                  </p>
                  <p className="text-sm text-amber-700 leading-snug mt-0.5">
                    First <strong>5 advertisers</strong> get{" "}
                    <strong>0% platform fee</strong>. Only a few spots left!
                  </p>
                </div>
              </div>

              {/* Days selector + price breakdown */}
              <div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-100">
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                  Booking Duration
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <label className="text-sm text-gray-500 whitespace-nowrap">
                    Number of days
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={days}
                    onChange={(e) =>
                      setDays(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-24 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-900 text-center focus:outline-none focus:ring-2 focus:ring-primary-300"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Rate</span>
                    <span className="font-medium text-gray-900">
                      {formatPrice(hoarding.price_per_day)} / day
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-medium text-gray-900">
                      {days} {days === 1 ? "day" : "days"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Platform Fee</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </div>
                  <div className="border-t border-gray-200 pt-1.5 flex justify-between text-sm font-bold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-primary-600">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              {advertiser ? (
                <div>
                  <button
                    onClick={() => navigate(`/advertiser/booking/${id}`)}
                    className="w-full btn-primary text-lg py-3.5"
                  >
                    Book this Slot
                  </button>
                  <p className="text-xs text-gray-400 text-center mt-3">
                    {days} {days === 1 ? "day" : "days"} ·{" "}
                    {formatPrice(totalPrice)} total
                  </p>
                </div>
              ) : (
                <div>
                  <Link
                    to="/advertiser/login"
                    className="w-full btn-primary text-lg py-3.5 flex items-center justify-center"
                  >
                    Login to Book
                  </Link>
                  <p className="text-xs text-gray-400 text-center mt-3">
                    Login as an advertiser to book this slot
                  </p>
                </div>
              )}
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">
                Quick Details
              </h3>
              <div className="space-y-3">
                {[
                  {
                    label: "Size",
                    value: `${hoarding.width_feet}ft × ${hoarding.height_feet}ft`,
                  },
                  {
                    label: "Facing",
                    value: hoarding.facing_direction?.name,
                  },
                  { label: "City", value: hoarding.city },
                  { label: "Hoarding Code", value: hoarding.hoarding_code },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                  >
                    <span className="text-sm text-gray-500">{item.label}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-1">
                Trust &amp; Safety
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Your most trusted hoarding platform
              </p>
              <div className="space-y-3">
                {[
                  {
                    icon: HiOutlineBadgeCheck,
                    text: "Verified hoarding location",
                    color: "text-green-500",
                  },
                  {
                    icon: HiOutlineShieldCheck,
                    text: "100% secure payment — escrow protected",
                    color: "text-primary-500",
                  },
                  {
                    icon: HiOutlineClock,
                    text: "Real-time updates via SMS & WhatsApp",
                    color: "text-blue-500",
                  },
                  {
                    icon: HiOutlinePhotograph,
                    text: "Photo + video proof before 2nd payment",
                    color: "text-orange-500",
                  },
                  {
                    icon: HiOutlineCheckCircle,
                    text: "Transparent per-day billing — book for any number of days",
                    color: "text-emerald-500",
                  },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <item.icon
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${item.color}`}
                    />
                    <span className="text-sm text-gray-700 leading-snug">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-green-50 rounded-xl p-3">
                <p className="text-xs text-green-700 font-semibold text-center leading-relaxed">
                  🔒 Your payment NEVER goes to the hoarding owner until you see
                  proof
                </p>
              </div>
            </div>

            {/* Help */}
            <div className="bg-primary-50 rounded-2xl p-5 text-center">
              <p className="text-sm text-primary-700 font-medium">
                Need help booking?
              </p>
              <Link
                to="/contact"
                className="text-sm text-primary-600 hover:text-primary-700 font-semibold mt-1 inline-block"
              >
                Contact our team &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
