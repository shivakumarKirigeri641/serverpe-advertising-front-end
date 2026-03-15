import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FiSend, FiMessageSquare, FiUser, FiPhone } from "react-icons/fi";
import { getQueryTypes, submitContactMe } from "../utils/api";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" },
  }),
};

const initialForm = {
  user_name: "",
  mobile_number: "",
  query_type: "",
  message: "",
};

export default function ContactMe() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [queryTypes, setQueryTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch query types on mount
  useEffect(() => {
    getQueryTypes()
      .then((res) => {
        const types = res.data?.data?.query_types || [];
        setQueryTypes(types);
      })
      .catch(() => {
        toast.error(
          "Failed to load query types. Please refresh and try again.",
        );
      })
      .finally(() => setLoadingTypes(false));
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.user_name.trim()) errs.user_name = "Name is required.";
    if (!form.mobile_number.trim()) {
      errs.mobile_number = "Mobile number is required.";
    } else if (!/^\d{10}$/.test(form.mobile_number.trim())) {
      errs.mobile_number = "Enter a valid 10-digit mobile number.";
    }
    if (!form.query_type) errs.query_type = "Please select a query type.";
    if (!form.message.trim()) errs.message = "Message is required.";
    else if (form.message.trim().length < 10)
      errs.message = "Message too short — at least 10 characters.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        user_name: form.user_name.trim(),
        mobile_number: form.mobile_number.trim(),
        query_type: form.query_type,
        message: form.message.trim(),
      };
      await submitContactMe(payload);
      toast.success("Message sent! I'll get back to you soon. 🙌");
      setForm(initialForm);
      setErrors({});
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24">
      {/* ── Hero ── */}
      <section className="py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-brand-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-brand-500/15 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
              Contact Me
            </span>
            <h1 className="section-heading text-5xl mb-4">
              Let's <span className="text-brand-400">Talk</span>
            </h1>
            <p className="section-sub">
              No customer care queues. No bots. You're reaching{" "}
              <span className="text-white font-medium">Shivakumar</span>{" "}
              directly. Do expect a little delay in response — I also work
              full-time as a software engineer — but I will definitely respond
              personally.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Form + Info ── */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info Panel */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="lg:col-span-2 space-y-6"
          >
            {[
              {
                icon: <FiUser size={20} />,
                title: "Direct Contact",
                desc: "You're talking directly to Shivakumar Kirigeri — no helpdesk, no ticket system, no customer care queues.",
              },
              {
                icon: <FiPhone size={20} />,
                title: "Response Time",
                desc: "I personally respond to every message. Do expect a little delay — I'm also working as a regular software engineer — but I will definitely get back to you.",
              },
              {
                icon: <FiMessageSquare size={20} />,
                title: "What to Ask",
                desc: "Campaign queries, pricing discussions, tracking doubts, partnership ideas — any topic welcome.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="card group hover:border-brand-500/40 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-500/15 rounded-xl flex items-center justify-center text-brand-400 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="lg:col-span-3"
          >
            <div className="card border-dark-600">
              <h2 className="text-xl font-bold text-white mb-6">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label className="label" htmlFor="user_name">
                    Your Name *
                  </label>
                  <input
                    id="user_name"
                    name="user_name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Shiva Kumar"
                    value={form.user_name}
                    onChange={handleChange}
                    className={`input-field ${errors.user_name ? "ring-2 ring-red-500 border-red-500" : ""}`}
                  />
                  {errors.user_name && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.user_name}
                    </p>
                  )}
                </div>

                {/* Mobile */}
                <div>
                  <label className="label" htmlFor="mobile_number">
                    Mobile Number *
                  </label>
                  <input
                    id="mobile_number"
                    name="mobile_number"
                    type="tel"
                    autoComplete="tel"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    value={form.mobile_number}
                    onChange={handleChange}
                    className={`input-field ${errors.mobile_number ? "ring-2 ring-red-500 border-red-500" : ""}`}
                  />
                  {errors.mobile_number && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.mobile_number}
                    </p>
                  )}
                </div>

                {/* Query Type */}
                <div>
                  <label className="label" htmlFor="query_type">
                    Query Type *
                  </label>
                  {loadingTypes ? (
                    <div className="input-field text-gray-500 flex items-center gap-2">
                      <span className="inline-block w-4 h-4 border-2 border-brand-400 border-t-transparent rounded-full animate-spin" />
                      Loading options…
                    </div>
                  ) : (
                    <select
                      id="query_type"
                      name="query_type"
                      value={form.query_type}
                      onChange={handleChange}
                      className={`input-field ${errors.query_type ? "ring-2 ring-red-500 border-red-500" : ""}`}
                    >
                      <option value="" disabled>
                        Select a query type
                      </option>
                      {queryTypes.map((qt) => (
                        <option key={qt.id ?? qt.name} value={qt.name}>
                          {qt.name}
                        </option>
                      ))}
                    </select>
                  )}
                  {errors.query_type && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.query_type}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="label" htmlFor="message">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell me what you'd like to discuss…"
                    value={form.message}
                    onChange={handleChange}
                    className={`input-field resize-none ${errors.message ? "ring-2 ring-red-500 border-red-500" : ""}`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: submitting ? 1 : 1.02 }}
                  whileTap={{ scale: submitting ? 1 : 0.97 }}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <FiSend size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
