import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiCheck,
  FiZap,
  FiCamera,
  FiSmartphone,
  FiHeart,
  FiChevronDown,
  FiChevronUp,
  FiMapPin,
  FiTrendingUp,
  FiDollarSign,
  FiEye,
  FiStar,
} from "react-icons/fi";
import { MdAutoAwesome, MdQrCode2, MdNearMe } from "react-icons/md";
import { TbBrandWhatsapp } from "react-icons/tb";

// ─── Framer Motion helpers ───────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ─── Offer card ──────────────────────────────────────────────────────────────
function OfferCard({ badge, title, price, duration, autos, accent }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`relative card overflow-hidden p-0 flex flex-col border-2 ${
        accent
          ? "border-brand-500 shadow-xl shadow-brand-500/20"
          : "border-dark-600"
      }`}
    >
      {accent && (
        <div className="absolute top-0 right-0 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
          MOST POPULAR
        </div>
      )}
      <div className="p-7 flex flex-col gap-4 flex-1">
        <span className="inline-block bg-brand-500/15 text-brand-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit">
          {badge}
        </span>
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-4xl font-extrabold text-white mt-1">
            ₹{price}
            <span className="text-gray-500 text-base font-normal">
              /{duration}
            </span>
          </p>
        </div>
        <ul className="space-y-2 text-sm text-gray-300 flex-1">
          <li className="flex items-center gap-2">
            <FiCheck className="text-brand-400 shrink-0" />
            <span>
              {autos} auto{autos > 1 ? "s" : ""} on the road
            </span>
          </li>
          <li className="flex items-center gap-2">
            <FiCheck className="text-brand-400 shrink-0" />
            <span>You provide design — printing &amp; installation FREE</span>
          </li>
          <li className="flex items-center gap-2">
            <FiCheck className="text-brand-400 shrink-0" />
            <span>NFC &amp; QR code tracking included</span>
          </li>
          <li className="flex items-center gap-2">
            <FiCheck className="text-brand-400 shrink-0" />
            <span>Daily photo proof &amp; WhatsApp notifications</span>
          </li>
          <li className="flex items-center gap-2">
            <FiCheck className="text-brand-400 shrink-0" />
            <span>SMS alerts at every milestone</span>
          </li>
        </ul>
      </div>
      <div className="p-7 pt-0">
        <a
          href="/subscribe"
          className={`block text-center font-semibold py-3 rounded-xl transition-all duration-300 ${
            accent
              ? "bg-brand-500 hover:bg-brand-400 text-white shadow-lg hover:shadow-brand-500/40"
              : "border-2 border-brand-500 text-brand-400 hover:bg-brand-500 hover:text-white"
          }`}
        >
          Grab This Offer
        </a>
      </div>
    </motion.div>
  );
}

// ─── FAQ Accordion Item ──────────────────────────────────────────────────────
function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <motion.div
      variants={fadeUp}
      className="card border-dark-600 cursor-pointer group hover:border-brand-500/40 transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-white font-semibold text-sm md:text-base">
          {question}
        </h3>
        {isOpen ? (
          <FiChevronUp className="text-brand-400 shrink-0" size={20} />
        ) : (
          <FiChevronDown
            className="text-gray-400 group-hover:text-brand-400 shrink-0 transition-colors"
            size={20}
          />
        )}
      </div>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="text-gray-400 text-sm leading-relaxed mt-4 pt-4 border-t border-dark-600">
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const features = [
  {
    icon: <FiZap size={22} />,
    title: "Quick Installation & Go Live",
    desc: "Fast banner installation on autos to get you live within hours of onboarding. No delays.",
  },
  {
    icon: <MdNearMe size={22} />,
    title: "NFC Live Tracking",
    desc: "Whenever the driver taps the NFC tag, SMS & WhatsApp notifications are triggered — as frequently as possible throughout the day, confirming your banner is on the move.",
  },
  {
    icon: <MdQrCode2 size={22} />,
    title: "QR Code Engagement",
    desc: "Passers-by scan your QR code and you get real-time alerts. Offer coupons to drive visits to your business.",
  },
  {
    icon: <FiCamera size={22} />,
    title: "Daily Photo Proof",
    desc: "Everyday photo uploads confirm your banner is live and visible on busy roads across the city.",
  },
  {
    icon: <TbBrandWhatsapp size={22} />,
    title: "Instant Notifications",
    desc: "SMS & WhatsApp updates at every stage — printing, installing, and going live. Never be in the dark.",
  },
  {
    icon: <FiHeart size={22} />,
    title: "Individual Initiative — Direct Contact",
    desc: "No agency overhead. This is a personal initiative — direct contact with me. Drivers benefit, advertisers get genuine outdoor reach.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Choose Your Campaign Area",
    desc: "Select the localities and areas where you want your brand to be seen — Peenya, Yeshwanthpur, local markets, and more.",
  },
  {
    step: "02",
    title: "You Provide Design — I Print It",
    desc: "Share your ready design image. I print it sized for auto-behind banner dimensions and set up QR codes — completely free for launch offers. Note: I do not create designs.",
  },
  {
    step: "03",
    title: "Banners Installed on Autos",
    desc: "Banners are professionally installed on autos running in busy streets, traffic junctions, and residential areas.",
  },
  {
    step: "04",
    title: "Daily Visibility & Tracking",
    desc: "Your business gets daily visibility across the city. Track everything via NFC taps, QR scans, photos, and notifications.",
  },
];

const useCases = [
  {
    icon: "🏋️",
    title: "Gyms & Fitness Centers",
    desc: "Promote memberships and offers to commuters and locals passing by daily.",
  },
  {
    icon: "🍕",
    title: "Restaurants & Cafés",
    desc: "Drive footfall with moving ads showcasing your menu and special deals.",
  },
  {
    icon: "💇",
    title: "Salons & Beauty Parlours",
    desc: "Reach neighbourhood customers with eye-catching banner ads on wheels.",
  },
  {
    icon: "📚",
    title: "Coaching Centers & Tutors",
    desc: "Attract students and parents in residential areas near your coaching center.",
  },
  {
    icon: "🏥",
    title: "Local Clinics & Pharmacies",
    desc: "Build trust and awareness in your locality with consistent daily visibility.",
  },
  {
    icon: "🛍️",
    title: "Retail Shops & Showrooms",
    desc: "Announce sales, new arrivals, and grand openings across busy market routes.",
  },
];

const faqs = [
  {
    q: "What is auto rickshaw advertising?",
    a: "Auto rickshaw advertising is a form of moving outdoor advertising where promotional banners are placed on autos that travel across busy areas of your city. Your brand gets continuous exposure as the auto moves through markets, residential areas, traffic junctions, and high-footfall zones.",
  },
  {
    q: "How much does it cost to advertise on an auto?",
    a: "Our launch offers start from just ₹1,299 for 5 days on 2 autos, and ₹1,499 for 7 days on 3 autos. Banner printing, and installation are completely FREE for launch offers. After your trial, you can scale to any number of autos for 28-day campaigns.",
  },
  {
    q: "Is banner printing and installation really free?",
    a: "Yes! For my launch offers, printing and professional installation are completely free of cost. You need to provide your own ready design image — I'll print it sized for auto-behind banner dimensions. I do not create designs.",
  },
  {
    q: "How do I track if my banner is actually live?",
    a: "We use NFC (Near Field Communication) tags and QR codes on each banner. Every time the auto driver taps the NFC tag, you get instant SMS & WhatsApp notifications. Drivers also upload daily photo proof of your live banner. You can check the portal for real-time tracking data anytime.",
  },
  {
    q: "What is NFC and QR code tracking?",
    a: "NFC tracking means the auto driver taps an NFC tag every day to confirm your banner is active. QR code tracking means random people who see your banner can scan the QR code — you get instant notifications, and they receive special coupon offers from your business.",
  },
  {
    q: "Which areas do you cover for auto advertising?",
    a: "I currently operate in Bengaluru. Contact me directly for your specific area requirements — autos in your locality can be onboarded.",
  },
  {
    q: "How long does it take for my campaign to go live?",
    a: "It takes a short time to onboard autos and complete vehicle agreements. Once done, your banner is printed, installed, and goes live. You'll receive tracking notifications at every stage — printing, installation, and when the campaign goes live.",
  },
  {
    q: "Are you an advertising agency?",
    a: "No! I'm not from any agency and not competing with anyone. This is an individual initiative where auto drivers earn extra income and advertisers get genuine, affordable visibility. Direct contact with me — no customer care queues.",
  },
  {
    q: "What kind of businesses benefit from auto advertising?",
    a: "Any local business benefits — gyms, restaurants, salons, coaching centers, clinics, retail shops, showrooms, real estate agents, event organizers, and more. If your customers are local, auto advertising reaches them where they live, work, and commute.",
  },
  {
    q: "Can I run a campaign for more than 7 days?",
    a: "Absolutely! After experiencing the launch offer and gaining trust in our tracking and transparency, you can scale to any number of autos for 28-day campaigns at custom pricing.",
  },
];

// ─── Home page ────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen">
      {/* ═══ 1. SEO HERO SECTION ═══════════════════════════════════ */}
      <section className="relative pt-32 pb-28 px-4 overflow-hidden">
        {/* Background image overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.07]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/60 to-dark-900 pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 -right-20 w-[400px] h-[400px] bg-brand-600/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-brand-500/15 border border-brand-500/30 text-brand-400 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
          >
            <MdAutoAwesome />
            Now Live — Auto Rickshaw Advertising in Bengaluru
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight"
          >
            Auto Rickshaw Advertising in Bengaluru –{" "}
            <span className="text-brand-400">
              Promote Your Business Across the City
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Reach thousands of people daily with moving auto advertisements. Run
            targeted campaigns in busy areas and localities at affordable prices
            with real-time NFC &amp; QR code tracking.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => navigate("/subscribe")}
              className="btn-primary text-base px-8 py-4"
            >
              🚀 Subscribe to Launch Offer
            </button>
            <button
              onClick={() => navigate("/services")}
              className="btn-outline text-base px-8 py-4"
            >
              Explore Services
            </button>
          </motion.div>

          {/* Floating auto illustration */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="mt-16 text-9xl select-none drop-shadow-2xl"
            role="img"
            aria-label="Auto rickshaw"
          >
            🛺
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-gray-500 text-xs uppercase tracking-widest"
          >
            <span className="flex items-center gap-1.5">
              <FiMapPin size={14} className="text-brand-400" /> Bengaluru Based
            </span>
            <span className="flex items-center gap-1.5">
              <FiStar size={14} className="text-brand-400" /> Individual Init.
            </span>
            <span className="flex items-center gap-1.5">
              <MdNearMe size={14} className="text-brand-400" /> NFC + QR
              Tracking
            </span>
            <span className="flex items-center gap-1.5">
              <FiCamera size={14} className="text-brand-400" /> Daily Photo
              Proof
            </span>
          </motion.div>
        </div>
      </section>

      {/* ═══ 2. SEO PROBLEM SECTION ════════════════════════════════ */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.04]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 to-dark-800/90 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-block bg-red-500/15 text-red-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                The Problem
              </span>
              <h2 className="section-heading mb-6">
                Struggling to Get Local Visibility for Your Business?
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Many small businesses struggle to get visibility with{" "}
                  <span className="text-white font-medium">
                    expensive digital ads
                  </span>{" "}
                  and{" "}
                  <span className="text-white font-medium">
                    ineffective flyers
                  </span>
                  . Social media algorithms limit your reach, billboards cost a
                  fortune, and pamphlets end up in the trash.
                </p>
                <p>
                  <span className="text-brand-400 font-semibold">
                    Auto rickshaw advertising
                  </span>{" "}
                  provides a simple and affordable way to reach thousands of
                  local customers every day — right where they live, work, and
                  commute. It's{" "}
                  <span className="text-white font-medium">
                    outdoor advertising
                  </span>{" "}
                  that actually moves with your audience.
                </p>
              </div>
            </motion.div>

            <motion.div variants={scaleIn} className="flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden border-2 border-dark-600 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80"
                    alt="Auto rickshaw on busy Bengaluru street for local advertising"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-4 -right-4 bg-brand-500 text-white text-sm font-bold px-5 py-3 rounded-xl shadow-lg shadow-brand-500/40"
                >
                  1000s see your ad daily!
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 3. WHAT IS AUTO RICKSHAW ADVERTISING ══════════════════ */}
      <section className="py-20 px-4 bg-dark-800/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="section-heading">
              What Is Auto Rickshaw Advertising?
            </h2>
            <p className="section-sub mt-4">
              A powerful form of{" "}
              <span className="text-white font-medium">
                moving outdoor advertising
              </span>{" "}
              designed for local business promotion
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div
              variants={fadeUp}
              className="card border-dark-600 space-y-4"
            >
              <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=600&q=80"
                  alt="Auto rickshaw advertising banner on vehicle in city traffic"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="text-white font-bold text-lg">
                Moving Billboard Advertising
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Auto rickshaw advertising is a form of{" "}
                <strong className="text-white">
                  moving billboard advertising
                </strong>{" "}
                where promotional banners are placed on autos that travel across
                busy areas of the city. Unlike static billboards, your ad moves
                through markets, residential areas, and traffic junctions —
                reaching thousands of eyes every single day.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="card border-dark-600 space-y-4"
            >
              <div className="w-full h-48 rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-brand-500/20 to-brand-700/20 flex items-center justify-center">
                <span className="text-7xl">🏙️</span>
              </div>
              <h3 className="text-white font-bold text-lg">
                Local Business Promotion
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Businesses can promote their products and services while autos
                move through markets, residential areas, and traffic junctions.
                Perfect for{" "}
                <strong className="text-white">local advertising</strong> in
                Bengaluru — reaching your target audience in the exact
                neighbourhoods where your customers live and work.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 4. LAUNCH OFFERS ══════════════════════════════════════ */}
      <section id="offers" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <p className="text-brand-400 font-semibold uppercase tracking-widest text-sm mb-2">
              Limited Time — Affordable Advertising for Small Businesses
            </p>
            <h2 className="section-heading">🎁 Launch Offers</h2>
            <p className="section-sub">
              Exclusive first-time onboard pricing — printing &amp; installation
              completely FREE (you provide your design image)! The most
              affordable outdoor advertising for local businesses.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto"
          >
            <OfferCard
              badge="Launch Offer 1"
              title="Best for quick city trial"
              price="1,499"
              duration="7 days"
              autos={3}
            />
            <OfferCard
              badge="Launch Offer 2"
              title="Perfect starter pack"
              price="1,299"
              duration="5 days"
              autos={2}
              accent
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-10 card border-brand-500/30 border-dashed border-2 max-w-2xl mx-auto text-center"
          >
            <p className="text-gray-300 text-sm leading-relaxed">
              <span className="text-brand-400 font-semibold">
                Want more reach?
              </span>{" "}
              After your first campaign, scale up to any number of autos for{" "}
              <span className="text-white font-semibold">28-day campaigns</span>{" "}
              once you've experienced the results &amp; trust the process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ 5. HOW AUTO ADVERTISING WORKS ═════════════════════════ */}
      <section className="py-20 px-4 bg-dark-800/50 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.03]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-dark-800/90 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="section-heading">How Auto Advertising Works</h2>
            <p className="section-sub">
              Simple, transparent, and trackable from day one. Four steps to
              city-wide visibility.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {howItWorks.map((item) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                className="card text-center group hover:border-brand-500/50 transition-colors duration-300"
              >
                <div className="text-5xl font-extrabold text-brand-500/20 group-hover:text-brand-500/40 transition-colors duration-300 mb-3">
                  {item.step}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 6. BENEFITS OF AUTO RICKSHAW ADVERTISING ══════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="section-heading">
              Benefits of Auto Rickshaw Advertising
            </h2>
            <p className="section-sub">
              An affordable local marketing solution that keeps your brand
              visible all day, every day.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: <FiEye size={22} />,
                title: "High Visibility in Busy Traffic",
                desc: "Your banner is seen by thousands in traffic junctions, markets, and residential areas — continuous exposure throughout the day.",
              },
              {
                icon: <FiDollarSign size={22} />,
                title: "Affordable for Local Businesses",
                desc: "Starting from just ₹1,299 with free printing (you provide design). The most cost-effective outdoor advertising for shops, gyms, and restaurants.",
              },
              {
                icon: <FiTrendingUp size={22} />,
                title: "Continuous Exposure All Day",
                desc: "Unlike digital ads that disappear, your auto ad keeps moving and being seen from morning rush hour to evening commute.",
              },
              ...features.slice(0, 3),
            ].map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="card group hover:border-brand-500/40 hover:bg-dark-700 transition-all duration-300"
              >
                <div className="w-11 h-11 bg-brand-500/15 rounded-xl flex items-center justify-center text-brand-400 mb-4 group-hover:bg-brand-500/25 transition-colors duration-300">
                  {f.icon}
                </div>
                <h3 className="text-white font-bold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 7. WHY CHOOSE US ══════════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="section-heading">Why Choose ServerPE™ Ads</h2>
            <p className="section-sub">
              Not an agency. Not a competitor. A real individual initiative
              dedicated to results and complete transparency.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="card group hover:border-brand-500/40 hover:bg-dark-700 transition-all duration-300"
              >
                <div className="w-11 h-11 bg-brand-500/15 rounded-xl flex items-center justify-center text-brand-400 mb-4 group-hover:bg-brand-500/25 transition-colors duration-300">
                  {f.icon}
                </div>
                <h3 className="text-white font-bold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 9. USE CASES — BUSINESSES THAT BENEFIT ════════════════ */}
      <section className="py-20 px-4 bg-dark-800/50 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.03]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-dark-800/90 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="section-heading">
              Businesses That Benefit from Auto Advertising
            </h2>
            <p className="section-sub">
              Ideal for gyms, restaurants, salons, coaching centers, clinics,
              and shops — any business that serves local customers.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {useCases.map((uc, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="card group hover:border-brand-500/40 hover:bg-dark-700 transition-all duration-300 text-center"
              >
                <span className="text-4xl mb-3 block">{uc.icon}</span>
                <h3 className="text-white font-bold mb-2">{uc.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {uc.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 10. POINTS FOR ADVERTISERS ════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="card border-brand-500/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <FiSmartphone className="text-brand-400 text-2xl" />
              <h2 className="text-2xl font-extrabold text-white">
                A Few Things to Know Before You Subscribe
              </h2>
            </div>
            <ul className="space-y-4">
              {[
                "Subscribe and take the launch offer as a first-time onboard — then wait for notifications to roll in.",
                "It takes a little time to onboard autos and get vendor agreements signed — your banner will be live before you know it.",
                "You don't need to wait anxiously — you'll get tracking notifications at every stage: printing, installing, and going live.",
                "Check the portal regularly for banner tracking updates. Since this is an individual initiative, response is personal and direct.",
                "This is an individual initiative, not an agency. No competitor pressure. Just an honest platform where drivers earn and advertisers get genuine reach.",
              ].map((point, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  custom={i}
                  className="flex gap-3 text-gray-300 text-sm leading-relaxed"
                >
                  <span className="mt-0.5 shrink-0 w-5 h-5 bg-brand-500/20 rounded-full flex items-center justify-center text-brand-400 text-xs font-bold">
                    {i + 1}
                  </span>
                  {point}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ═══ 11. FAQ SECTION ═══════════════════════════════════════ */}
      <section className="py-20 px-4 bg-dark-800/50">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="section-heading">Frequently Asked Questions</h2>
            <p className="section-sub">
              Everything you need to know about auto rickshaw advertising,
              pricing, tracking, and more.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="space-y-4"
          >
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.q}
                answer={faq.a}
                isOpen={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 12. CTA BANNER ════════════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="relative rounded-3xl overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1920&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/95 to-brand-800/95" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" />
            <div className="relative z-10 p-10 md:p-14 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Ready to Put Your Brand on Wheels?
              </h2>
              <p className="text-brand-100/80 text-lg mb-8 max-w-xl mx-auto">
                Subscribe to our exclusive launch offer today. Free banner
                printing &amp; installation. Real-time NFC &amp; QR tracking.
                Start advertising across Bengaluru now.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/subscribe")}
                  className="bg-white text-brand-600 hover:bg-brand-50 font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl active:scale-95"
                >
                  Subscribe Now — Free Banner!
                </button>
                <button
                  onClick={() => navigate("/contact")}
                  className="border-2 border-white/50 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all duration-300"
                >
                  Have Questions?
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
