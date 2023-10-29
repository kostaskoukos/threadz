import { auth, googleAuth } from "@/lib/auth";
import { OAuthRequestError } from "@lucia-auth/oauth";

import type { APIRoute } from "astro";
import { LuciaError } from "lucia";

export const GET: APIRoute = async ({ cookies, redirect, url, locals }) => {
  const stateCookie = cookies.get("google_oauth_state");
  if (!stateCookie)
    return new Response("invalid google redirect", {
      status: 400,
    });
  const storedState = stateCookie.value;

  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  // validate state
  if (!storedState || !state || storedState !== state || !code) {
    return new Response("invalid google redirect", {
      status: 400,
    });
  }
  try {
    const { getExistingUser, googleUser, createUser } =
      await googleAuth.validateCallback(code);

    const getUser = async () => {
      const existingUser = await getExistingUser();

      if (existingUser) return existingUser;
      const user = await createUser({
        attributes: {
          name: googleUser.name,
          avatar_url: googleUser.picture,
        },
      });

      return user;
    };

    const user = await getUser();

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });

    locals.auth.setSession(session);

    cookies.delete("google_oauth_state");
    auth.deleteDeadUserSessions(user.userId);
    return redirect("/", 302);
  } catch (e) {
    if (e instanceof OAuthRequestError)
      return new Response("oauth error", { status: 400 });

    if (e instanceof LuciaError)
      return new Response(e.message, { status: 500 });

    return new Response("idk", { status: 500 });
  }
};
