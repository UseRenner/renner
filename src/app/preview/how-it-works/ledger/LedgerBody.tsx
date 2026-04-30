"use client";

import Link from "next/link";
import { useState } from "react";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS =
  "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0d0f12";
const SLATE = "#2a2f36";
const STEEL_700 = "#4d5b6a";
const STEEL_600 = "#647589";
const STEEL_500 = "#7d8da0";
const STEEL_300 = "#cad1d8";
const RULE = "#eaedf0";
const PAPER = "#fbfbfc";

type Banner = {
  number: string;
  title: string;
  body: React.ReactNode;
  proof: string;
};

const CLIENT_DEK =
  "A marketplace for real-estate task work — sign installs, lockbox swaps, showings, courier runs, property prep — handled by background-checked Renners and paid through escrow.";

const RENNER_DEK =
  "Real-estate work, brief by brief. Run tasks for the agents, brokers, and property managers who keep listings moving. Both parties are ID-verified and background-checked.";

const CLIENT_BANNERS: Banner[] = [
  {
    number: "01",
    title: "Post a task.",
    body: (
      <>
        Describe what you need — sign install, lockbox swap, property
        visuals, guest check-in. Set the location, the time window,
        and the price. Posts go live to vetted Renners only.
      </>
    ),
    proof: "Under 2 minutes",
  },
  {
    number: "02",
    title: "Pick a Renner.",
    body: (
      <>
        Background-checked Renners in your area apply with bios,
        ratings, and tenure. Read the file, book the right hand for
        the work.
      </>
    ),
    proof: "Checkr-verified",
  },
  {
    number: "03",
    title: "Get it done.",
    body: (
      <>
        Photos and a written confirmation arrive on completion. You
        confirm; Stripe releases the funds. After 48 hours without a
        response, payment auto-releases.
      </>
    ),
    proof: "Stripe escrow",
  },
];

const RENNER_BANNERS: Banner[] = [
  {
    number: "01",
    title: "Get verified.",
    body: (
      <>
        Sign up, confirm your identity, clear a Checkr background
        check. Pick the categories you run, set your service area,
        name your rate.
      </>
    ),
    proof: "Same-day onboarding",
  },
  {
    number: "02",
    title: "Pick a task.",
    body: (
      <>
        Briefs come in from agents, brokers, and managers nearby.
        Apply to what fits your schedule and skills. Decline anything
        that doesn&rsquo;t.
      </>
    ),
    proof: "Local marketplace",
  },
  {
    number: "03",
    title: "Get it done.",
    body: (
      <>
        Run the task, upload completion photos, get paid through the
        platform. Build a reputation that earns repeat clients in an
        industry that remembers.
      </>
    ),
    proof: "100% of task pay",
  },
];

export function LedgerBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const banners = isClient ? CLIENT_BANNERS : RENNER_BANNERS;
  const ctaButton = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      {/* Audience switch */}
      <div
        role="tablist"
        aria-label="Audience"
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 14,
          marginBottom: 56,
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: 16,
        }}
      >
        <TabButton label="For clients" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
        <TabButton label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
      </div>

      {/* Lede */}
      <div style={{ marginBottom: "clamp(64px, 8vw, 96px)", maxWidth: 760 }}>
        <p
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(20px, 1.9vw, 24px)",
            lineHeight: 1.5,
            color: INK,
            margin: 0,
            fontVariationSettings: '"opsz" 14',
          }}
        >
          {dek}
        </p>
      </div>

      {/* Banners — full-width plates separated by thick rules */}
      <div style={{ marginBottom: "clamp(80px, 10vw, 128px)" }}>
        {banners.map((banner, idx) => (
          <article
            key={banner.number}
            className="banner"
            style={{
              borderTop: `2px solid ${INK}`,
              borderBottom:
                idx === banners.length - 1 ? `2px solid ${INK}` : "none",
              padding: "clamp(40px, 5vw, 72px) 0",
            }}
          >
            <div
              className="banner-meta"
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 24,
                marginBottom: "clamp(28px, 3vw, 40px)",
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: STEEL_500,
              }}
            >
              <span>{banner.number}</span>
              <span>{banner.proof}</span>
            </div>

            <h2
              className="banner-title"
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(56px, 10vw, 144px)",
                lineHeight: 0.95,
                letterSpacing: "-0.035em",
                color: INK,
                margin: 0,
                marginBottom: "clamp(28px, 3vw, 40px)",
                fontVariationSettings: '"opsz" 144',
              }}
            >
              {banner.title}
            </h2>

            <p
              className="banner-body"
              style={{
                fontFamily: SERIF,
                fontSize: "clamp(17px, 1.5vw, 19px)",
                lineHeight: 1.6,
                color: STEEL_700,
                margin: 0,
                marginLeft: "auto",
                maxWidth: "52ch",
                fontVariationSettings: '"opsz" 14',
              }}
            >
              {banner.body}
            </p>
          </article>
        ))}
      </div>

      {/* Trust */}
      <section
        style={{
          marginBottom: showCta ? "clamp(64px, 8vw, 96px)" : 0,
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: STEEL_500,
            marginBottom: 28,
          }}
        >
          {isClient ? "Why Renner" : "What you get"}
        </div>
        <div
          className="banner-trust"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(24px, 3vw, 48px)",
          }}
        >
          {(isClient
            ? [
                ["Both sides verified", "Clients and Renners are ID-checked and background-checked before any booking."],
                ["Stripe escrow", "Funds held until you confirm the work, or 48 hours pass."],
                ["On the record", "Completion photos and a written confirmation on every task."],
              ]
            : [
                ["Real-estate work", "Tasks come from agents, brokers, and property managers — the people who keep listings moving."],
                ["Both sides verified", "The clients who book you are ID-checked and background-checked, the same as you."],
                ["A real reputation", "Repeat clients find their way back to the Renners they trust."],
              ]
          ).map(([label, body]) => (
            <div
              key={label}
              style={{
                paddingTop: 20,
                borderTop: `1px solid ${RULE}`,
              }}
            >
              <div
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: 20,
                  color: INK,
                  marginBottom: 8,
                  fontVariationSettings: '"opsz" 36',
                }}
              >
                {label}.
              </div>
              <div
                style={{
                  fontFamily: SERIF,
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: STEEL_700,
                  fontVariationSettings: '"opsz" 14',
                }}
              >
                {body}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {showCta && (
        <section
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            paddingTop: "clamp(48px, 6vw, 80px)",
            borderTop: `2px solid ${INK}`,
          }}
        >
          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(36px, 5vw, 64px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: INK,
              margin: 0,
              maxWidth: "16ch",
              fontVariationSettings: '"opsz" 96',
            }}
          >
            {isClient ? "Get something done." : "Start running."}
          </h2>
          <Link
            href={ctaButton.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: SANS,
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: "0.01em",
              color: PAPER,
              backgroundColor: INK,
              border: `1px solid ${INK}`,
              borderRadius: 4,
              padding: "16px 28px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "background-color 150ms ease, border-color 150ms ease",
            }}
          >
            {ctaButton.label}
            <span aria-hidden style={{ opacity: 0.7 }}>→</span>
          </Link>
        </section>
      )}

      <style jsx>{`
        @media (max-width: 720px) {
          .banner-trust {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
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
        fontStyle: "inherit",
        fontSize: "inherit",
        fontWeight: "inherit",
        color: active ? INK : STEEL_500,
        cursor: "pointer",
        transition: "color 150ms ease",
      }}
    >
      {label}
    </button>
  );
}
