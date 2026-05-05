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

const CLIENT_DEK = "What do you need taken care of?";

const RENNER_DEK = "What can you take care of?";

const CLIENT_PLATES: Plate[] = [
  { number: "01", title: "Get verified", body: "Verify your ID and clear a background check.", proof: "Verified" },
  { number: "02", title: "Post a task", body: "Set the location, time, task, and price. Local Renners apply. Pick one.", proof: "Specifics" },
  { number: "03", title: "It's taken care of", body: "Confirm completion. Payment is released.", proof: "Escrow" },
];

const RENNER_PLATES: Plate[] = [
  { number: "01", title: "Get verified", body: "Verify your ID, clear a background check, and set your service area.", proof: "Onboarded" },
  { number: "02", title: "Pick a task", body: "See tasks in your area. Apply to what fits your skills and schedule.", proof: "Local" },
  { number: "03", title: "Take care of it", body: "Complete the task. Send photo confirmation. Receive payment.", proof: "100% of pay" },
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


export function PlateBody({
  showCta,
  audiencePrompt,
  audienceUpright,
  step1Illustration,
  step1IllustrationClient,
  step1IllustrationRenner,
}: {
  showCta: boolean;
  audiencePrompt?: string | null;
  audienceUpright?: boolean;
  step1Illustration?: React.ReactNode;
  step1IllustrationClient?: React.ReactNode;
  step1IllustrationRenner?: React.ReactNode;
}) {
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
          alignItems: "baseline",
          gap: 14,
          marginBottom: 56,
          fontFamily: SERIF,
          fontStyle: audienceUpright ? "normal" : "italic",
          fontWeight: audienceUpright ? 375 : 300,
          fontSize: "clamp(17px, 1.7vw, 20px)",
          lineHeight: 1.55,
          letterSpacing: 0,
          fontVariationSettings: '"opsz" 14',
        }}
      >
        {audiencePrompt ? (
          <span style={{ color: STEEL_500, fontStyle: "italic", fontWeight: 300 }}>
            {audiencePrompt}
          </span>
        ) : null}
        <TabButton label="Hire a Renner" active={isClient} onClick={() => setTab("client")} weight={audienceUpright ? 375 : 300} />
        <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
        <TabButton label="Become a Renner" active={!isClient} onClick={() => setTab("renner")} weight={audienceUpright ? 375 : 300} />
      </div>

      {/* ─── Plates ─── three hairline-bordered cards stacked vertically */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(20px, 2.5vw, 32px)",
          marginBottom: "clamp(72px, 9vw, 120px)",
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
                  maxWidth: "80ch",
                  fontVariationSettings: '"opsz" 14',
                }}
              >
                {plate.body}
              </p>
            </div>
            <div className="plate-illustration" style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
              {idx === 0
                ? (
                    (isClient ? step1IllustrationClient : step1IllustrationRenner) ??
                    step1Illustration ??
                    <Mini kind={(isClient ? CLIENT_KINDS : RENNER_KINDS)[idx]} />
                  )
                : <Mini kind={(isClient ? CLIENT_KINDS : RENNER_KINDS)[idx]} />}
              <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: STEEL_600 }}>
                {plate.proof}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* ─── Trust ─── three pairs in the same three-column rhythm as the plates header */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(24px, 3vw, 40px)",
          paddingTop: "clamp(28px, 3.5vw, 36px)",
          borderTop: `1px solid ${INK}`,
          marginBottom: showCta ? "clamp(72px, 9vw, 120px)" : 0,
          textAlign: "center",
        }}
        className="plate-trust"
      >
        {(isClient
          ? [
              ["Verification", "Everyone on Renner passes ID and background checks."],
              ["License-gated", "Tasks requiring a license go to licensed Renners."],
              ["Save your favorites", "Invite them to your tasks."],
            ]
          : [
              ["Real work", "Real estate tasks."],
              ["Verification", "Everyone on Renner passes ID and background checks."],
              ["Repeat work", "Clients can save you as a favorite."],
            ]
        ).map(([label, body]) => (
          <div key={label}>
            <div
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(20px, 2vw, 24px)",
                lineHeight: 1.15,
                letterSpacing: "-0.012em",
                color: INK,
                marginBottom: 10,
                fontVariationSettings: '"opsz" 36',
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontFamily: SERIF,
                fontSize: 15,
                lineHeight: 1.55,
                color: STEEL_700,
                fontVariationSettings: '"opsz" 14',
              }}
            >
              {body}
            </div>
          </div>
        ))}
      </section>

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
          :global(.plate-trust) {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
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
  weight,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  weight?: number;
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
        fontWeight: weight ?? "inherit",
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
