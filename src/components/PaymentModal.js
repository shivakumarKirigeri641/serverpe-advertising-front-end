import {
  HiOutlineX,
  HiOutlineCursorClick,
  HiOutlineCheckCircle,
  HiOutlineShieldCheck,
  HiOutlinePhotograph,
  HiOutlineBell,
  HiOutlineChat,
} from "react-icons/hi";

const steps = [
  {
    step: "01",
    icon: HiOutlineCursorClick,
    title: "You Place a Bid — Live Bidding",
    description:
      "Browse verified hoardings and place your bid in the live bidding session. You'll receive an instant SMS & WhatsApp notification confirming your bid is registered.",
    tag: "📲 SMS + WhatsApp Confirmation Sent",
    tagColor: "bg-blue-50 text-blue-700",
  },
  {
    step: "02",
    icon: HiOutlineBell,
    title: "Real-Time Bid Updates",
    description:
      "Outbid? You get notified immediately via SMS & WhatsApp so you can act fast. Win? You receive a winning confirmation on both channels — guaranteed.",
    tag: "🔔 Live Outbid & Win Alerts",
    tagColor: "bg-orange-50 text-orange-700",
  },
  {
    step: "03",
    icon: HiOutlineShieldCheck,
    title: "Pay 50% on Winning — Funds Held Securely",
    description:
      "Pay only 50% of the total amount after winning. Your payment is held in full security — NOT released to the hoarding owner until you see installation proof.",
    tag: "🔒 50% Upfront · Funds Secured",
    tagColor: "bg-primary-50 text-primary-700",
  },
  {
    step: "04",
    icon: HiOutlinePhotograph,
    title: "Installation with Photo & Video Proof",
    description:
      "Your ad is installed and you receive verified photo + video proof via WhatsApp and SMS. Once you confirm, the remaining 50% is released to the hoarding owner.",
    tag: "📸 Proof via WhatsApp + SMS · Then 50% Released",
    tagColor: "bg-green-50 text-green-700",
  },
  {
    step: "05",
    icon: HiOutlineCheckCircle,
    title: "100% Trust Guaranteed",
    description:
      "Your money NEVER goes to the hoarding owner before you see proof. Whether you win or lose the bid — we notify you every step of the way. No surprises. Full transparency.",
    tag: "✅ Money Protected Until You Confirm",
    tagColor: "bg-emerald-50 text-emerald-700",
  },
];

export default function PaymentModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full z-10 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-8 pt-8 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              How Payment &amp; Trust Works
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              SMS &amp; WhatsApp at every step · 50% upfront · 50% after proof
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors flex-shrink-0"
            aria-label="Close modal"
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable steps */}
        <div className="overflow-y-auto px-8 py-5 space-y-5">
          {steps.map((s, idx) => (
            <div key={s.step} className="flex gap-4">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {s.step}
                </div>
                {idx < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-primary-100 my-1.5" />
                )}
              </div>
              <div
                className={`min-w-0 ${idx < steps.length - 1 ? "pb-2" : ""}`}
              >
                <h3 className="font-semibold text-gray-900 text-sm leading-snug">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                  {s.description}
                </p>
                <span
                  className={`inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full ${s.tagColor}`}
                >
                  {s.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-8 pb-8 pt-4 border-t border-gray-100 space-y-3">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <HiOutlineChat className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800 font-medium leading-relaxed">
                <span className="font-bold">Your money is 100% protected.</span>{" "}
                Payment is only released to the hoarding owner after you
                personally confirm the installation proof via WhatsApp or SMS.
                No exceptions.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-full btn-primary py-3">
            I Understand — Start Bidding
          </button>
        </div>
      </div>
    </div>
  );
}
