import { NavLink } from "react-router-dom";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import logo from "../images/logo1.png";

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-dark-600 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src={logo}
                alt="ServerPe Ads Logo"
                className="w-9 h-9 object-contain"
              />
              <span className="text-white font-extrabold text-lg">
                ServerPe
                <sup className="text-[9px] align-super font-bold">™</sup>
                <span className="text-brand-400"> Ads</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              An individual initiative putting your brand on wheels. Direct
              contact, real tracking, zero agency fees.
            </p>
            <div className="flex gap-4 mt-5">
              <a
                href="https://wa.me/917996083415"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors text-xl"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors text-xl"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", to: "/" },
                { label: "Services", to: "/services" },
                { label: "Pricing", to: "/pricing" },
                { label: "About Me", to: "/about" },
                { label: "Contact Me", to: "/contact" },
                { label: "Get Launch Offer", to: "/subscribe" },
                { label: "Privacy Policy", to: "/privacy" },
                { label: "Terms & Conditions", to: "/terms" },
              ].map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className="text-gray-400 hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get In Touch</h4>
            <p className="text-gray-400 text-sm mb-2">
              Direct contact with Shivakumar — no customer care, real answers.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              📞{" "}
              <a
                href="tel:+917996083415"
                className="hover:text-brand-400 transition-colors"
              >
                +91 79960 83415
              </a>
            </p>
            <p className="text-gray-400 text-sm mt-1">
              🌐{" "}
              <a
                href="https://serverpe.in"
                target="_blank"
                rel="noreferrer"
                className="text-brand-400 hover:underline"
              >
                serverpe.in
              </a>
            </p>
            <NavLink
              to="/contact"
              className="inline-block mt-3 btn-outline text-sm py-2 px-4"
            >
              Send a Message
            </NavLink>
          </div>
        </div>

        <div className="border-t border-dark-600 mt-10 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} ServerPE™ Advertising. An initiative by
          Shivakumar Kirigeri. Powered by{" "}
          <a
            href="https://serverpe.in"
            target="_blank"
            rel="noreferrer"
            className="text-brand-400 hover:underline"
          >
            serverpe.in
          </a>
        </div>
      </div>
    </footer>
  );
}
