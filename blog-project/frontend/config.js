// Shared frontend config + helpers for all pages
// - API_URL is auto-detected: same origin when deployed, localhost in dev
const API_URL =
  window.API_URL_OVERRIDE ||
  (window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000/api"
    : `${window.location.origin}/api`);

// Escapes user text so HTML in blog content can't inject scripts (XSS-safe)
function esc(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Returns the stored JWT (or null)
function getToken() {
  return localStorage.getItem("token");
}

// Standard "Authorization: Bearer ..." header for protected calls
function authHeaders(extra = {}) {
  const token = getToken();
  return token
    ? { ...extra, Authorization: `Bearer ${token}` }
    : { ...extra };
}
