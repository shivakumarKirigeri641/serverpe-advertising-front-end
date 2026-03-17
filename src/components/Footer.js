import { Link } from "react-router-dom";

const footerLinks = [
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/hoardings", label: "Explore Hoardings" },
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SP</span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                ServerPe
                <sup className="text-[10px] align-super font-bold">™</sup>{" "}
                <span className="text-primary-600">Ads</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Find the right place to promote your business. Transparent
              pricing, verified locations, easy booking.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-500 hover:text-primary-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Get In Touch</h4>
            <p className="text-sm text-gray-500 mb-2">
              Have a question? I'm here to help.
            </p>
            <p className="text-sm text-gray-500">
              Email:{" "}
              <a
                href="mailto:support@serverpe.in"
                className="text-primary-600 hover:underline"
              >
                support@serverpe.in
              </a>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Phone:{" "}
              <a
                href="tel:+917996083415"
                className="text-primary-600 hover:underline"
              >
                +91 79960 83415
              </a>
            </p>
            <Link
              to="/contact"
              className="inline-block mt-4 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              Send a Message &rarr;
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} ServerPe. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>🔒 Secure booking</span>
            <span className="text-gray-200">|</span>
            <span>✓ Verified locations</span>
            <span className="text-gray-200">|</span>
            <span>📸 Proof of installation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
