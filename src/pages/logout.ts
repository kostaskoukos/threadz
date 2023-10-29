import { auth } from "@/lib/auth";

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ locals, redirect }) => {
  const session = await locals.auth.validate();
  if (!session) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  await auth.invalidateSession(session.sessionId);

  locals.auth.setSession(null);
  return redirect("/login", 302);
};
