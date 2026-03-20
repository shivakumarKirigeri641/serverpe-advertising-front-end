import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/hoardings", label: "Explore Hoardings" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-primary-600" : "text-gray-600 hover:text-primary-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SP</span>
            </div>
            <span className="text-lg font-bold text-gray-900">
              ServerPe<sup className="text-[10px] align-super font-bold">™</sup>{" "}
              <span className="text-primary-600">Ads</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClass}
                end={link.to === "/"}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/advertiser/login"
              className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors px-4 py-2"
            >
              Login to Book
            </Link>
            <Link
              to="/hoardings"
              className="text-sm font-semibold bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Start Advertising
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {open ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClass}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
              >
                <div className="py-2">{link.label}</div>
              </NavLink>
            ))}
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <Link
                to="/advertiser/login"
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-gray-600 py-2"
              >
                Login to Book
              </Link>
              <Link
                to="/hoardings"
                onClick={() => setOpen(false)}
                className="text-sm font-semibold bg-primary-600 text-white py-2.5 rounded-lg text-center block"
              >
                Start Advertising
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
