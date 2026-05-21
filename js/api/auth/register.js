import { CONFIG } from "../../config.js";

// POST /auth/register — https://docs.noroff.dev/docs/v2/auth/register
// v2 returns the new profile at json.data but no access token, so the user
// still has to log in afterwards.
export async function register(user) {
  const url = `${CONFIG.authUrl}register`;

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
    throw new Error(json.errors?.[0]?.message || "Sorry, sign up failed.");
  }

  return json.data;
}
