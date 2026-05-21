import { CONFIG } from "../config.js";
import { getToken } from "../utils/storage.js";

// Builds request headers for the Noroff v2 API:
// - Content-Type for requests with a JSON body
// - the Bearer access token when the user is logged in
// - the X-Noroff-API-Key header when an API key is configured in .env
//
// Protected endpoints (creating venues, bookings, etc.) require both the token
// and the API key. Public reads work without either.
export function headers(hasBody = true) {
  const result = {};

  if (hasBody) {
    result["Content-Type"] = "application/json";
  }

  const token = getToken();
  if (token) {
    result.Authorization = `Bearer ${token}`;
  }

  if (CONFIG.apiKey) {
    result["X-Noroff-API-Key"] = CONFIG.apiKey;
  }

  return result;
}
