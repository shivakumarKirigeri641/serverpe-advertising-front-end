import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineCreditCard,
  HiOutlineArrowLeft,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import { toast } from "react-toastify";
import { createRazorpayOrder, verifyRazorpayPayment } from "../utils/api";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price));
}

const GST_RATE = 0.18; // 18% GST

export default function CheckoutSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);

  const state = location.state;

  useEffect(() => {
    if (!state || !state.bookingData) {
      navigate("/advertiser/dashboard");
      return;
    }
  }, [state, navigate]);

  if (!state) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  const {
    bookingIds,
    bookingReference,
    bookingData,
    advertiser,
    startDate,
    endDate,
    daysCount,
    totalPrice,
  } = state;

  const baseAmount = totalPrice;
  const gstAmount = baseAmount * GST_RATE;
  const totalWithGst = baseAmount + gstAmount;
  const payNowAmount = totalWithGst / 2;
  const remainingAmount = totalWithGst / 2;

  const hoarding = bookingData;

  const handlePaymentClick = async () => {
    setIsProcessing(true);
    try {
      // Step 1: Create Razorpay order on backend
      const orderRes = await createRazorpayOrder({
        amount: payNowAmount,
        currency: "INR",
        booking_ids: bookingIds,
        hoarding_id: hoarding.id,
      });

      if (!orderRes.data.successstatus) {
        toast.error(orderRes.data.message || "Failed to create order");
        setIsProcessing(false);
        return;
      }

      const { order_id, key_id } = orderRes.data.data;

      // Step 2: Open Razorpay checkout
      const options = {
        key: key_id,
        amount: Math.round(payNowAmount * 100),
        currency: "INR",
        name: "ServerPe Advertising",
        description: `Hoarding Booking - ${hoarding.hoarding_title}`,
        order_id: order_id,
        prefill: {
          name: advertiser.name,
          email: advertiser.email || "",
          contact: advertiser.phoneNumber || "",
        },
        theme: {
          color: "#4f46e5",
        },
        handler: async function (response) {
          // Step 3: Verify payment on backend
          try {
            const verifyRes = await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              booking_ids: bookingIds,
              hoarding_id: hoarding.id,
              amount: payNowAmount,
            });

            if (verifyRes.data.successstatus) {
              toast.success("Payment successful!");
              navigate("/advertiser/booking/payment-success", {
                state: {
                  paymentData: verifyRes.data.data,
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
                },
              });
            } else {
              toast.error(verifyRes.data.message || "Verification failed");
            }
          } catch (err) {
            toast.error("Payment verification failed. Contact support.");
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            toast.info("Payment cancelled");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        toast.error(
          response.error.description || "Payment failed. Please try again.",
        );
        setIsProcessing(false);
      });
      rzp.open();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error initiating payment");
      setIsProcessing(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.45, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 mb-6 transition-colors"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Header */}
        <motion.div
          className="mb-8"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-3xl font-bold text-gray-900">Order Summary</h1>
          <p className="text-gray-600 mt-2">
            Review your booking details and complete the payment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Advertiser Card */}
            <motion.div
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineUser className="w-5 h-5 text-primary-600" />
                <h3 className="text-lg font-bold text-gray-900">
                  Advertiser Information
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Contact Person
                  </p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {advertiser.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Business Name
                  </p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {advertiser.businessName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Mobile
                  </p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {advertiser.phoneNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Email
                  </p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {advertiser.email || "Not provided"}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Hoarding Card */}
            <motion.div
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineLocationMarker className="w-5 h-5 text-primary-600" />
                <h3 className="text-lg font-bold text-gray-900">
                  Hoarding Details
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">
                      {hoarding.hoarding_title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Code: {hoarding.hoarding_code}
                    </p>
                  </div>
                  <span className="text-xs font-semibold bg-green-50 text-green-600 px-3 py-1 rounded-full">
                    Confirmed
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {hoarding.city}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Size</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {hoarding.width_feet}ft × {hoarding.height_feet}ft
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Visibility</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {hoarding.total_visibility_score}/10
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Traffic</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {hoarding.traffic_type_name}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Booking Card */}
            <motion.div
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineCalendar className="w-5 h-5 text-primary-600" />
                <h3 className="text-lg font-bold text-gray-900">
                  Booking Duration
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div>
                    <p className="text-sm font-semibold text-blue-900">
                      {new Date(startDate).toLocaleDateString("en-IN", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      to{" "}
                      {new Date(endDate).toLocaleDateString("en-IN", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      {daysCount} day{daysCount !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <HiOutlineCheckCircle className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Payment Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-6"
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineCreditCard className="w-5 h-5 text-primary-600" />
                <h3 className="text-lg font-bold text-gray-900">
                  Payment Details
                </h3>
              </div>

              <div className="space-y-3 py-4 border-y border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Booking Amount</span>
                  <span className="font-medium text-gray-900">
                    {formatPrice(baseAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-medium text-gray-900">
                    {formatPrice(gstAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-gray-900">Total Amount</span>
                  <span className="text-primary-600">
                    {formatPrice(totalWithGst)}
                  </span>
                </div>
              </div>

              {/* Payment Split */}
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg space-y-3">
                <p className="text-xs font-semibold text-amber-900 uppercase tracking-wide">
                  Payment Schedule
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-amber-800">50% Now (Booking)</span>
                    <span className="font-bold text-amber-900">
                      {formatPrice(payNowAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-amber-700">50% After (Proofs)</span>
                    <span className="font-medium text-amber-800">
                      {formatPrice(remainingAmount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Important Note */}
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800 leading-relaxed">
                  <strong>Note:</strong> Remaining 50% is due after spot proof
                  submission. Failure to provide proofs within 24 hours may
                  result in booking cancellation.
                </p>
              </div>

              {/* CTA */}
              <button
                onClick={handlePaymentClick}
                disabled={isProcessing}
                className="w-full mt-6 bg-primary-600 text-white font-semibold py-3 rounded-xl hover:bg-primary-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <HiOutlineCreditCard className="w-5 h-5" />
                    Pay {formatPrice(payNowAmount)}
                  </>
                )}
              </button>

              <button
                onClick={() => navigate(-1)}
                className="w-full mt-3 text-sm font-medium text-gray-600 hover:text-gray-900 py-2 transition-colors border border-gray-200 rounded-lg"
              >
                Edit Booking
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
