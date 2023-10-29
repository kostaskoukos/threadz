import { googleAuth } from "@/lib/auth";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ redirect, cookies }) => {
  const [url, state] = await googleAuth.getAuthorizationUrl();
  // store state
  cookies.set("google_oauth_state", state, {
    httpOnly: true,
    secure: !import.meta.env.DEV,
    path: "/",
    maxAge: 60 * 60,
  });
  return redirect(url.toString(), 302);
};
