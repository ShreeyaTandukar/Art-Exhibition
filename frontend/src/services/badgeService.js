import api from "../utils/api";

// FEATURE 2 — badge data access. Knows nothing about cameras or QR codes.
// The account is identified by the JWT the api instance already attaches,
// so no userId is ever sent from the browser.

export const fetchMyBadge = async () => {
  const response = await api.get("/user/badge");
  return response.data.badge;
};

// Idempotent on the server: calling it twice for the same place is safe
// and leaves progress unchanged.
export const collectHeritage = async (heritageId) => {
  const response = await api.post(`/user/badge/collect/${heritageId}`);
  return response.data;
};
