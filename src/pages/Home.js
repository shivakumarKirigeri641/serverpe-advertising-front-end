import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineSearch,
  HiOutlineCursorClick,
  HiOutlineBadgeCheck,
  HiOutlineShieldCheck,
  HiOutlinePhotograph,
  HiOutlineCurrencyRupee,
  HiOutlinePhone,
} from "react-icons/hi";
import HoardingCard from "../components/HoardingCard";
import PaymentModal from "../components/PaymentModal";
import { getHoardings } from "../utils/api";
import mockHoardings from "../data/hoardings";

const steps = [
  {
    icon: HiOutlineSearch,
    title: "Browse Hoardings",
    description:
      "Explore verified billboard locations across major cities with transparent pricing and traffic data.",
  },
  {
    icon: HiOutlineCursorClick,
    title: "Get a Quote",
    description:
      "Found the right spot? Request a quote instantly. Transparent pricing with no hidden fees.",
  },
  {
    icon: HiOutlineBadgeCheck,
    title: "Review, Pay & Go Live",
    description:
      "Review your quote, confirm your booking, and launch your campaign. I handle the rest — from installation to proof of display.",
  },
];

const whyChooseItems = [
  {
    icon: HiOutlineCurrencyRupee,
    title: "Transparent Pricing",
    description:
      "No hidden fees. You see exactly what you pay — ad placement cost and total. Always. First 5 advertisers pay zero platform fee.",
  },
  {
    icon: HiOutlineBadgeCheck,
    title: "Verified Locations",
    description:
      "Every hoarding is personally verified for location accuracy, size, and visibility before listing.",
  },
  {
    icon: HiOutlinePhotograph,
    title: "Proof of Installation",
    description:
      "Receive photo and video proof that your ad is live. No guessing, no promises — just proof.",
  },
  {
    icon: HiOutlinePhone,
    title: "Dedicated Support",
    description:
      "I'm personally available to help throughout your campaign. Call or message me anytime.",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    // TODO: Replace mock fallback with real data once API is connected
    getHoardings()
      .then((res) => setFeatured(res.data.slice(0, 6)))
      .catch(() => setFeatured(mockHoardings.slice(0, 6)));
  }, []);

  return (
    <div>
      {/* Launch Offer Banner */}
      <motion.div
        className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-amber-900 font-semibold cursor-pointer select-none"
        onClick={() => navigate("/subscribe")}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {/* Shimmer sweep */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
        />

        <div className="relative py-3 px-4">
          <div className="flex items-center justify-center gap-2 flex-wrap text-sm">
            {/* Pulsing fire emoji */}
            <motion.span
              animate={{ scale: [1, 1.3, 1], rotate: [-5, 5, -5] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              🔥
            </motion.span>

            <span className="font-bold">LIMITED LAUNCH OFFER</span>
            <span className="text-amber-800">—</span>
            <span>First 5 advertisers get</span>

            <motion.span
              className="bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              0% Platform Fee
            </motion.span>

            <span className="font-bold text-amber-800">+</span>

            <motion.span
              className="bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.75 }}
            >
              FREE Installation
            </motion.span>

            <span className="text-amber-700">·</span>
            <span>Only a few spots left.</span>

            {/* Bouncing arrow CTA */}
            <motion.span
              className="inline-flex items-center gap-1 bg-amber-900 text-amber-100 px-3 py-0.5 rounded-full text-xs font-bold"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            >
              Grab yours →
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Trust Banner */}
      <div className="bg-green-600 text-white text-sm py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium">
              <HiOutlineShieldCheck className="w-4 h-4" />
              Secure booking
            </span>
            <span className="text-green-300 hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5 font-medium">
              <HiOutlineBadgeCheck className="w-4 h-4" />6 Verified hoardings in
              Bangalore
            </span>
            <span className="text-green-300 hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5 font-medium">
              <HiOutlinePhotograph className="w-4 h-4" />
              Proof of installation guaranteed
            </span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight animate-slide-up">
              Your one-stop shop to advertise and reach your customers
            </h1>
            <p className="mt-6 text-lg md:text-xl text-primary-100 leading-relaxed max-w-2xl">
              Discover premium billboard locations in Bangalore. Browse, get a
              quote, review, pay, and approve — all in one place with full
              transparency.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/hoardings"
                className="inline-flex items-center justify-center bg-white text-primary-700 font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Explore Hoardings
              </Link>
              <Link
                to="/hoardings"
                className="inline-flex items-center justify-center bg-primary-500/30 text-white border border-white/25 font-semibold px-8 py-3.5 rounded-xl hover:bg-primary-500/50 transition-all duration-300"
              >
                Start Advertising
              </Link>
            </div>
            <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="inline-flex items-center gap-2 bg-amber-400 text-amber-900 font-bold px-4 py-2 rounded-xl text-sm">
                <span>🎉</span>
                <span>First 5 advertisers — 0% platform fee</span>
              </div>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="text-sm text-primary-200 underline underline-offset-2 hover:text-white transition-colors"
              >
                How does payment work? →
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "20+", label: "Hoardings" },
              { value: "Bangalore", label: "Now Live" },
              { value: "100%", label: "Verified" },
              { value: "24h", label: "Response" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10"
              >
                <p className="text-2xl md:text-3xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-primary-200 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hoardings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="section-heading">Featured Hoardings</h2>
          <p className="section-sub">
            Hand-picked premium billboard locations in Bangalore
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((h) => (
            <HoardingCard key={h.id} hoarding={h} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/hoardings" className="btn-primary">
            View All Hoardings &rarr;
          </Link>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading">How It Works</h2>
            <p className="section-sub">
              Three simple steps to get your business advertised at premium
              locations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="relative text-center p-8 rounded-2xl bg-gray-50 hover:bg-primary-50 transition-colors duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 text-primary-600 rounded-2xl mb-5 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  <step.icon className="w-7 h-7" />
                </div>
                <div className="absolute top-4 right-4 text-4xl font-extrabold text-gray-100 group-hover:text-primary-100 transition-colors">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Guarantee Block */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-2">
              Your Most Trusted Hoarding Platform
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              100% Trust Guaranteed
            </h2>
            <p className="text-gray-400 text-lg mt-3 max-w-2xl mx-auto">
              Every rupee you spend is protected. Every booking is notified.
              Every installation is proven before the final payment.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                emoji: "📲",
                title: "SMS & WhatsApp Updates",
                desc: "Instant SMS & WhatsApp alerts at every step — when you book, when your ad is installed, and when proof is ready. 100% guaranteed.",
                border: "border-blue-500/30",
                bg: "bg-blue-900/30",
              },
              {
                emoji: "🔒",
                title: "Escrow-Protected Payment",
                desc: "Your money is held securely. Not a single rupee reaches the hoarding owner before you verify the proof.",
                border: "border-primary-500/30",
                bg: "bg-primary-900/30",
              },
              {
                emoji: "📸",
                title: "Photo + Video Proof",
                desc: "Receive verified installation photos and video on WhatsApp & SMS before the 2nd payment is released.",
                border: "border-orange-500/30",
                bg: "bg-orange-900/30",
              },
              {
                emoji: "💰",
                title: "50% · 50% Split",
                desc: "Pay 50% to confirm your booking. The remaining 50% is paid only after you see and confirm the installation proof.",
                border: "border-green-500/30",
                bg: "bg-green-900/30",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`rounded-2xl border p-6 ${item.bg} ${item.border}`}
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-white text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-green-600/10 border border-green-500/20 rounded-2xl p-6 text-center">
            <p className="text-white font-semibold text-base md:text-lg leading-relaxed">
              Whether you book or just browse — you are{" "}
              <span className="text-green-400">notified every step</span> via
              SMS &amp; WhatsApp. Your payment is{" "}
              <span className="text-green-400">fully secured</span> until you
              personally confirm the proof. No exceptions. No surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Credibility */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary-50 to-white rounded-3xl border border-primary-100 p-8 md:p-10 flex flex-col sm:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-primary-200 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                  alt="Founder of ServerPe"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-1">
                About the Founder
              </p>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                I built this platform to make outdoor advertising honest
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                I'm the developer behind ServerPe™. I built this from the ground
                up because billboard advertising was broken — no transparency,
                no verified data, no proof of display. I'm changing that,
                starting in Bangalore.
              </p>
              <Link
                to="/about"
                className="inline-block mt-3 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                Read my story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="section-heading">Why Choose Me</h2>
          <p className="section-sub">
            Transparent, verified, and built with advertiser trust at every step
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseItems.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-50 text-primary-600 rounded-xl mb-4">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-3xl p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Ready to promote your business?
          </h2>
          <p className="text-primary-100 text-lg max-w-xl mx-auto mb-8">
            Join advertisers in Bangalore who found the perfect hoarding
            location through this platform.
          </p>
          <Link
            to="/hoardings"
            className="inline-flex items-center bg-white text-primary-700 font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Get Started Now &rarr;
          </Link>
        </div>
      </section>

      {showPaymentModal && (
        <PaymentModal onClose={() => setShowPaymentModal(false)} />
      )}
    </div>
  );
}
