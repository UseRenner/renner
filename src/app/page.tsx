import { redirect } from "next/navigation";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { Wordmark } from "@/components/Wordmark";
import { getViewer, homeFor } from "@/lib/role";
import { LandingSignupForm } from "./LandingSignupForm";

export const dynamic = "force-dynamic";

export default async function LandingPage() {
  const viewer = await getViewer();
  if (viewer) redirect(homeFor(viewer.role));

  return (
    <>
      <div className="landing-split">
        <LeftPanel />
        <RightPanel />
      </div>
      <SiteFooter />
    </>
  );
}

function LeftPanel() {
  return (
    <section
      className="landing-left"
      style={{
        backgroundColor: "#f0f2f5",
      }}
    >
      <div className="landing-pane-inner">
        <div>
          <Wordmark />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          <h1
            style={{
              fontFamily:
                "var(--font-source-serif), ui-serif, Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(48px, 6vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#0d0f12",
              margin: 0,
              maxWidth: "520px",
            }}
          >
            Keep real estate{" "}
            <span
              style={{
                fontStyle: "italic",
                fontWeight: 300,
                color: "#647589",
              }}
            >
              running.
            </span>
          </h1>

          <SampleTaskCard />

          <CategoryPills />
        </div>

        <div aria-hidden />
      </div>
    </section>
  );
}

function RightPanel() {
  return (
    <section
      className="landing-right"
      style={{
        backgroundColor: "#fbfbfc",
      }}
    >
      <div
        className="landing-pane-inner"
        style={{
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
              fontSize: "13px",
              color: "#647589",
              margin: 0,
            }}
          >
            Have an account?{" "}
            <Link
              href="/signin"
              className="text-link"
              style={{ color: "#0d0f12", fontWeight: 500 }}
            >
              Sign in
            </Link>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LandingSignupForm />
        </div>
        <div aria-hidden />
      </div>
    </section>
  );
}

function SampleTaskCard() {
  return (
    <div
      aria-hidden
      style={{
        backgroundColor: "#fbfbfc",
        border: "1px solid #dce0e5",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 12px 32px rgba(13, 15, 18, 0.08)",
        maxWidth: "420px",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: "16px" }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            backgroundColor: "#eaedf0",
            color: "#4d5b6a",
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            padding: "4px 8px",
            borderRadius: "3px",
          }}
        >
          Signs
        </span>
        <span
          className="font-display"
          style={{
            fontSize: "24px",
            fontWeight: 500,
            color: "#0d0f12",
            lineHeight: 1,
          }}
        >
          $45
        </span>
      </div>
      <h3
        style={{
          fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
          fontSize: "15px",
          fontWeight: 500,
          color: "#0d0f12",
          lineHeight: 1.35,
          marginBottom: "6px",
        }}
      >
        Install sign rider at 4821 Olive St
      </h3>
      <p
        style={{
          fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
          fontSize: "13px",
          color: "#647589",
          margin: 0,
        }}
      >
        RiNo, Denver  ·  Today, 2:00 – 5:00 PM
      </p>
    </div>
  );
}

// Visual-only context strip below the hero card. Reads as a quiet
// taxonomy hint, not a navigation control — these are <span>s, not
// links, and the order is the spec's: Signs · Lockbox · Showing ·
// Courier · Photos · Guest access · Host assistance.
const HERO_CATEGORIES = [
  "Signs",
  "Lockbox",
  "Showing",
  "Courier",
  "Photos",
  "Guest access",
  "Host assistance",
];

function CategoryPills() {
  return (
    <div
      aria-hidden
      className="flex flex-wrap"
      style={{
        gap: "8px",
        maxWidth: "520px",
      }}
    >
      {HERO_CATEGORIES.map((label) => (
        <span
          key={label}
          style={{
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "12px",
            fontWeight: 500,
            color: "#647589",
            backgroundColor: "#fbfbfc",
            border: "1px solid #dce0e5",
            borderRadius: "999px",
            padding: "6px 12px",
          }}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
