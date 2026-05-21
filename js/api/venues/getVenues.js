import { CONFIG } from "../../config.js";
import { headers } from "../headers.js";

// GET /holidaze/venues — public, but headers() adds the token/API key if present.
// v2 wraps the list in json.data.
export async function getVenues() {
  const url = `${CONFIG.apiUrl}holidaze/venues`;

  const response = await fetch(url, { headers: headers(false) });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Fetching venues failed");
  }

  return json.data;
}
