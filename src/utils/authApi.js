import api from "./api";

// Advertiser login endpoints
export const sendOtpAdvertiser = (mobile_number) =>
  api.post("/advertiser/login/send-otp", { mobile_number });

export const verifyOtpAdvertiser = (mobile_number, otp, advertiser_id) =>
  api.post("/advertiser/login/verify-otp", {
    mobile_number,
    otp,
    advertiser_id,
  });

// Logout
export const logoutAdvertiser = () => {
  localStorage.removeItem("a_token");
  localStorage.removeItem("advertiser_data");
};

// Get stored advertiser data
export const getStoredAdvertiserData = () => {
  const data = localStorage.getItem("advertiser_data");
  return data ? JSON.parse(data) : null;
};

// Store advertiser data
export const storeAdvertiserData = (data) => {
  localStorage.setItem("advertiser_data", JSON.stringify(data));
};
