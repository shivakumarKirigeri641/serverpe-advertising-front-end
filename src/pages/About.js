import { motion } from "framer-motion";
import {
  HiOutlineLightBulb,
  HiOutlineCurrencyRupee,
  HiOutlineUserGroup,
  HiOutlineGlobe,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const values = [
  {
    icon: HiOutlineLightBulb,
    title: "Transparency",
    description:
      "Every hoarding listing shows real traffic data, verified sizes, and honest pricing. No hidden fees, ever.",
  },
  {
    icon: HiOutlineCurrencyRupee,
    title: "Better Pricing",
    description:
      "My transparent pricing ensures you always get the best value. No hidden fees, no auctions — just straightforward, honest pricing.",
  },
  {
    icon: HiOutlineUserGroup,
    title: "Connecting Advertisers",
    description:
      "I bridge the gap between advertisers looking for visibility and hoarding owners with premium locations.",
  },
  {
    icon: HiOutlineGlobe,
    title: "Starting in Bangalore",
    description:
      "Currently live in Bangalore — starting with the city I know best. More cities are on the roadmap as the platform grows.",
  },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              I help businesses find the best advertising spaces easily and
              transparently
            </h1>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed">
              ServerPe™ is a hoarding marketplace I built to connect advertisers
              with verified billboard locations in Bangalore. My mission is
              simple — make outdoor advertising accessible, transparent, and
              effective for businesses of every size.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          className="text-center mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="section-heading">What I Stand For</h2>
          <p className="section-sub">My core values guide everything I build</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex gap-5"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center">
                <v.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {v.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {v.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="section-heading text-center mb-8">My Story</h2>
            <div className="prose prose-gray max-w-none text-gray-500 leading-relaxed space-y-4">
              <p>
                I noticed that outdoor advertising — one of the most effective
                marketing channels — was stuck in an opaque, fragmented system.
                Advertisers had no easy way to compare locations, verify traffic
                data, or get fair pricing.
              </p>
              <p>
                That's why I built ServerPe™ — a platform where you can browse
                verified hoardings, see real traffic numbers, and book
                transparently for the best spots. Whether you're a local
                business or a growing brand, I make it simple to find the right
                place to promote your message.
              </p>
              <p>
                I'm starting in Bangalore — the city I know best — and I'm
                committed to making this the most trusted platform for outdoor
                advertising in the city, and beyond.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="max-w-3xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="section-heading text-center mb-10">
            Meet the Founder
          </h2>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10 flex flex-col sm:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-primary-100 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                  alt="Founder of ServerPe"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs font-semibold text-primary-600 text-center mt-3 uppercase tracking-widest">
                Founder
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                The person behind ServerPe™
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                I'm a developer and entrepreneur from Bangalore with a passion
                for making outdoor advertising transparent and accessible. I
                built this platform myself — from the code to the hoarding
                verification process. Every listing is one I've personally
                reviewed.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <a
                  href="mailto:support@serverpe.in"
                  className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  <HiOutlineMail className="w-4 h-4" />
                  support@serverpe.in
                </a>
                <a
                  href="tel:+917996083415"
                  className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  <HiOutlinePhone className="w-4 h-4" />
                  +91 79960 83415
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-3xl p-10 md:p-14 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Ready to advertise?
          </h2>
          <p className="text-primary-100 max-w-lg mx-auto mb-8">
            Explore verified hoardings in Bangalore and find the perfect
            location for your campaign.
          </p>
          <a
            href="/hoardings"
            className="inline-flex items-center bg-white text-primary-700 font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Explore Hoardings &rarr;
          </a>
        </motion.div>
      </section>
    </div>
  );
}
