import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiPrinter,
  FiTruck,
  FiBarChart2,
  FiBell,
  FiCamera,
  FiMapPin,
  FiShield,
} from "react-icons/fi";
import { MdQrCode2, MdNearMe } from "react-icons/md";
import { TbBrandWhatsapp } from "react-icons/tb";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const trackingFeatures = [
  {
    icon: <MdNearMe size={26} />,
    title: "NFC Tap Tracking",
    desc: "Each auto has an NFC tag. Every time the driver taps it, you get an instant notification confirming your banner is live and moving.",
  },
  {
    icon: <MdQrCode2 size={26} />,
    title: "QR Code Engagement",
    desc: "People who see your banner can scan a QR code. You get alerted instantly. Offer them exclusive coupons to drive footfall to your business.",
  },
  {
    icon: <FiCamera size={26} />,
    title: "Daily Photo Proof",
    desc: "Auto drivers upload a daily photo of your banner live on their vehicle — because seeing is believing.",
  },
  {
    icon: <TbBrandWhatsapp size={26} />,
    title: "WhatsApp & SMS Alerts",
    desc: "Real-time and daily notifications via WhatsApp & SMS keep you updated at every stage — printing, installation, and on-road.",
  },
  {
    icon: <FiBell size={26} />,
    title: "Milestone Notifications",
    desc: "Get notified when your banner is printed, when it's being installed, and when it officially goes live on the road.",
  },
  {
    icon: <FiBarChart2 size={26} />,
    title: "Portal Tracking Dashboard",
    desc: "Log in to the portal whenever you want to check real-time tracking data, banner status, and engagement history.",
  },
];

const process = [
  {
    icon: <FiPrinter size={20} />,
    title: "You Provide Your Design Image",
    desc: "Share your ready design image — I handle the rest. I print it sized for auto-behind banner dimensions, laminate, and prep for installation.",
  },
  {
    icon: <FiTruck size={20} />,
    title: "Auto Onboarding",
    desc: "I partner with auto drivers, agreements and install your banner on their vehicles.",
  },
  {
    icon: <MdNearMe size={20} />,
    title: "NFC & QR Setup",
    desc: "Each banner gets an NFC tag and QR code tied to your campaign for real-time tracking and engagement.",
  },
  {
    icon: <FiBell size={20} />,
    title: "Go Live & Track",
    desc: "Your campaign activates. Notifications flow in via SMS & WhatsApp in real time as autos hit the road.",
  },
];

const serviceHighlights = [
  {
    icon: <FiMapPin size={20} />,
    title: "Hyperlocal Targeting",
    desc: "Choose specific areas like Peenya, Yeshwanthpur, Rajajinagar, or Malleshwaram and your ads run exactly where your customers are.",
  },
  {
    icon: <FiShield size={20} />,
    title: "Transparent & Trackable",
    desc: "NFC taps, QR scans, daily photo proof, and real-time notifications — every aspect of your campaign is verifiable.",
  },
  {
    icon: <FiCamera size={20} />,
    title: "Daily Visual Proof",
    desc: "Auto drivers upload daily photos of your live banner — you never wonder if your ad is running.",
  },
];

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* ═══ SEO HERO — SERVICES ═══════════════════════════════════ */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/60 to-dark-900 pointer-events-none" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-brand-500/15 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
              Our Advertising Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Moving Billboard Advertising Services in{" "}
              <span className="text-brand-400">Bengaluru</span>
            </h1>
            <p className="section-sub mt-5 max-w-3xl mx-auto">
              Auto rickshaw advertising that moves your brand through busy
              markets, traffic junctions, and residential neighbourhoods across
              Bengaluru — with real-time NFC &amp; QR code tracking at
              unbeatable launch prices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ SERVICE DESCRIPTION ═══════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="section-heading">
              What Our Auto Advertising Service Includes
            </h2>
            <p className="section-sub">
              You provide the design image — I handle printing to auto-behind
              dimensions, installation, and end-to-end campaign tracking.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            <motion.div variants={fadeUp} className="space-y-6">
              {serviceHighlights.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-brand-500/15 rounded-xl flex items-center justify-center text-brand-400 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex justify-center">
              <div className="relative">
                <div className="w-full max-w-md h-72 rounded-3xl overflow-hidden border-2 border-dark-600 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80"
                    alt="Local business outdoor advertising services in Bengaluru"
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
                  className="absolute -bottom-4 -left-4 bg-brand-500 text-white text-sm font-bold px-5 py-3 rounded-xl shadow-lg shadow-brand-500/40"
                >
                  Free printing &amp; installation!
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ PRICING LINK ══════════════════════════════════════════ */}
      <section className="py-14 px-4 bg-dark-800/50">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="card border-brand-500/30 border-dashed border-2 text-center"
          >
            <p className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-2">
              Pricing
            </p>
            <h3 className="text-white font-bold text-xl mb-2">
              Per Auto. Per Week. Zero Surprises.
            </h3>
            <p className="text-gray-400 text-sm mb-5">
              Plans start from ₹999/auto/week. Choose between NFC tracked and
              non-NFC options with SMS or WhatsApp notifications.
            </p>
            <button
              onClick={() => navigate("/pricing")}
              className="btn-primary"
            >
              View Full Pricing →
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══ TRACKING & TRANSPARENCY ══════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="section-heading">
              Real-Time Auto Advertising Tracking
            </h2>
            <p className="section-sub">
              Every rupee you spend is accountable. NFC tracking, QR code
              engagement, photo proof, and instant notifications — here's how I
              keep you in the loop at all times.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {trackingFeatures.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="card group hover:border-brand-500/40 hover:bg-dark-700 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-brand-500/15 rounded-xl flex items-center justify-center text-brand-400 mb-4 group-hover:bg-brand-500/25 transition-colors duration-300">
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

      {/* ═══ CAMPAIGN PROCESS ═════════════════════════════════════ */}
      <section className="py-20 px-4 bg-dark-800/50 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.03]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-dark-800/90 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="section-heading">
              How Your Auto Advertising Campaign Runs
            </h2>
            <p className="section-sub">
              Simple four-step process from design submission to city-wide
              visibility.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {process.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="card text-center flex flex-col items-center gap-3 hover:border-brand-500/40 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
                  {step.icon}
                </div>
                <span className="text-brand-400 text-xs font-bold uppercase tracking-widest">
                  Step {i + 1}
                </span>
                <h3 className="text-white font-bold">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ COVERAGE AREAS ═══════════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="section-heading">
              Auto Advertising Coverage Areas in Bengaluru
            </h2>
            <p className="section-sub">
              Our autos operate in high-traffic business districts, residential
              neighbourhoods, and market areas across the city.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8"
          >
            {["Peenya", "Yeshwanthpur", "Rajajinagar", "BEL", "Jalahalli"].map(
              (area, i) => (
                <motion.div
                  key={area}
                  variants={fadeUp}
                  custom={i}
                  className="card text-center py-4 px-3 group hover:border-brand-500/50 hover:bg-dark-700 transition-all duration-300 cursor-default"
                >
                  <FiMapPin className="text-brand-400 mx-auto mb-2" size={18} />
                  <p className="text-white font-semibold text-sm">{area}</p>
                </motion.div>
              ),
            )}
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center text-gray-400 text-sm"
          >
            Expanding to more localities across Bengaluru &amp; other cities.{" "}
            <button
              onClick={() => navigate("/contact")}
              className="text-brand-400 hover:underline font-medium"
            >
              Contact us for your specific area →
            </button>
          </motion.p>
        </div>
      </section>

      {/* ═══ CURRENTLY OPERATIONAL ════════════════════════════════ */}
      <section className="py-12 px-4 bg-dark-800/50">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="card border-brand-500/30 text-center"
          >
            <span className="text-5xl mb-4 block">🛺</span>
            <h3 className="text-xl font-bold text-white mb-3">
              Currently Operational: Auto Rickshaw Advertising
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xl mx-auto">
              Auto rickshaws are my first operational medium — they move through
              dense city lanes, high-traffic areas, and local neighbourhoods
              quickly, giving your business banner maximum visibility at the
              ground level across Bengaluru.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA BANNER ══════════════════════════════════════════ */}
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
                  "url('https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1920&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/95 to-brand-800/95" />
            <div className="relative z-10 p-10 md:p-14 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Start Your Auto Advertising Campaign Today
              </h2>
              <p className="text-brand-100/80 text-lg mb-8 max-w-xl mx-auto">
                Subscribe to the launch offer and get your brand on the road
                across Bengaluru within days. Just provide your design image —
                free printing &amp; installation included.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/subscribe")}
                  className="bg-white text-brand-600 hover:bg-brand-50 font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl active:scale-95"
                >
                  🚀 Get Launch Offer
                </button>
                <button
                  onClick={() => navigate("/contact")}
                  className="border-2 border-white/50 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all duration-300"
                >
                  Talk to Us First
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
