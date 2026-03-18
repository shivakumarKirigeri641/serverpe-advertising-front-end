import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
import { getHoardingById } from "../utils/api";
import mockHoardings from "../data/hoardings";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function HoardingDetails() {
  const { id } = useParams();
  const [hoarding, setHoarding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quoteRequested, setQuoteRequested] = useState(false);

  useEffect(() => {
    setLoading(true);
    // TODO: Replace mock fallback with real data once API is connected
    getHoardingById(id)
      .then((res) => setHoarding(res.data))
      .catch(() => {
        const found = mockHoardings.find((h) => h.id === Number(id));
        setHoarding(found || null);
      })
      .finally(() => setLoading(false));
  }, [id]);

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
          Hoarding not found
        </h2>
        <Link to="/hoardings" className="btn-primary">
          Back to Hoardings
        </Link>
      </div>
    );
  }

  const handleGetQuote = (e) => {
    e.preventDefault();
    setQuoteRequested(true);
  };

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
              src={hoarding.image}
              alt={hoarding.title}
              className="w-full aspect-[16/9] object-cover"
            />
          </div>

          {/* Thumbnails placeholder */}
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-gray-100 overflow-hidden border-2 border-transparent hover:border-primary-300 transition-colors cursor-pointer"
              >
                <img
                  src={hoarding.image}
                  alt=""
                  className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {hoarding.title}
            </h1>
            <p className="text-gray-500 leading-relaxed mb-6">
              {hoarding.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: HiOutlineLocationMarker,
                  label: "Location",
                  value: hoarding.location,
                },
                {
                  icon: HiOutlineEye,
                  label: "Visibility",
                  value: hoarding.visibility,
                },
                {
                  icon: HiOutlineLightningBolt,
                  label: "Traffic",
                  value: hoarding.traffic,
                },
                {
                  icon: HiOutlineClock,
                  label: "Impressions/Day",
                  value: hoarding.impressionsPerDay,
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
                <p className="text-gray-400 text-sm">{hoarding.location}</p>
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
                  text: "50% payment only — remaining 50% after you confirm proof",
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
              Proof of Past Campaigns
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Real installations at this and similar locations
            </p>
            <div className="grid grid-cols-3 gap-3">
              {mockHoardings.slice(0, 3).map((h, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl overflow-hidden bg-gray-100"
                >
                  <img
                    src={h.image}
                    alt={`Campaign proof ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center italic">
              Sample installations — actual photo proof sent upon booking
            </p>
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
                    Price
                  </p>
                  <p className="text-3xl font-bold text-primary-600">
                    {formatPrice(hoarding.price)}
                  </p>
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

              {/* Payment Breakdown */}
              <div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-100">
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2.5">
                  Payment Breakdown
                </p>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Ad Placement</span>
                    <span className="font-medium text-gray-900">
                      {formatPrice(hoarding.price)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Platform Fee</span>
                    <span className="font-medium text-gray-900 flex items-center gap-1.5">
                      <span className="line-through text-gray-400">
                        {formatPrice(Math.round(hoarding.price * 0.05))}
                      </span>
                      <span className="text-green-600 font-bold">FREE</span>
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-1.5 flex justify-between text-sm font-bold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-primary-600">
                      {formatPrice(hoarding.price)}
                    </span>
                  </div>
                </div>
                <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
                  <div className="flex">
                    <div className="flex-1 bg-primary-50 px-3 py-2 text-center border-r border-gray-200">
                      <p className="text-xs text-primary-600 font-semibold">
                        Pay to Book
                      </p>
                      <p className="text-sm font-bold text-primary-700 mt-0.5">
                        {formatPrice(Math.round(hoarding.price * 0.5))}
                      </p>
                      <p className="text-[10px] text-primary-400 mt-0.5">
                        50% upfront
                      </p>
                    </div>
                    <div className="flex-1 bg-green-50 px-3 py-2 text-center">
                      <p className="text-xs text-green-600 font-semibold">
                        After Proof
                      </p>
                      <p className="text-sm font-bold text-green-700 mt-0.5">
                        {formatPrice(Math.round(hoarding.price * 0.5))}
                      </p>
                      <p className="text-[10px] text-green-400 mt-0.5">
                        50% on confirmation
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2.5 text-center leading-relaxed">
                  🔒 2nd payment released only after you confirm installation
                  proof via WhatsApp/SMS
                </p>
              </div>

              {/* Quote / Book Form */}
              {quoteRequested ? (
                <div className="space-y-3">
                  <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
                    <p className="text-green-700 font-bold text-base">
                      🎉 Quote request sent!
                    </p>
                    <p className="text-green-600 text-sm mt-1 leading-relaxed">
                      You'll receive your detailed quote via{" "}
                      <strong>SMS &amp; WhatsApp</strong> shortly.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">
                      🔔 What Happens Next
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Review your quote with full pricing details",
                        "Pay 50% to confirm your booking",
                        "Ad installed with photo & video proof sent to you",
                        "Approve the installation, then pay remaining 50%",
                      ].map((line) => (
                        <li
                          key={line}
                          className="flex items-start gap-2 text-sm text-blue-700"
                        >
                          <span className="flex-shrink-0 mt-0.5">✓</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => setQuoteRequested(false)}
                    className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium py-2"
                  >
                    Request another quote
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    onClick={handleGetQuote}
                    className="w-full btn-primary text-lg py-3.5"
                  >
                    Get a Quote
                  </button>
                  <p className="text-xs text-gray-400 text-center mt-3">
                    No commitment — review your quote before paying
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
                  { label: "Size", value: hoarding.size },
                  {
                    label: "Lighting",
                    value: hoarding.lit ? "Yes — Illuminated" : "No",
                  },
                  { label: "City", value: hoarding.city },
                  {
                    label: "Daily Views",
                    value: hoarding.views.toLocaleString("en-IN"),
                  },
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
                    text: "50% upfront · 50% after you confirm proof",
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
