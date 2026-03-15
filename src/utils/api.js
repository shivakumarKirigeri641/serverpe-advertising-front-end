import axios from "axios";

const BASE_URL = "http://localhost:7777";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export const getQueryTypes = () => api.get("/advertising/campaigns/query-type");

export const submitContactMe = (data) =>
  api.post("/advertising/campaigns/contact-me", data);

export const getBusinessTypes = () =>
  api.get("/advertising/campaigns/business-type");

export const getStatesAndCities = () =>
  api.get("/advertising/campaigns/states-unions-cities");

export default api;
