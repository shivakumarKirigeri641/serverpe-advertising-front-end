import React from "react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500">Last updated: March 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-gray-600">
            <h2 className="text-2xl font-bold text-gray-900 font-heading mt-8 mb-4">
              1. Introduction
            </h2>
            <p>
              ServerPE™ is an individual initiative by Shivakumar Kirigeri,
              providing ads-on-movement advertising services in Bengaluru. This
              Privacy Policy explains how I collect, use, and safeguard your
              information when you visit this website or get in touch for
              advertising services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 font-heading mt-8 mb-4">
              2. Information I Collect
            </h2>
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
              2.1 Personal Information
            </h3>
            <p>
              When you contact me or submit an enquiry through this website, I
              may collect:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Full name</li>
              <li>Mobile number</li>
              <li>Email address (if provided)</li>
              <li>Query type and message content</li>
              <li>Brand name and business details (for campaign planning)</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
              2.2 Automatically Collected Information
            </h3>
            <p>We may automatically collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address</li>
              <li>Browser type and version (user agent)</li>
              <li>Pages visited and time spent</li>
              <li>Device information</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 font-heading mt-8 mb-4">
              3. How I Use Your Information
            </h2>
            <p>I use the information you provide to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to your advertising enquiries personally</li>
              <li>Plan and manage your ads-on-movement advertising campaign</li>
              <li>
                Send NFC-triggered campaign tracking notifications via SMS or
                WhatsApp (when applicable)
              </li>
              <li>Send important updates about your running campaign</li>
              <li>Improve the website experience</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 font-heading mt-8 mb-4">
              4. Data Sharing &amp; Disclosure
            </h2>
            <p>
              I do <strong>not</strong> sell, trade, or rent your personal
              information to third parties. Information may be shared only:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>With your explicit consent</li>
              <li>
                Via SMS/WhatsApp gateway services to deliver campaign tracking
                notifications
              </li>
              <li>To comply with legal obligations or court orders</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 font-heading mt-8 mb-4">
              5. Data Security
            </h2>
            <p>
              I implement appropriate security measures to protect your personal
              information. However, no method of internet transmission is 100%
              secure, and absolute security cannot be guaranteed.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 font-heading mt-8 mb-4">
              6. Data Retention
            </h2>
            <p>
              Your information is retained only for as long as necessary to
              fulfill the purposes described in this policy, or as required by
              law.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 font-heading mt-8 mb-4">
              7. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal data I hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p>
              To exercise any of these rights, please contact me via the Contact
              page or WhatsApp.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 font-heading mt-8 mb-4">
              8. Cookies
            </h2>
            <p>
              This website may use essential cookies for session management and
              basic functionality. These do not track you across other websites.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 font-heading mt-8 mb-4">
              9. Third-Party Links
            </h2>
            <p>
              This website may contain links to third-party platforms (e.g.,
              WhatsApp). I am not responsible for the privacy practices of those
              external sites.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 font-heading mt-8 mb-4">
              10. Children's Privacy
            </h2>
            <p>
              This service is not directed to individuals under the age of 18. I
              do not knowingly collect personal information from minors.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 font-heading mt-8 mb-4">
              11. Changes to This Policy
            </h2>
            <p>
              This Privacy Policy may be updated from time to time. Any changes
              will be posted on this page with an updated revision date.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 font-heading mt-8 mb-4">
              12. Contact
            </h2>
            <p>
              For any questions about this Privacy Policy, please reach out:
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
        </div>
      </section>
    </div>
  );
};

export default Privacy;
