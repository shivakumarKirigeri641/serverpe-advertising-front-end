import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiUsers,
  FiTarget,
  FiGlobe,
  FiMapPin,
  FiTrendingUp,
  FiPhone,
} from "react-icons/fi";
import { MdAutoAwesome } from "react-icons/md";

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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const values = [
  {
    icon: <FiHeart size={22} />,
    title: "Individual Initiative",
    desc: "Not an agency, not a corporation. A personal initiative by a dedicated individual who cares about genuine results for every advertiser.",
  },
  {
    icon: <FiUsers size={22} />,
    title: "Win-Win for Drivers & Businesses",
    desc: "Auto drivers earn extra income, businesses get city-wide outdoor visibility. A model where everyone benefits.",
  },
  {
    icon: <FiTarget size={22} />,
    title: "Direct Founder Contact",
    desc: "No customer care queues. No middlemen. Talk directly to the person running this auto advertising portal.",
  },
  {
    icon: <FiGlobe size={22} />,
    title: "Technology-Powered Tracking",
    desc: "NFC, QR codes, portal tracking, and real-time SMS & WhatsApp notifications — built with technology for complete transparency.",
  },
  {
    icon: <FiMapPin size={22} />,
    title: "Bengaluru Local Expertise",
    desc: "Deep understanding of Bengaluru's traffic patterns, busy areas, and local neighbourhoods — ensuring your ads reach the right audience.",
  },
  {
    icon: <FiTrendingUp size={22} />,
    title: "Scalable Campaigns",
    desc: "Start with a launch offer trial, build trust, then scale to any number of autos for 28-day city-wide campaigns.",
  },
];

export default function AboutMe() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* ═══ SEO HERO — ABOUT ═════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/60 to-dark-900 pointer-events-none" />
        <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-brand-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-brand-500/15 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
              About ServerPe Ads
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              The Story Behind{" "}
              <span className="text-brand-400">
                Bengaluru's Auto Advertising Platform
              </span>
            </h1>
            <p className="section-sub mt-5 max-w-3xl mx-auto">
              A passionate technologist building bridges between local
              businesses and affordable outdoor advertising — powered by
              technology, transparency, and honest personal commitment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ PERSONAL STORY ═══════════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={scaleIn} className="flex justify-center">
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-56 h-56 bg-gradient-to-br from-brand-500 to-brand-800 rounded-3xl flex items-center justify-center shadow-2xl shadow-brand-500/30"
                >
                  <span className="text-8xl">👨‍💻</span>
                </motion.div>
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute -bottom-4 -right-4 bg-dark-700 border border-brand-500/30 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg"
                >
                  <span className="text-brand-400">🛺</span> Auto Advertising
                  Pioneer
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="space-y-5 text-gray-300 leading-relaxed"
            >
              <h2 className="section-heading text-left !text-3xl">
                Who's Behind ServerPE™ Advertising?
              </h2>
              <p>
                Hi! I'm{" "}
                <span className="text-white font-semibold">
                  Shivakumar Kirigeri
                </span>
                , an individual working in the IT industry with{" "}
                <span className="text-brand-400 font-medium">
                  13+ years of professional experience
                </span>
                . I initiated{" "}
                <span className="text-white font-semibold">
                  ServerPE™ Advertising
                </span>{" "}
                as a personal initiative to make{" "}
                <span className="text-brand-400 font-medium">
                  auto rickshaw advertising
                </span>{" "}
                genuinely accessible and trackable for every small and medium
                business in Bengaluru.
              </p>
              <p>
                I started{" "}
                <a
                  href="https://serverpe.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-400 hover:underline"
                >
                  serverpe.in
                </a>{" "}
                (the future home of this platform) with the vision of building
                independent, useful tech portals. The advertising initiative
                grew out of a clear gap I saw — businesses want to{" "}
                <span className="text-white font-medium">
                  advertise on the move
                </span>{" "}
                but lack an affordable, transparent, and technology-backed
                option in Bengaluru.
              </p>
              <p>
                I'm{" "}
                <span className="text-white font-semibold">
                  not from any advertising agency
                </span>
                . I'm not competing with anyone. This is a simple, honest
                individual initiative — auto drivers earn income, businesses get
                outdoor visibility across the city, and the tracking tech makes
                it all accountable via NFC &amp; QR codes.
              </p>
              <p className="flex items-center gap-2 text-sm">
                <FiPhone className="text-brand-400 shrink-0" size={16} />
                <a
                  href="tel:+917996083415"
                  className="text-white hover:text-brand-400 transition-colors font-medium"
                >
                  +91 79960 83415
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ MISSION ═════════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-dark-800/50 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.04]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-dark-800/90 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="card border-brand-500/30 text-center p-10"
          >
            <MdAutoAwesome className="text-brand-400 text-4xl mx-auto mb-4" />
            <h2 className="text-2xl font-extrabold text-white mb-4">
              My Mission — Affordable Outdoor Advertising for Every Business
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
              "To create a platform where on-wheel drivers earn meaningful
              income through partnerships, and where advertisers get genuine,
              trackable city-wide reach at prices that make sense — with zero
              agency overhead and real human contact."
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-gray-500 text-xs uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <FiMapPin size={14} className="text-brand-400" /> Based in
                Bengaluru
              </span>
              <span className="flex items-center gap-1.5">
                <FiHeart size={14} className="text-brand-400" /> Individual
                Initiative
              </span>
              <span className="flex items-center gap-1.5">
                <FiGlobe size={14} className="text-brand-400" /> Tech-Powered
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ VALUES / WHY CHOOSE US ══════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="section-heading">
              Why Businesses Trust ServerPe Ads
            </h2>
            <p className="section-sub">
              Values-driven auto advertising with complete transparency and
              technology-backed tracking.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {values.map((v, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="card group hover:border-brand-500/40 hover:bg-dark-700 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-brand-500/15 rounded-xl flex items-center justify-center text-brand-400 shrink-0 group-hover:bg-brand-500/25 transition-colors duration-300">
                    {v.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{v.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ ABOUT SERVERPE.IN ═══════════════════════════════════ */}
      <section className="py-20 px-4 bg-dark-800/50 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            <motion.div
              variants={fadeUp}
              className="space-y-5 text-gray-300 leading-relaxed"
            >
              <h2 className="section-heading text-left !text-3xl">
                About serverpe.in — The Tech Behind the Initiative
              </h2>
              <p>
                <a
                  href="https://serverpe.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-400 hover:underline font-semibold"
                >
                  serverpe.in
                </a>{" "}
                is my personal tech domain — currently the home of this
                advertising initiative and will continue to be the primary
                platform. Built with care, transparency, and a genuine purpose.
              </p>
              <p>
                The advertising initiative —{" "}
                <span className="text-white font-semibold">ServerPE™ Ads</span>{" "}
                — focuses specifically on{" "}
                <span className="text-brand-400 font-medium">
                  hyperlocal, on-vehicle outdoor advertising
                </span>
                . My current vehicle of choice is the humble auto rickshaw:
                nimble, city-wide, affordable, and already trusted by millions
                of commuters daily across Bengaluru.
              </p>
              <p>
                I handle everything personally — from onboarding auto drivers to
                banner installation to tech support. If you have a question, you
                aren't reaching a helpdesk. You're reaching me directly at{" "}
                <a
                  href="tel:+917996083415"
                  className="text-brand-400 hover:underline font-medium"
                >
                  +91 79960 83415
                </a>
                .
              </p>
            </motion.div>

            <motion.div variants={scaleIn} className="flex justify-center">
              <div className="relative">
                <div className="w-full max-w-sm h-72 rounded-3xl overflow-hidden border-2 border-dark-600 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80"
                    alt="ServerPe technology platform for auto advertising management"
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
                  Built with ❤️ in Bengaluru
                </motion.div>
              </div>
            </motion.div>
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
                  "url('https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1920&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/95 to-brand-800/95" />
            <div className="relative z-10 p-10 md:p-14 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Want to Know More About Auto Advertising?
              </h2>
              <p className="text-brand-100/80 text-lg mb-8 max-w-xl mx-auto">
                Reach out directly — I'd love to discuss how your business can
                grow with affordable on-wheel advertising across Bengaluru.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/contact")}
                  className="bg-white text-brand-600 hover:bg-brand-50 font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl active:scale-95"
                >
                  Contact Me Directly
                </button>
                <button
                  onClick={() => navigate("/subscribe")}
                  className="border-2 border-white/50 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all duration-300"
                >
                  Get Launch Offer
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
