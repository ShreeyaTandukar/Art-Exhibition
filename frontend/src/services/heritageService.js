import api from "../utils/api";

// FEATURE 1 — heritage/QR data access. Knows nothing about badges or users.

// Resolve a scanned QR identifier to a heritage place.
// The backend decides what a valid QR ID is, which is why adding HL-026
// later requires no change here and none in the scanner component.
export const fetchHeritageByQrId = async (qrId) => {
  const response = await api.get(`/sites/qr/${encodeURIComponent(qrId)}`);
  return response.data.site;
};

export const fetchHeritageBySlug = async (slug) => {
  const response = await api.get(`/sites/${encodeURIComponent(slug)}`);
  return response.data.site;
};

export const fetchAllHeritage = async () => {
  const response = await api.get("/sites");
  return response.data.sites || [];
};
