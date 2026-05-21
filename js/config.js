import { ENV } from "./env.js";

// ENV is generated from .env by `npm run env`. Falls back to the public v2 base
// URL so the app still loads if .env has no API_BASE_URL set.
const baseUrl = (ENV.API_BASE_URL || "https://v2.api.noroff.dev").replace(
  /\/+$/,
  "",
);

export const CONFIG = {
  baseUrl, // e.g. https://v2.api.noroff.dev
  apiUrl: `${baseUrl}/holidaze/`, // Holidaze resources: venues, bookings, profiles
  authUrl: `${baseUrl}/auth/`, // Auth: register, login, create-api-key
  apiKey: ENV.API_KEY || "", // Sent as the X-Noroff-API-Key header
};
