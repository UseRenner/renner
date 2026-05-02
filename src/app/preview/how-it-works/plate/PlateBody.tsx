"use client";

import Link from "next/link";
import { useState } from "react";
import { Mini, CLIENT_KINDS, RENNER_KINDS } from "../_illustrations";

type Plate = {
  number: string;
  title: string;
  body: React.ReactNode;
  proof: string;
};

const CLIENT_DEK =
  "A marketplace for real-estate work. Post a task, pick a Renner, get it done. Verified on both sides.";

const RENNER_DEK =
  "Real-estate work, paid through the platform. Set your area, pick the tasks. Verified on both sides.";

const CLIENT_PLATES: Plate[] = [
  { number: "01", title: "Post a task.", body: "Where, when, what, how much. Two minutes.", proof: "Under 2 min" },
  { number: "02", title: "Pick a Renner.", body: "Vetted Renners apply. Read their profile. Book one.", proof: "Checkr-vetted" },
  { number: "03", title: "Get it done.", body: "Photos arrive. You confirm. Stripe pays.", proof: "Stripe escrow" },
];

const RENNER_PLATES: Plate[] = [
  { number: "01", title: "Get verified.", body: "ID, background check, area. Same day.", proof: "Same-day" },
  { number: "02", title: "Pick a task.", body: "Tasks from agents and managers nearby. Apply.", proof: "Local" },
  { number: "03", title: "Get it done.", body: "Run the task. Send photos. Get paid.", proof: "100% of pay" },
];

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS =
  "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "var(--c-text, #0d0f12)";
const STEEL_700 = "var(--c-700, #38414d)";
const STEEL_600 = "var(--c-600, #647589)";
const STEEL_500 = "var(--c-500, #7d8da0)";
const STEEL_300 = "var(--c-300, #cad1d8)";
const PAPER = "var(--c-bg, #fbfbfc)";


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
      {/* ─── Audience switch ─── italic, restrained */}
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
          letterSpacing: 0,
        }}
      >
        <TabButton label="For clients" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
        <TabButton label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
      </div>

      {/* ─── Lede ─── */}
      <p
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(28px, 3.5vw, 44px)",
          lineHeight: 1.25,
          letterSpacing: "-0.012em",
          color: INK,
          margin: 0,
          marginBottom: "clamp(72px, 9vw, 120px)",
          maxWidth: "32ch",
          fontVariationSettings: '"opsz" 60',
        }}
      >
        {dek}
      </p>

      {/* ─── Plates ─── three hairline-bordered cards stacked vertically */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(20px, 2.5vw, 32px)",
          marginBottom: showCta ? "clamp(72px, 9vw, 120px)" : 0,
        }}
      >
        {plates.map((plate, idx) => (
          <article
            key={plate.number}
            style={{
              backgroundColor: "var(--c-panel, #eaedf0)",
              padding: "clamp(32px, 4.5vw, 56px)",
              display: "grid",
              gridTemplateColumns: "minmax(56px, 64px) minmax(0, 1fr) minmax(260px, 320px)",
              gap: "clamp(24px, 3.5vw, 56px)",
              alignItems: "center",
            }}
            className="plate-card"
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.22em",
                color: STEEL_500,
              }}
            >
              {plate.number}
            </div>
            <div>
              <h3
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(24px, 2.8vw, 32px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.014em",
                  color: INK,
                  margin: 0,
                  marginBottom: 14,
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
                  maxWidth: "56ch",
                  fontVariationSettings: '"opsz" 14',
                }}
              >
                {plate.body}
              </p>
            </div>
            <div className="plate-illustration" style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
              <Mini kind={(isClient ? CLIENT_KINDS : RENNER_KINDS)[idx]} />
              <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: STEEL_600 }}>
                {plate.proof}
              </span>
            </div>
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
              "Get something done."
            ) : (
              "Start running."
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
        @media (max-width: 1024px) {
          :global(.plate-card) {
            grid-template-columns: minmax(56px, 64px) minmax(0, 1fr) !important;
          }
          :global(.plate-illustration) {
            display: none !important;
          }
        }
        @media (max-width: 720px) {
          :global(.plate-card) {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
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
