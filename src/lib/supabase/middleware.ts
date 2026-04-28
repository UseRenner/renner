import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_PATHS = [
  "/profile-setup",
  "/browse",
  "/dashboard",
  "/messages",
  "/post",
  "/tasks",
  "/my-tasks",
  "/my-applications",
  "/my-renners",
  "/settings",
];
const AUTH_PATHS = ["/signin", "/signup", "/become-a-renner"];

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({ request });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isProtected = PROTECTED_PATHS.some((p) => path.startsWith(p));
  const isAuthRoute = AUTH_PATHS.some((p) => path.startsWith(p));
  // Anything we don't want crawled regardless of auth state — the
  // signed-in app surface, the auth screens, the API, and the
  // dev-only preview routes. Reinforces the per-page robots metadata
  // with an HTTP-level signal that crawlers honor even when they
  // skip the HTML head.
  const isNoIndex =
    isProtected ||
    isAuthRoute ||
    path.startsWith("/api/") ||
    path.startsWith("/examples") ||
    path.startsWith("/legacy");

  if (!user && isProtected) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/signin";
    return NextResponse.redirect(redirectUrl);
  }

  if (user && isAuthRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/browse";
    return NextResponse.redirect(redirectUrl);
  }

  if (isNoIndex) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}
