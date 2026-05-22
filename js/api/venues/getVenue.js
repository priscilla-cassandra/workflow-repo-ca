import { CONFIG } from "../../config.js";
import { headers } from "../headers.js";

// GET /holidaze/venues/:id — v2 wraps the venue in json.data.
export async function getVenue(id) {
  if (!id) {
    throw new Error("No id provided");
  }

  const url = `${CONFIG.apiUrl}venues/${id}`;

  const response = await fetch(url, { headers: headers(false) });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Fetching venue failed");
  }

  return json.data;
}
