import axios from "axios";

const BASE_URL = "http://localhost:7777";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true, // Send cookies with requests
  headers: { "Content-Type": "application/json" },
});

// Hoarding endpoints
export const getHoardings = (page = 1, limit = 10) =>
  api.get("/advertising/hoardings", { params: { page, limit } });
export const getHoardingById = (id) => api.get(`/advertising/hoardings/${id}`);
export const getHoardingByIdAuthenticated = (id) =>
  api.get(`/advertising/credentials/hoardings/${id}`);
export const getHoardingBookingDetails = (id) =>
  api.get(`/advertising/credentials/hoardingsbooking/${id}`);
export const bookHoardingSlot = (bookingData) =>
  api.post(`/advertising/credentials/bookhoardingslot`, bookingData);
export const getMyHoardings = () =>
  api.get(`/advertising/credentials/myhoardings`);

// Payment endpoints
export const createRazorpayOrder = (data) =>
  api.post(`/advertising/credentials/payment/create-order`, data);
export const verifyRazorpayPayment = (data) =>
  api.post(`/advertising/credentials/payment/verify`, data);

// Contact / general endpoints
export const getQueryTypes = () => api.get("/advertising/campaigns/query-type");
export const submitContactMe = (data) =>
  api.post("/advertising/campaigns/contact-me", data);
export const getBusinessTypes = () =>
  api.get("/advertising/campaigns/business-type");
export const getStatesAndCities = () =>
  api.get("/advertising/campaigns/states-unions-cities");

export default api;
