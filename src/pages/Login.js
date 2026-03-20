import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlinePhone, HiOutlineCheckCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import {
  sendOtpAdvertiser,
  verifyOtpAdvertiser,
  storeAdvertiserData,
} from "../utils/authApi";

export default function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState("phone"); // phone, otp, business-select
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("9000000001");
  const [otp, setOtp] = useState("1234");
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    try {
      const res = await sendOtpAdvertiser(phoneNumber);
      if (res.data.successstatus) {
        const businessList = res.data.data.result_advertisecompanies || [];

        if (businessList.length === 0) {
          toast.error("No businesses registered with this number");
          setLoading(false);
          return;
        }

        setBusinesses(businessList);

        if (businessList.length === 1) {
          setSelectedBusiness(businessList[0]);
          setStep("otp");
        } else {
          setStep("business-select");
        }

        toast.success("OTP sent successfully!");
      } else {
        toast.error(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP");
      return;
    }

    if (!selectedBusiness) {
      toast.error("Please select a business");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOtpAdvertiser(
        phoneNumber,
        otp,
        selectedBusiness.id,
      );

      if (res.data.successstatus) {
        // Store advertiser data
        storeAdvertiserData({
          id: selectedBusiness.id,
          name: selectedBusiness.advertiser_name,
          businessName: selectedBusiness.business_name,
          phoneNumber: phoneNumber,
          email: selectedBusiness.email,
        });

        toast.success("Login successful!");
        navigate("/advertiser/dashboard");
      } else {
        toast.error(res.data.message || "OTP verification failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center px-4 py-10">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Back link */}
        {step !== "phone" && (
          <button
            onClick={() => {
              setStep("phone");
              setOtp("");
              setSelectedBusiness(null);
            }}
            className="mb-6 text-sm text-gray-600 hover:text-primary-600 transition-colors flex items-center gap-1"
          >
            ← Back
          </button>
        )}

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {step === "phone" ? "Welcome Back" : "Verify OTP"}
            </h1>
            {step === "business-select" && (
              <p className="text-sm text-gray-500">
                Select your business to continue
              </p>
            )}
            {step === "otp" && (
              <p className="text-sm text-gray-500">
                We've sent an OTP to {phoneNumber}
              </p>
            )}
            {step === "phone" && (
              <p className="text-sm text-gray-500 mt-1">
                Login to book premium hoarding locations
              </p>
            )}
          </div>

          {/* Phone Form */}
          {step === "phone" && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <HiOutlinePhone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(
                        e.target.value.replace(/\D/g, "").slice(0, 10),
                      )
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                    disabled={loading}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Enter your 10-digit mobile number
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white font-medium py-3 rounded-xl hover:bg-primary-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}
              </button>
            </form>
          )}

          {/* Business Selection */}
          {step === "business-select" && (
            <form onSubmit={() => setStep("otp")} className="space-y-4">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {businesses.map((business) => (
                  <button
                    key={business.id}
                    type="button"
                    onClick={() => {
                      setSelectedBusiness(business);
                      setStep("otp");
                    }}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      selectedBusiness?.id === business.id
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 hover:border-primary-300"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {business.business_name}
                        </p>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {business.advertiser_name}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {business.city} • {business.area}
                        </p>
                      </div>
                      {selectedBusiness?.id === business.id && (
                        <HiOutlineCheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </form>
          )}

          {/* OTP Form */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  placeholder="1234"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))
                  }
                  maxLength="4"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-center text-2xl font-bold tracking-widest focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                  disabled={loading}
                />
                <p className="text-xs text-gray-400 mt-1">
                  Enter the 4-digit OTP sent to your mobile
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white font-medium py-3 rounded-xl hover:bg-primary-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Login"
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep("phone")}
                className="w-full text-sm text-gray-600 hover:text-primary-600 font-medium py-2 transition-colors"
              >
                Use different number
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              By logging in, you agree to our{" "}
              <a href="/terms" className="text-primary-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-primary-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Help text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <a
              href="https://wa.me/917996083415"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
