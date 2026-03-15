import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import { getBusinessTypes, getStatesAndCities } from "../utils/api";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const initialForm = {
  business_name: "",
  business_type: "",
  business_description: "",
  primary_contact_name: "",
  primary_mobile: "",
  primary_email: "",
  secondary_contact_name: "",
  secondary_mobile: "",
  secondary_email: "",
  state: "",
  city: "",
  pincode: "",
};

function FieldError({ msg }) {
  return msg ? <p className="text-red-400 text-xs mt-1">{msg}</p> : null;
}

export default function Subscribe() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [businessTypes, setBusinessTypes] = useState([]);
  const [statesData, setStatesData] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [loadingStates, setLoadingStates] = useState(true);

  // Fetch dropdowns
  useEffect(() => {
    getBusinessTypes()
      .then((res) => {
        const types = res.data?.data?.business_types || res.data?.data || [];
        setBusinessTypes(Array.isArray(types) ? types : []);
      })
      .catch(() => toast.error("Failed to load business types."))
      .finally(() => setLoadingTypes(false));

    getStatesAndCities()
      .then((res) => {
        const states =
          res.data?.data?.states ||
          res.data?.data?.states_unions_cities ||
          res.data?.data ||
          [];
        setStatesData(Array.isArray(states) ? states : []);
      })
      .catch(() => toast.error("Failed to load states & cities."))
      .finally(() => setLoadingStates(false));
  }, []);

  // Update cities when state changes
  useEffect(() => {
    if (!form.state) {
      setCities([]);
      return;
    }
    const found = statesData.find(
      (s) => (s.state_name || s.name || s) === form.state,
    );
    const citiesArr =
      found?.cities || found?.districts || found?.city_list || [];
    setCities(Array.isArray(citiesArr) ? citiesArr : []);
    setForm((prev) => ({ ...prev, city: "" }));
  }, [form.state, statesData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.business_name.trim())
      errs.business_name = "Business name is required.";
    if (!form.business_type)
      errs.business_type = "Please select a business type.";
    if (!form.business_description.trim())
      errs.business_description = "Business description is required.";
    if (!form.primary_contact_name.trim())
      errs.primary_contact_name = "Primary contact name is required.";
    if (!form.primary_mobile.trim()) {
      errs.primary_mobile = "Primary mobile is required.";
    } else if (!/^\d{10}$/.test(form.primary_mobile.trim())) {
      errs.primary_mobile = "Enter a valid 10-digit mobile number.";
    }
    if (
      form.primary_email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.primary_email.trim())
    ) {
      errs.primary_email = "Enter a valid email address.";
    }
    if (
      form.secondary_mobile.trim() &&
      !/^\d{10}$/.test(form.secondary_mobile.trim())
    ) {
      errs.secondary_mobile = "Enter a valid 10-digit mobile number.";
    }
    if (
      form.secondary_email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.secondary_email.trim())
    ) {
      errs.secondary_email = "Enter a valid email address.";
    }
    if (!form.state) errs.state = "Please select a state.";
    if (!form.city.trim()) errs.city = "City is required.";
    if (!form.pincode.trim()) {
      errs.pincode = "Pincode is required.";
    } else if (!/^\d{6}$/.test(form.pincode.trim())) {
      errs.pincode = "Enter a valid 6-digit pincode.";
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      toast.error("Please fix the highlighted errors before submitting.");
      return;
    }
    // For now: show alert as specified in requirements
    alert(
      `🎉 Thank you, ${form.primary_contact_name}!\n\n` +
        `Your subscription for "${form.business_name}" has been received.\n` +
        `We'll contact you shortly on ${form.primary_mobile} to confirm your launch offer.\n\n` +
        `Stay tuned for your NFC & QR tracking notifications! 🚀`,
    );
  };

  const SelectField = ({
    id,
    name,
    value,
    onChange,
    children,
    disabled,
    error,
    loading,
  }) => (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled || loading}
        className={`input-field appearance-none pr-10 ${
          error ? "ring-2 ring-red-500 border-red-500" : ""
        } ${loading ? "opacity-60" : ""}`}
      >
        {children}
      </select>
      <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* ── Hero ── */}
      <section className="py-12 px-4 text-center relative overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-brand-500/15 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
              Launch Offer Subscription
            </span>
            <h1 className="section-heading text-4xl md:text-5xl mb-4">
              Subscribe &amp; Get Your{" "}
              <span className="text-brand-400">Free Banner</span>
            </h1>
            <p className="section-sub">
              Fill in your business details to lock in an exclusive launch
              offer. Banner printing &amp; installation are completely FREE for
              first-time subscribers.
            </p>
          </motion.div>

          {/* Offer quick-view */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="grid grid-cols-2 gap-4 max-w-lg mx-auto mt-8"
          >
            {[
              { label: "Launch Offer 1", detail: "3 Autos · 7 Days · ₹1,499" },
              { label: "Launch Offer 2", detail: "2 Autos · 5 Days · ₹1,299" },
            ].map((o, i) => (
              <div
                key={i}
                className="card border-brand-500/30 text-center py-4"
              >
                <p className="text-brand-400 text-xs font-bold uppercase tracking-wide">
                  {o.label}
                </p>
                <p className="text-white font-semibold text-sm mt-1">
                  {o.detail}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Form ── */}
      <section className="px-4">
        <div className="max-w-4xl mx-auto">
          <motion.form
            initial="hidden"
            animate="visible"
            variants={stagger}
            onSubmit={handleSubmit}
            noValidate
            className="card border-dark-600 space-y-8"
          >
            {/* ─ Business Info ─ */}
            <motion.div variants={fadeUp}>
              <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-6 h-6 bg-brand-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                  1
                </span>
                Business Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="label" htmlFor="business_name">
                    Business Name *
                  </label>
                  <input
                    id="business_name"
                    name="business_name"
                    type="text"
                    placeholder="Your business name"
                    value={form.business_name}
                    onChange={handleChange}
                    className={`input-field ${errors.business_name ? "ring-2 ring-red-500 border-red-500" : ""}`}
                  />
                  <FieldError msg={errors.business_name} />
                </div>

                <div>
                  <label className="label" htmlFor="business_type">
                    Business Type *
                  </label>
                  <SelectField
                    id="business_type"
                    name="business_type"
                    value={form.business_type}
                    onChange={handleChange}
                    error={errors.business_type}
                    loading={loadingTypes}
                  >
                    <option value="" disabled>
                      {loadingTypes ? "Loading…" : "Select business type"}
                    </option>
                    {businessTypes.map((bt) => (
                      <option
                        key={bt.id ?? bt.name ?? bt}
                        value={bt.name ?? bt}
                      >
                        {bt.name ?? bt}
                      </option>
                    ))}
                  </SelectField>
                  <FieldError msg={errors.business_type} />
                </div>

                <div className="md:col-span-2">
                  <label className="label" htmlFor="business_description">
                    Business Description *
                  </label>
                  <textarea
                    id="business_description"
                    name="business_description"
                    rows={3}
                    placeholder="Briefly describe your business and what you want to advertise…"
                    value={form.business_description}
                    onChange={handleChange}
                    className={`input-field resize-none ${errors.business_description ? "ring-2 ring-red-500 border-red-500" : ""}`}
                  />
                  <FieldError msg={errors.business_description} />
                </div>
              </div>
            </motion.div>

            <div className="border-t border-dark-600" />

            {/* ─ Primary Contact ─ */}
            <motion.div variants={fadeUp}>
              <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-6 h-6 bg-brand-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                  2
                </span>
                Primary Contact Person
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="label" htmlFor="primary_contact_name">
                    Full Name *
                  </label>
                  <input
                    id="primary_contact_name"
                    name="primary_contact_name"
                    type="text"
                    autoComplete="name"
                    placeholder="Full name"
                    value={form.primary_contact_name}
                    onChange={handleChange}
                    className={`input-field ${errors.primary_contact_name ? "ring-2 ring-red-500 border-red-500" : ""}`}
                  />
                  <FieldError msg={errors.primary_contact_name} />
                </div>
                <div>
                  <label className="label" htmlFor="primary_mobile">
                    Mobile Number *
                  </label>
                  <input
                    id="primary_mobile"
                    name="primary_mobile"
                    type="tel"
                    autoComplete="tel"
                    placeholder="10-digit number"
                    maxLength={10}
                    value={form.primary_mobile}
                    onChange={handleChange}
                    className={`input-field ${errors.primary_mobile ? "ring-2 ring-red-500 border-red-500" : ""}`}
                  />
                  <FieldError msg={errors.primary_mobile} />
                </div>
                <div>
                  <label className="label" htmlFor="primary_email">
                    Email (optional)
                  </label>
                  <input
                    id="primary_email"
                    name="primary_email"
                    type="email"
                    autoComplete="email"
                    placeholder="email@example.com"
                    value={form.primary_email}
                    onChange={handleChange}
                    className={`input-field ${errors.primary_email ? "ring-2 ring-red-500 border-red-500" : ""}`}
                  />
                  <FieldError msg={errors.primary_email} />
                </div>
              </div>
            </motion.div>

            <div className="border-t border-dark-600" />

            {/* ─ Secondary Contact ─ */}
            <motion.div variants={fadeUp}>
              <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                <span className="w-6 h-6 bg-dark-600 rounded-lg flex items-center justify-center text-gray-400 text-xs font-bold">
                  3
                </span>
                Secondary Contact Person
                <span className="text-gray-500 text-sm font-normal">
                  (optional)
                </span>
              </h2>
              <p className="text-gray-500 text-xs mb-5">
                Add a backup contact for your campaign.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="label" htmlFor="secondary_contact_name">
                    Full Name
                  </label>
                  <input
                    id="secondary_contact_name"
                    name="secondary_contact_name"
                    type="text"
                    placeholder="Full name"
                    value={form.secondary_contact_name}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label" htmlFor="secondary_mobile">
                    Mobile Number
                  </label>
                  <input
                    id="secondary_mobile"
                    name="secondary_mobile"
                    type="tel"
                    placeholder="10-digit number"
                    maxLength={10}
                    value={form.secondary_mobile}
                    onChange={handleChange}
                    className={`input-field ${errors.secondary_mobile ? "ring-2 ring-red-500 border-red-500" : ""}`}
                  />
                  <FieldError msg={errors.secondary_mobile} />
                </div>
                <div>
                  <label className="label" htmlFor="secondary_email">
                    Email
                  </label>
                  <input
                    id="secondary_email"
                    name="secondary_email"
                    type="email"
                    placeholder="email@example.com"
                    value={form.secondary_email}
                    onChange={handleChange}
                    className={`input-field ${errors.secondary_email ? "ring-2 ring-red-500 border-red-500" : ""}`}
                  />
                  <FieldError msg={errors.secondary_email} />
                </div>
              </div>
            </motion.div>

            <div className="border-t border-dark-600" />

            {/* ─ Location ─ */}
            <motion.div variants={fadeUp}>
              <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-6 h-6 bg-brand-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                  4
                </span>
                Campaign Location
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="label" htmlFor="state">
                    State / Union Territory *
                  </label>
                  <SelectField
                    id="state"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    error={errors.state}
                    loading={loadingStates}
                  >
                    <option value="" disabled>
                      {loadingStates ? "Loading…" : "Select state"}
                    </option>
                    {statesData.map((s) => {
                      const name = s.state_name || s.name || s;
                      return (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      );
                    })}
                  </SelectField>
                  <FieldError msg={errors.state} />
                </div>

                <div>
                  <label className="label" htmlFor="city">
                    City *
                  </label>
                  {cities.length > 0 ? (
                    <SelectField
                      id="city"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      error={errors.city}
                    >
                      <option value="" disabled>
                        Select city
                      </option>
                      {cities.map((c) => {
                        const name = c.city_name || c.name || c;
                        return (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        );
                      })}
                    </SelectField>
                  ) : (
                    <input
                      id="city"
                      name="city"
                      type="text"
                      placeholder={
                        form.state ? "Enter your city" : "Select a state first"
                      }
                      value={form.city}
                      onChange={handleChange}
                      disabled={!form.state}
                      className={`input-field ${errors.city ? "ring-2 ring-red-500 border-red-500" : ""} ${!form.state ? "opacity-50" : ""}`}
                    />
                  )}
                  <FieldError msg={errors.city} />
                </div>

                <div>
                  <label className="label" htmlFor="pincode">
                    Pincode *
                  </label>
                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    placeholder="6-digit pincode"
                    maxLength={6}
                    value={form.pincode}
                    onChange={handleChange}
                    className={`input-field ${errors.pincode ? "ring-2 ring-red-500 border-red-500" : ""}`}
                  />
                  <FieldError msg={errors.pincode} />
                </div>
              </div>
            </motion.div>

            {/* ─ Perks reminder ─ */}
            <motion.div variants={fadeUp}>
              <div className="bg-brand-500/10 border border-brand-500/25 rounded-xl p-5">
                <p className="text-brand-400 font-semibold text-sm mb-3">
                  ✅ What's included with your subscription
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
                  {[
                    "Banner print & installation — FREE",
                    "NFC tap tracking on each auto",
                    "QR code for passer-by engagement",
                    "Daily WhatsApp & SMS notifications",
                    "Daily photo proof of your live banner",
                    "Portal tracking dashboard access",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <FiCheck className="text-brand-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* ─ Submit ─ */}
            <motion.div variants={fadeUp}>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2"
              >
                🚀 Subscribe &amp; Lock My Launch Offer
              </motion.button>
              <p className="text-gray-500 text-xs text-center mt-3">
                By subscribing you agree to be contacted about your advertising
                campaign. No spam — ever.
              </p>
            </motion.div>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
