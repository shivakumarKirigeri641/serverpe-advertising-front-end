import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineCheckCircle,
  HiOutlineUser,
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineCreditCard,
  HiOutlineDocumentText,
  HiOutlineClipboardCheck,
} from "react-icons/hi";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price));
}

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    if (!state || !state.paymentData) {
      navigate("/advertiser/dashboard");
    }
  }, [state, navigate]);

  if (!state || !state.paymentData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  const {
    paymentData,
    bookingReference,
    bookingData,
    advertiser,
    startDate,
    endDate,
    daysCount,
    totalPrice,
    payNowAmount,
    remainingAmount,
    totalWithGst,
    gstAmount,
  } = state;

  const hoarding = bookingData;

  const bounceIn = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 18, delay: 0.1 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { delay: 0.2 + i * 0.08, duration: 0.45, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-10">
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
            variants={bounceIn}
            initial="hidden"
            animate="visible"
          >
            <HiOutlineCheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible">
            <h1 className="text-3xl font-bold text-gray-900">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Your hoarding slot has been booked successfully
            </p>
          </motion.div>
        </div>

        {/* Transaction Banner */}
        <motion.div
          className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8"
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-green-700 font-medium">
                Booking Reference
              </p>
              <p className="text-2xl font-bold text-green-900 mt-1 font-mono tracking-wide">
                {bookingReference}
              </p>
              <p className="text-xs text-green-600 mt-1">
                Transaction ID: {paymentData.payment_id}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm text-green-700 font-medium">Amount Paid</p>
              <p className="text-2xl font-bold text-green-900 mt-1">
                {formatPrice(paymentData.amount)}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transaction Details */}
          <motion.div
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center gap-2 mb-5">
              <HiOutlineDocumentText className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-bold text-gray-900">
                Transaction Details
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Order ID</span>
                <span className="text-sm font-medium text-gray-900 font-mono">
                  {paymentData.order_id}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Payment ID</span>
                <span className="text-sm font-medium text-gray-900 font-mono">
                  {paymentData.payment_id}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Payment Method</span>
                <span className="text-sm font-medium text-gray-900 capitalize">
                  {paymentData.method}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Status</span>
                <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  {paymentData.status === "captured"
                    ? "Paid"
                    : paymentData.status}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Paid At</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(paymentData.paid_at).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">Currency</span>
                <span className="text-sm font-medium text-gray-900">
                  {paymentData.currency}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Advertiser Details */}
          <motion.div
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center gap-2 mb-5">
              <HiOutlineUser className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-bold text-gray-900">
                Advertiser Details
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Name</span>
                <span className="text-sm font-medium text-gray-900">
                  {advertiser.name}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Business</span>
                <span className="text-sm font-medium text-gray-900">
                  {advertiser.businessName}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Phone</span>
                <span className="text-sm font-medium text-gray-900">
                  {advertiser.phoneNumber}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">Email</span>
                <span className="text-sm font-medium text-gray-900">
                  {advertiser.email || "Not provided"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Hoarding Details */}
          <motion.div
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center gap-2 mb-5">
              <HiOutlineLocationMarker className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-bold text-gray-900">
                Hoarding Details
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Title</span>
                <span className="text-sm font-medium text-gray-900">
                  {hoarding.hoarding_title}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Code</span>
                <span className="text-sm font-medium text-gray-900 font-mono">
                  {hoarding.hoarding_code}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Location</span>
                <span className="text-sm font-medium text-gray-900">
                  {hoarding.city}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Size</span>
                <span className="text-sm font-medium text-gray-900">
                  {hoarding.width_feet}ft × {hoarding.height_feet}ft
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">Traffic</span>
                <span className="text-sm font-medium text-gray-900">
                  {hoarding.traffic_type_name}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Booking Duration */}
          <motion.div
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center gap-2 mb-5">
              <HiOutlineCalendar className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-bold text-gray-900">
                Booking Duration
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">From</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(startDate).toLocaleDateString("en-IN", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">To</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(endDate).toLocaleDateString("en-IN", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Duration</span>
                <span className="text-sm font-bold text-primary-600">
                  {daysCount} day{daysCount !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">Slots Booked</span>
                <span className="text-sm font-medium text-gray-900">
                  {paymentData.booking_ids?.length || daysCount}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Payment Breakdown */}
        <motion.div
          className="mt-6 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
          custom={6}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-5">
            <HiOutlineCreditCard className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-bold text-gray-900">
              Payment Breakdown
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">
                  Base Amount ({daysCount} days ×{" "}
                  {formatPrice(hoarding.price_per_day)}/day)
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">GST (18%)</span>
                <span className="text-sm font-medium text-gray-900">
                  {formatPrice(gstAmount)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-900">
                  Total Amount
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {formatPrice(totalWithGst)}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-green-600 font-medium">
                  Paid Now (50%)
                </span>
                <span className="text-sm font-bold text-green-600">
                  {formatPrice(payNowAmount)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-amber-600 font-medium">
                  Due After Proofs (50%)
                </span>
                <span className="text-sm font-bold text-amber-600">
                  {formatPrice(remainingAmount)}
                </span>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs text-amber-800">
                  <strong>Reminder:</strong> Submit spot proofs within 24 hours
                  to avoid booking cancellation.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6"
          custom={7}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-4">
            <HiOutlineClipboardCheck className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-blue-900">What's Next?</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full text-xs font-bold flex items-center justify-center mt-0.5">
                1
              </span>
              <p className="text-sm text-blue-800">
                Your hoarding slot is now reserved for the selected dates.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full text-xs font-bold flex items-center justify-center mt-0.5">
                2
              </span>
              <p className="text-sm text-blue-800">
                Submit your advertisement creatives for approval.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full text-xs font-bold flex items-center justify-center mt-0.5">
                3
              </span>
              <p className="text-sm text-blue-800">
                After ad display, upload spot proofs to complete the remaining
                50% payment.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          variants={fadeUp}
          custom={8}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <button
            onClick={() => navigate("/advertiser/dashboard")}
            className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-200 flex items-center justify-center gap-2"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate("/hoardings")}
            className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
          >
            Browse More Hoardings
          </button>
        </motion.div>
      </div>
    </div>
  );
}
