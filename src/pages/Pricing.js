import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheck, FiMessageSquare } from "react-icons/fi";
import { MdNearMe } from "react-icons/md";
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

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* ═══ HERO ══════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,95,0,0.12),transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-brand-400 font-semibold uppercase tracking-widest text-sm mb-3"
          >
            Transparent Pricing
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55 }}
            className="text-4xl sm:text-5xl font-extrabold text-white mb-5"
          >
            Per Ad on Road. Per Week.{" "}
            <span className="text-brand-400">Zero Surprises.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="section-sub"
          >
            Choose the tracking level that suits your budget. All plans are{" "}
            <span className="text-white font-semibold">
              per road ad per week
            </span>
            . Pick how many road ads and how many weeks — fully flexible.
          </motion.p>
        </div>
      </section>

      {/* ═══ HOW PRICING WORKS ═════════════════════════════════════ */}
      <section className="py-10 px-4 bg-dark-800/60 border-b border-dark-600">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-sm">
            <div>
              <p className="text-brand-400 font-extrabold text-2xl">
                Per Ad on Road
              </p>
              <p className="text-gray-400 mt-1">
                Pricing is per individual creative road ad
              </p>
            </div>
            <div>
              <p className="text-brand-400 font-extrabold text-2xl">Per Week</p>
              <p className="text-gray-400 mt-1">
                Billed weekly — scale up or down anytime
              </p>
            </div>
            <div>
              <p className="text-brand-400 font-extrabold text-2xl">FREE</p>
              <p className="text-gray-400 mt-1">
                Printing &amp; installation on all plans (you provide design)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WITH NFC TRACKING ═════════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-brand-500/15 border border-brand-500/30 px-4 py-2 rounded-full mb-4">
              <MdNearMe className="text-brand-400" size={18} />
              <span className="text-brand-400 font-bold text-sm uppercase tracking-widest">
                With NFC Tracking
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              An NFC tag is placed on each creative road ad. Whenever the driver
              taps it, you receive a real-time notification confirming your
              banner is live and on the road.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* NFC + SMS & WhatsApp */}
            <motion.div
              variants={fadeUp}
              className="relative card border-2 border-brand-500 shadow-xl shadow-brand-500/20 flex flex-col"
            >
              <div className="absolute -top-3 right-5 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                MOST COMPLETE
              </div>
              <div className="mb-5">
                <p className="text-gray-400 text-sm font-medium mb-1">
                  NFC + SMS &amp; WhatsApp
                </p>
                <p className="text-4xl font-extrabold text-white">
                  ₹1,499
                  <span className="text-gray-500 text-sm font-normal ml-1">
                    / road ad / week
                  </span>
                </p>
              </div>
              <ul className="space-y-3 flex-1 mb-6">
                {[
                  {
                    icon: <MdNearMe size={14} />,
                    text: "NFC tag on each creative road ad — real-time tap tracking",
                  },
                  {
                    icon: <TbBrandWhatsapp size={14} />,
                    text: "WhatsApp notification on every NFC tap",
                  },
                  {
                    icon: <FiMessageSquare size={14} />,
                    text: "SMS notification on every NFC tap",
                  },
                  {
                    icon: <FiCheck size={14} />,
                    text: "QR code on banner for audience engagement",
                  },
                  {
                    icon: <FiCheck size={14} />,
                    text: "Daily banner photo proof",
                  },
                  {
                    icon: <FiCheck size={14} />,
                    text: "Printing & installation FREE (you provide design)",
                  },
                ].map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2.5 text-sm text-gray-300"
                  >
                    <span className="text-brand-400 mt-0.5 shrink-0">
                      {item.icon}
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/contact")}
                className="btn-primary w-full text-center"
              >
                Book This Plan
              </button>
            </motion.div>

            {/* NFC + SMS Only */}
            <motion.div
              variants={fadeUp}
              className="card border-2 border-dark-600 hover:border-brand-500/40 flex flex-col transition-all duration-300"
            >
              <div className="mb-5">
                <p className="text-gray-400 text-sm font-medium mb-1">
                  NFC + SMS Only
                </p>
                <p className="text-4xl font-extrabold text-white">
                  ₹1,399
                  <span className="text-gray-500 text-sm font-normal ml-1">
                    / road ad / week
                  </span>
                </p>
              </div>
              <ul className="space-y-3 flex-1 mb-6">
                {[
                  {
                    icon: <MdNearMe size={14} />,
                    text: "NFC tag on each creative road ad — real-time tap tracking",
                  },
                  {
                    icon: <FiMessageSquare size={14} />,
                    text: "SMS notification on every NFC tap",
                  },
                  {
                    icon: <FiCheck size={14} />,
                    text: "QR code on banner for audience engagement",
                  },
                  {
                    icon: <FiCheck size={14} />,
                    text: "Daily banner photo proof",
                  },
                  {
                    icon: <FiCheck size={14} />,
                    text: "Printing & installation FREE (you provide design)",
                  },
                ].map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2.5 text-sm text-gray-300"
                  >
                    <span className="text-brand-400 mt-0.5 shrink-0">
                      {item.icon}
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/contact")}
                className="btn-outline w-full text-center"
              >
                Book This Plan
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ WITHOUT NFC TRACKING ══════════════════════════════════ */}
      <section className="py-20 px-4 bg-dark-800/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-dark-700 border border-dark-600 px-4 py-2 rounded-full mb-4">
              <FiCheck className="text-gray-400" size={16} />
              <span className="text-gray-400 font-bold text-sm uppercase tracking-widest">
                Without NFC Tracking
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              No NFC hardware — your creative road ad still goes out with daily
              photo proof and manual notifications. A budget-friendly entry
              point to ads on road.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* No NFC + SMS & WhatsApp */}
            <motion.div
              variants={fadeUp}
              className="card border-2 border-dark-600 hover:border-brand-500/40 flex flex-col transition-all duration-300"
            >
              <div className="mb-5">
                <p className="text-gray-400 text-sm font-medium mb-1">
                  SMS &amp; WhatsApp
                </p>
                <p className="text-4xl font-extrabold text-white">
                  ₹1,199
                  <span className="text-gray-500 text-sm font-normal ml-1">
                    / road ad / week
                  </span>
                </p>
              </div>
              <ul className="space-y-3 flex-1 mb-6">
                {[
                  {
                    icon: <TbBrandWhatsapp size={14} />,
                    text: "WhatsApp updates sent during the day",
                  },
                  {
                    icon: <FiMessageSquare size={14} />,
                    text: "SMS updates sent during the day",
                  },
                  {
                    icon: <FiCheck size={14} />,
                    text: "QR code on banner for audience engagement",
                  },
                  {
                    icon: <FiCheck size={14} />,
                    text: "Daily banner photo proof",
                  },
                  {
                    icon: <FiCheck size={14} />,
                    text: "Printing & installation FREE (you provide design)",
                  },
                ].map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2.5 text-sm text-gray-300"
                  >
                    <span className="text-brand-400 mt-0.5 shrink-0">
                      {item.icon}
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/contact")}
                className="btn-outline w-full text-center"
              >
                Book This Plan
              </button>
            </motion.div>

            {/* No NFC + SMS Only */}
            <motion.div
              variants={fadeUp}
              className="card border-2 border-dark-600 hover:border-brand-500/40 flex flex-col transition-all duration-300"
            >
              <div className="mb-5">
                <p className="text-gray-400 text-sm font-medium mb-1">
                  SMS Only
                </p>
                <p className="text-4xl font-extrabold text-white">
                  ₹999
                  <span className="text-gray-500 text-sm font-normal ml-1">
                    / road ad / week
                  </span>
                </p>
              </div>
              <ul className="space-y-3 flex-1 mb-6">
                {[
                  {
                    icon: <FiMessageSquare size={14} />,
                    text: "SMS updates sent during the day",
                  },
                  {
                    icon: <FiCheck size={14} />,
                    text: "QR code on banner for audience engagement",
                  },
                  {
                    icon: <FiCheck size={14} />,
                    text: "Daily banner photo proof",
                  },
                  {
                    icon: <FiCheck size={14} />,
                    text: "Printing & installation FREE (you provide design)",
                  },
                ].map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2.5 text-sm text-gray-300"
                  >
                    <span className="text-brand-400 mt-0.5 shrink-0">
                      {item.icon}
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/contact")}
                className="btn-outline w-full text-center"
              >
                Book This Plan
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ LAUNCH OFFERS ══════════════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-10"
          >
            <p className="text-brand-400 font-semibold uppercase tracking-widest text-sm mb-2">
              Limited Time
            </p>
            <h2 className="section-heading">🎁 Launch Offers</h2>
            <p className="section-sub">
              Exclusive first-time onboard pricing — printing &amp; installation
              FREE (you provide your design image)!
            </p>
          </motion.div>

          {/* First 5 businesses callout */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-8"
          >
            <div className="relative card border-2 border-yellow-500/60 bg-yellow-500/5 text-center py-5 px-6 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-brand-400 to-yellow-500" />
              <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-1">
                🔥 Early Bird Exclusive
              </p>
              <p className="text-white font-extrabold text-xl">
                First 5 Businesses Only — ₹200 Off + FREE Installation!
              </p>
              <p className="text-gray-300 text-sm mt-2">
                Pay{" "}
                <span className="text-yellow-400 font-semibold">₹200 less</span>{" "}
                on any launch offer{" "}
                <span className="text-yellow-400 font-semibold">and get installation charges waived</span>.
                Limited to the first 5 sign-ups only!
              </p>
              <div className="flex justify-center gap-8 mt-3">
                <div>
                  <p className="text-gray-500 text-xs line-through">₹2,199</p>
                  <p className="text-white font-bold">
                    ₹1,999{" "}
                    <span className="text-brand-400 text-xs">Offer 1</span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs line-through">₹1,999</p>
                  <p className="text-white font-bold">
                    ₹1,799{" "}
                    <span className="text-brand-400 text-xs">Offer 2</span>
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs text-gray-500 italic">
                * Discount applied at the time of booking confirmation with
                Shivakumar directly.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Offer 1 */}
            <motion.div
              variants={fadeUp}
              className="relative card overflow-hidden p-0 flex flex-col border-2 border-brand-500 shadow-xl shadow-brand-500/20"
            >
              <div className="absolute top-0 right-0 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                MOST POPULAR
              </div>
              <div className="p-7 flex flex-col gap-4 flex-1">
                <span className="inline-block bg-brand-500/15 text-brand-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit">
                  Launch Offer 1
                </span>
                <div>
                  <p className="text-gray-400 text-sm">
                    Best for quick city trial
                  </p>
                  <p className="text-4xl font-extrabold text-white mt-1">
                    ₹1,999
                    <span className="text-gray-500 text-base font-normal">
                      /7 days
                    </span>
                  </p>
                  <p className="text-brand-400 text-sm font-semibold mt-1">
                    3 creative road ads live
                  </p>
                </div>
                <ul className="space-y-2 text-sm text-gray-300 flex-1">
                  {[
                    "3 creative road ads covering your city",
                    "You provide design — printing & installation FREE",
                    "NFC & QR code tracking included",
                    "Daily photo proof & WhatsApp notifications",
                    "SMS alerts at every milestone",
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <FiCheck className="text-brand-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-7 pt-0">
                <button
                  onClick={() => navigate("/subscribe")}
                  className="block w-full text-center font-semibold py-3 rounded-xl transition-all duration-300 bg-brand-500 hover:bg-brand-400 text-white shadow-lg hover:shadow-brand-500/40"
                >
                  Grab This Offer
                </button>
              </div>
            </motion.div>

            {/* Offer 2 */}
            <motion.div
              variants={fadeUp}
              className="relative card overflow-hidden p-0 flex flex-col border-2 border-dark-600"
            >
              <div className="p-7 flex flex-col gap-4 flex-1">
                <span className="inline-block bg-brand-500/15 text-brand-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit">
                  Launch Offer 2
                </span>
                <div>
                  <p className="text-gray-400 text-sm">Perfect starter pack</p>
                  <p className="text-4xl font-extrabold text-white mt-1">
                    ₹1,799
                    <span className="text-gray-500 text-base font-normal">
                      /5 days
                    </span>
                  </p>
                  <p className="text-brand-400 text-sm font-semibold mt-1">
                    2 creative road ads live
                  </p>
                </div>
                <ul className="space-y-2 text-sm text-gray-300 flex-1">
                  {[
                    "2 creative road ads deployed in your area",
                    "You provide design — printing & installation FREE",
                    "NFC & QR code tracking included",
                    "Daily photo proof & WhatsApp notifications",
                    "SMS alerts at every milestone",
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <FiCheck className="text-brand-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-7 pt-0">
                <button
                  onClick={() => navigate("/subscribe")}
                  className="block w-full text-center font-semibold py-3 rounded-xl transition-all duration-300 border-2 border-brand-500 text-brand-400 hover:bg-brand-500 hover:text-white"
                >
                  Grab This Offer
                </button>
              </div>
            </motion.div>
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
              After your launch offer campaign, scale to any number of creative
              road ads for custom weekly campaigns once you've experienced the
              results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA ═══════════════════════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/95 to-brand-800/95" />
            <div className="relative z-10 p-10 md:p-14 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Ready to put your brand on the road?
              </h2>
              <p className="text-brand-100/80 text-lg mb-8 max-w-xl mx-auto">
                Contact Shivakumar directly to discuss road ads, weeks, and the
                right tracking plan for your business.
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
                  Ask Shivakumar Directly
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
