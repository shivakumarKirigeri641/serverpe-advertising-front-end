import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineMail, HiOutlinePhone, HiOutlineClock } from "react-icons/hi";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.45, ease: "easeOut" },
  }),
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        className="max-w-3xl mx-auto text-center mb-14"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Get in Touch
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Have a question about hoardings, booking, or anything else? Drop us a
          message and we'll get back to you within 24 hours.
        </p>

        {/* Team intro */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          {[
            {
              initials: "SK",
              name: "Shivakumar Kirigeri",
              role: "Software Engineer",
              colorBg: "bg-primary-100",
              colorText: "text-primary-700",
            },
            {
              initials: "AJ",
              name: "Amruta Jegarkal",
              role: "Project Manager",
              colorBg: "bg-accent-100",
              colorText: "text-accent-700",
            },
          ].map((member, i) => (
            <motion.div
              key={member.initials}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 w-full sm:w-56"
            >
              <div
                className={`w-12 h-12 rounded-full ${member.colorBg} flex items-center justify-center ${member.colorText} font-bold text-lg mb-2`}
              >
                {member.initials}
              </div>
              <p className="font-semibold text-gray-900 text-sm">
                {member.name}
              </p>
              <p className="text-xs text-primary-600 font-medium mt-0.5">
                {member.role}
              </p>
              <p className="text-xs text-gray-400 mt-1">13+ yrs experience</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-sm text-gray-400">
          Prefer a quick chat? Reach us on WhatsApp at{" "}
          <a
            href="https://wa.me/917996083415"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            +91 79960 83415
          </a>
          .
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="lg:col-span-2 space-y-6">
          {[
            {
              icon: HiOutlineMail,
              label: "Email",
              value: "support@serverpe.in",
              href: "mailto:support@serverpe.in",
            },
            {
              icon: HiOutlinePhone,
              label: "Phone",
              value: "+91 79960 83415",
              href: "tel:+917996083415",
            },
            {
              icon: HiOutlineClock,
              label: "Response Time",
              value: "Within 24 hours",
              href: null,
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-400">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-gray-900 font-medium hover:text-primary-600 transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-gray-900 font-medium">{item.value}</p>
                )}
              </div>
            </motion.div>
          ))}

          <div className="bg-primary-50 rounded-2xl p-6">
            <p className="text-sm text-primary-700 font-medium leading-relaxed">
              💬 We usually respond within 24 hours. For urgent enquiries,
              please call us directly at{" "}
              <a href="tel:+917996083415" className="underline">
                +91 79960 83415
              </a>
              .
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <motion.div
          className="lg:col-span-3"
          variants={fadeUp}
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiOutlineMail className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-500 mb-6">
                  Thanks for reaching out. We'll get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Rahul Sharma"
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="rahul@example.com"
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your advertising needs..."
                    rows={5}
                    className="input-field resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn-primary text-lg py-3.5"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
