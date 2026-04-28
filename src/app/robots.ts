import type { MetadataRoute } from "next";

// robots.txt — only the public marketing surface is crawlable.
// Authenticated app routes, API endpoints, the auth screens, and
// the internal dev/legacy previews are explicitly disallowed.
//
// Site URL falls back to https://renner.app when the env isn't
// wired up so the generated absolute URLs in the sitemap reference
// stay sensible in preview / local dev.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://renner.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/how-it-works",
          "/contact",
          "/become-a-renner",
          "/terms",
          "/privacy",
          "/acceptable-use",
          "/signup",
        ],
        disallow: [
          "/browse",
          "/dashboard",
          "/messages",
          "/my-applications",
          "/my-renners",
          "/my-tasks",
          "/post",
          "/profile-setup",
          "/settings",
          "/signin",
          "/tasks",
          "/api/",
          "/examples",
          "/legacy",
          "/preview",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
