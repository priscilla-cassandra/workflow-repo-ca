import { CONFIG } from "../../config.js";
import { headers } from "../headers.js";

// POST /auth/create-api-key — https://docs.noroff.dev/docs/v2/auth/api-key
// Requires a valid access token (set at login). Returns json.data.key, which
// you then put in .env as API_KEY and re-run `npm run env`. After that the key
// is sent as the X-Noroff-API-Key header on protected requests (see headers.js).
export async function createApiKey(name = "Holidaze API Key") {
  const url = `${CONFIG.authUrl}create-api-key`;

  const options = {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ name }),
  };

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Creating API key failed");
  }

  return json.data;
}
