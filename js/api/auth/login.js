import { CONFIG } from "../../config.js";

// POST /auth/login — https://docs.noroff.dev/docs/v2/auth/login
// `?_holidaze=true` includes the venueManager flag in the response.
// The access token lives at json.data.accessToken in v2.
export async function login(user) {
  const url = `${CONFIG.authUrl}login?_holidaze=true`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Login failed");
  }

  return json.data;
}
