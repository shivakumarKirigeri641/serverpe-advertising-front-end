import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../images/logo1.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Pricing", to: "/pricing" },
  { label: "About Me", to: "/about" },
  { label: "Contact Me", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeClass = "text-brand-400 font-semibold";
  const inactiveClass =
    "text-gray-300 hover:text-brand-400 transition-colors duration-200 font-medium";

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark-900/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-dark-700"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="ServerPe Ads Logo"
              className="w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-200"
            />
            <span className="text-white font-extrabold text-lg leading-tight">
              ServerPe<sup className="text-[9px] align-super font-bold">™</sup>
              <span className="text-brand-400"> Ads</span>
            </span>
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  isActive ? activeClass : inactiveClass
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/subscribe")}
              className="btn-primary text-sm"
            >
              🚀 Get Launch Offer
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-300 hover:text-brand-400 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-dark-800 border-t border-dark-600 overflow-hidden"
          >
            <div className="px-5 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/subscribe");
                }}
                className="btn-primary text-sm w-full text-center"
              >
                🚀 Get Launch Offer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
