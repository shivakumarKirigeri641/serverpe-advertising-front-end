import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const Terms = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-gray-500">Last updated: March 2026</p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-white">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="prose prose-lg max-w-none text-gray-600">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing this website or contacting ServerPe™ for advertising
              services, you agree to be bound by these Terms &amp; Conditions.
              If you do not agree, please do not use this service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              2. Description of Services
            </h2>
            <p>
              ServerPe™, operated by Shivakumar Kirigeri, provides on-road
              creative ad advertising services in Bengaluru. Services include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Printing the advertiser-supplied design image to compact road-ad
                dimensions
              </li>
              <li>
                Laminating and installing the printed creative ad on road with
                movement drivers
              </li>
              <li>
                NFC-based campaign tracking — SMS/WhatsApp notifications
                triggered when the driver taps the NFC tag
              </li>
              <li>
                Direct communication with the advertiser throughout the campaign
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              3. Design &amp; Printing Policy
            </h2>
            <p>
              <strong>Design is the advertiser's responsibility.</strong> I do
              not create or modify advertising designs. The advertiser must
              provide a complete, print-ready design image. I will print the
              provided design to standard compact road-ad dimensions, laminate
              it, and prepare it for installation.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                The advertiser must supply the design file in a suitable format
                and resolution
              </li>
              <li>
                I am not responsible for poor print quality resulting from
                low-resolution or incorrect design files provided by the
                advertiser
              </li>
              <li>
                The design content must be lawful and must not contain
                defamatory, obscene, or illegal material
              </li>
              <li>
                Campaign pricing includes printing and installation — no design
                creation service is offered or charged
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              4. Advertiser Responsibilities
            </h2>
            <p>As an advertiser, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Provide an accurate, complete, and print-ready design image
              </li>
              <li>
                Ensure your design content complies with all applicable laws
              </li>
              <li>
                Provide correct contact details (name, mobile, business name)
              </li>
              <li>
                Make payment as agreed before campaign installation begins
              </li>
              <li>
                Not hold me responsible for print quality if an incorrect or
                low-resolution file is supplied
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              5. Campaign Duration &amp; Operation
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Campaign duration and road ad count will be agreed upon before
                installation
              </li>
              <li>Creative road ads serve as the primary advertising medium</li>
              <li>
                Road ad availability and routing are subject to the driver’s
                normal operations — specific routes cannot be guaranteed
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              6. Pricing &amp; Payment
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Pricing will be clearly communicated before any campaign begins
              </li>
              <li>
                Current launch pricing starts from ₹1,799 — inclusive of
                printing and installation (advertiser provides the design image)
              </li>
              <li>Full payment is expected prior to banner installation</li>
              <li>
                Refund terms, if applicable, will be communicated on a
                case-by-case basis
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              7. NFC Tracking Notifications
            </h2>
            <p>
              Campaign tracking is provided via NFC tags on each creative road
              ad. An SMS and/or WhatsApp notification is triggered whenever the
              driver taps the NFC tag. Please note:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Notification frequency depends on how often the driver taps the
                NFC tag
              </li>
              <li>
                Regular notifications are encouraged but cannot be contractually
                guaranteed
              </li>
              <li>
                Delivery of SMS/WhatsApp messages depends on the third-party
                gateway and the recipient's network
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              8. Intellectual Property
            </h2>
            <p>
              The advertiser retains full ownership of their design image. The
              ServerPe™ brand, website content, and platform concept are the
              intellectual property of Shivakumar Kirigeri and may not be copied
              or used without written permission.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              9. Limitation of Liability
            </h2>
            <p>
              ServerPe™ shall not be liable for any indirect, incidental, or
              consequential damages arising from the use of this service. Total
              liability shall not exceed the amount paid for the specific
              campaign in question.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              10. Disclaimer of Warranties
            </h2>
            <p>
              Services are provided "as is." While I strive for reliability, I
              make no warranties regarding specific campaign outcomes, audience
              reach, or conversion results from ads on movement.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              11. Governing Law
            </h2>
            <p>
              These Terms &amp; Conditions are governed by the laws of India.
              Any disputes shall be subject to the jurisdiction of courts in
              Bengaluru, Karnataka.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              12. Changes to Terms
            </h2>
            <p>
              I reserve the right to update these Terms at any time. Changes
              will be posted on this page with an updated date. Continued use of
              the service after changes constitutes acceptance of the updated
              terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              13. Contact
            </h2>
            <p>
              For questions about these Terms &amp; Conditions, please reach
              out:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Via the{" "}
                <a href="/contact" className="text-primary-600 hover:underline">
                  Contact Page
                </a>
              </li>
              <li>Via WhatsApp: +91 79960 83415</li>
            </ul>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Terms;
