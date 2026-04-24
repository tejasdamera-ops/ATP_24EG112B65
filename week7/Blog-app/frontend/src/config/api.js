const DEFAULT_API_BASE_URL = "https://atp-24eg112b65-2.onrender.com";

const normalizeBaseUrl = (url) => {
  if (!url) return DEFAULT_API_BASE_URL;
  return url.endsWith("/") ? url.slice(0, -1) : url;
};

export const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL);

export const buildApiUrl = (path) => `${API_BASE_URL}${path}`;
