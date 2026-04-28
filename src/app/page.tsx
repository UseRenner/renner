import { redirect } from "next/navigation";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { Wordmark } from "@/components/Wordmark";
import { getViewer, homeFor } from "@/lib/role";
import { LandingSignupForm } from "./LandingSignupForm";
import { LandingHero } from "./LandingHero";

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

          <LandingHero />
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
              fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
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
