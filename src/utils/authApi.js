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

// Logout (called on button click)
export const logoutAdvertiser = async () => {
  try {
    await api.post("/advertiser/credentials/logout");
  } catch (err) {
    // Continue logout even if API call fails
  }
  localStorage.removeItem("a_token");
  localStorage.removeItem("advertiser_data");
};

// Beacon logout (called on tab/browser close — fire-and-forget)
export const sendLogoutBeacon = () => {
  const data = localStorage.getItem("advertiser_data");
  if (!data) return;
  // Use fetch with keepalive to send cookies cross-origin on tab close
  fetch("http://localhost:7777/advertiser/credentials/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    keepalive: true,
    body: JSON.stringify({}),
  }).catch(() => {});
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
