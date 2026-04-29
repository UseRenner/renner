"use client";

import Link from "next/link";
import { useState } from "react";

type Plate = {
  catalog: string;
  title: string;
  body: React.ReactNode;
  spec: Array<[string, string]>;
};

const CLIENT_DEK =
  "A marketplace for real-estate task work, handled by background-checked Renners and paid through escrow.";

const RENNER_DEK =
  "Independent contractors running short real-estate tasks for agents, brokers, and managers — on your schedule, in your area.";

const CLIENT_PLATES: Plate[] = [
  {
    catalog: "Plate 01 · Posting",
    title: "Post a task.",
    body: (
      <>
        Describe what you need — sign install, lockbox swap, property
        visuals, guest check-in. Set the location, the window, and the
        price.
      </>
    ),
    spec: [
      ["Party", "Client"],
      ["Time", "Under 2 minutes"],
      ["Output", "Public brief"],
    ],
  },
  {
    catalog: "Plate 02 · Selection",
    title: "Pick a vetted Renner.",
    body: (
      <>
        Background-checked Renners in your area apply with their bio,
        ratings, and tenure. Read what they have done. Book the right
        hand for the work.
      </>
    ),
    spec: [
      ["Vetting", "Checkr-verified"],
      ["Booking", "Single Renner"],
      ["Discretion", "Yours"],
    ],
  },
  {
    catalog: "Plate 03 · Completion",
    title: "Get it done.",
    body: (
      <>
        Your Renner finishes the task and submits completion photos
        with a written confirmation. You confirm. Stripe releases the
        funds from escrow.
      </>
    ),
    spec: [
      ["Evidence", "Photo · message thread"],
      ["Settlement", "Stripe escrow"],
      ["Window", "48 hours"],
    ],
  },
];

const RENNER_PLATES: Plate[] = [
  {
    catalog: "Plate 01 · Verification",
    title: "Get verified.",
    body: (
      <>
        Sign up, confirm your identity, clear a Checkr background
        check. Pick your categories, set your service area, name your
        rate.
      </>
    ),
    spec: [
      ["Vetting", "Checkr"],
      ["Onboarding", "Same-day in most states"],
      ["Output", "Active Renner"],
    ],
  },
  {
    catalog: "Plate 02 · Selection",
    title: "Pick a task.",
    body: (
      <>
        See briefs posted by agents, brokers, and managers nearby.
        Apply to the ones that fit your schedule and skills. Decline
        anything that doesn&rsquo;t.
      </>
    ),
    spec: [
      ["Discretion", "Yours"],
      ["Marketplace", "Local"],
      ["Booking", "Mutual"],
    ],
  },
  {
    catalog: "Plate 03 · Completion",
    title: "Get it done.",
    body: (
      <>
        Run the task, upload completion photos, get paid through the
        platform. Build a reputation that earns repeat clients.
      </>
    ),
    spec: [
      ["Payout", "90% of task pay"],
      ["Settlement", "Stripe"],
      ["Reputation", "Ratings · reviews"],
    ],
  },
];

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS =
  "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0d0f12";
const STEEL_700 = "#4d5b6a";
const STEEL_600 = "#647589";
const STEEL_500 = "#7d8da0";
const STEEL_300 = "#cad1d8";
const PAPER = "#fbfbfc";

function Em({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontStyle: "italic",
        fontWeight: 300,
        color: STEEL_600,
      }}
    >
      {children}
    </span>
  );
}

export function PlateBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const plates = isClient ? CLIENT_PLATES : RENNER_PLATES;
  const ctaButton = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      {/* ─── Audience switch ─── */}
      <div
        role="tablist"
        aria-label="Audience"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 56,
          fontFamily: MONO,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}
      >
        <TabButton label="For Clients" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: STEEL_300 }}>/</span>
        <TabButton label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
      </div>

      {/* ─── Lede ─── headline + dek side by side */}
      <div
        className="plate-lede"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)",
          gap: "clamp(40px, 6vw, 96px)",
          alignItems: "end",
          marginBottom: "clamp(72px, 9vw, 120px)",
        }}
      >
        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(40px, 6vw, 80px)",
            lineHeight: 1.05,
            letterSpacing: "-0.028em",
            color: INK,
            margin: 0,
            maxWidth: "12ch",
            fontVariationSettings: '"opsz" 144',
          }}
        >
          How Renner <Em>works.</Em>
        </h1>
        <p
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(16px, 1.4vw, 18px)",
            lineHeight: 1.6,
            color: STEEL_700,
            margin: 0,
            maxWidth: "44ch",
            fontVariationSettings: '"opsz" 14',
          }}
        >
          {dek}
        </p>
      </div>

      {/* ─── Plates ─── three hairline-bordered cards stacked vertically */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(24px, 3vw, 40px)",
          marginBottom: showCta ? "clamp(72px, 9vw, 120px)" : 0,
        }}
      >
        {plates.map((plate) => (
          <article
            key={plate.catalog}
            style={{
              border: `1px solid ${STEEL_300}`,
              padding: "clamp(28px, 4vw, 48px)",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
              gap: "clamp(28px, 4vw, 56px)",
              alignItems: "start",
            }}
            className="plate-card"
          >
            <div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: STEEL_500,
                  marginBottom: 24,
                }}
              >
                {plate.catalog}
              </div>
              <h3
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: "clamp(28px, 3.2vw, 40px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.022em",
                  color: INK,
                  margin: 0,
                  marginBottom: 20,
                  fontVariationSettings: '"opsz" 60',
                }}
              >
                {plate.title}
              </h3>
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: 16,
                  lineHeight: 1.65,
                  color: STEEL_700,
                  margin: 0,
                  maxWidth: "52ch",
                  fontVariationSettings: '"opsz" 14',
                }}
              >
                {plate.body}
              </p>
            </div>
            <dl
              style={{
                margin: 0,
                paddingLeft: "clamp(20px, 3vw, 40px)",
                borderLeft: `1px solid ${STEEL_300}`,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                alignSelf: "stretch",
              }}
              className="plate-spec"
            >
              {plate.spec.map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(80px, 96px) 1fr",
                    gap: 12,
                    alignItems: "baseline",
                  }}
                >
                  <dt
                    style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      fontWeight: 500,
                      letterSpacing: "0.24em",
                      textTransform: "uppercase",
                      color: STEEL_500,
                    }}
                  >
                    {k}
                  </dt>
                  <dd
                    style={{
                      fontFamily: SERIF,
                      fontSize: 15,
                      lineHeight: 1.5,
                      color: INK,
                      margin: 0,
                      fontVariationSettings: '"opsz" 14',
                    }}
                  >
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>

      {showCta && (
        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.022em",
              color: INK,
              margin: 0,
              maxWidth: "20ch",
              fontVariationSettings: '"opsz" 144',
            }}
          >
            {isClient ? (
              <>
                Get something <Em>done.</Em>
              </>
            ) : (
              <>
                Start <Em>running.</Em>
              </>
            )}
          </h2>
          <Link
            href={ctaButton.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: SANS,
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: PAPER,
              backgroundColor: INK,
              border: `1px solid ${INK}`,
              borderRadius: 0,
              padding: "14px 28px",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            {ctaButton.label}
          </Link>
        </section>
      )}

      <style jsx>{`
        @media (max-width: 880px) {
          .plate-lede {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
            align-items: start !important;
          }
        }
        @media (max-width: 720px) {
          :global(.plate-card) {
            grid-template-columns: 1fr !important;
            gap: clamp(20px, 4vw, 32px) !important;
          }
          :global(.plate-spec) {
            padding-left: 0 !important;
            border-left: none !important;
            border-top: 1px solid ${STEEL_300};
            padding-top: clamp(20px, 4vw, 28px);
          }
        }
      `}</style>
    </>
  );
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        fontFamily: "inherit",
        fontSize: "inherit",
        fontWeight: "inherit",
        letterSpacing: "inherit",
        textTransform: "inherit",
        color: active ? INK : STEEL_500,
        cursor: "pointer",
        transition: "color 150ms ease",
      }}
    >
      {label}
    </button>
  );
}
