"use client";

// Marketplace — serif-led editorial direction with SaaS DNA. Three
// product cards arranged horizontally show the actual UI moments
// behind each clause of the statement: the posted brief, the Renner
// applying, the completion receipt. Cards use hairline borders and
// generous interior padding; copy stays in steel monochrome with
// real-looking task content (anonymous but realistic). Both sides of
// the marketplace — clients and Renners — are ID-verified and
// background-checked, and Renners keep 100% of task pay; both facts
// surface in the cards themselves.

import Link from "next/link";
import { useState } from "react";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS =
  "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "var(--c-text, #0d0f12)";
const SLATE = "#2a2f36";
const STEEL_700 = "var(--c-700, #38414d)";
const STEEL_600 = "var(--c-600, #647589)";
const STEEL_500 = "var(--c-500, #7d8da0)";
const STEEL_400 = "var(--c-300, #a7b2be)";
const STEEL_300 = "var(--c-300, #cad1d8)";
const RULE = "var(--c-rule, #eaedf0)";
const BONE = "#f6f7f9";
const PAPER = "var(--c-bg, #fbfbfc)";

const CLIENT_DEK =
  "A marketplace built only for real-estate task work. You post the brief, a vetted operator applies, the work gets done. Both parties — clients and Renners — are ID-verified and background-checked.";

const RENNER_DEK =
  "Real-estate work, brief by brief. Run tasks for the agents, brokers, and property managers who keep listings moving. The clients you book with are ID-verified and background-checked, the same as you.";

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

// Small initials disc — used inside the application card and elsewhere
// the brand mark would normally sit. The shape echoes the Renner
// symbol (full disc) without the capsule cut, so it reads as an
// avatar slot rather than a brand.
function InitialsDisc({
  initials,
  size = 32,
  fontSize = 12,
}: {
  initials: string;
  size?: number;
  fontSize?: number;
}) {
  return (
    <div
      aria-hidden
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: STEEL_300,
        color: INK,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: SANS,
        fontSize,
        fontWeight: 500,
        letterSpacing: "0.02em",
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

function VerifiedRow({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: MONO,
        fontSize: 9,
        fontWeight: 500,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: STEEL_600,
      }}
    >
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: INK,
        }}
      />
      {label}
    </div>
  );
}

// Photo placeholder block — used in the completion card to suggest
// the photo grid without using stock imagery, which would feel like
// theme dressing.
function PhotoSlot({ aspect = "1 / 1" }: { aspect?: string }) {
  return (
    <div
      aria-hidden
      style={{
        aspectRatio: aspect,
        backgroundColor: BONE,
        border: `1px solid ${RULE}`,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: STEEL_400,
          fontFamily: MONO,
          fontSize: 9,
          fontWeight: 500,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}
      >
        Photo
      </div>
    </div>
  );
}

export function MarketplaceBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
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

      {/* ─── Dek ─── one sentence framing the platform */}
      <p
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(28px, 3.5vw, 44px)",
          lineHeight: 1.3,
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

      {/* ─── Three product cards ─── posted brief / application / completion */}
      <div
        className="mp-cards"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "clamp(16px, 1.8vw, 24px)",
          marginBottom: "clamp(72px, 9vw, 112px)",
          alignItems: "stretch",
        }}
      >
        {/* ─── Card 1 · Posted brief ─── */}
        <article
          style={{
            border: `1px solid ${STEEL_300}`,
            backgroundColor: PAPER,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderBottom: `1px solid ${RULE}`,
              fontFamily: MONO,
              fontSize: 9,
              fontWeight: 500,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: STEEL_500,
            }}
          >
            01 · Posted brief
          </div>
          <div
            style={{
              padding: "clamp(24px, 2.6vw, 32px)",
              display: "flex",
              flexDirection: "column",
              flex: 1,
              gap: 14,
            }}
          >
            <h3
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(20px, 1.8vw, 24px)",
                lineHeight: 1.2,
                letterSpacing: "-0.012em",
                color: INK,
                margin: 0,
                fontVariationSettings: '"opsz" 36',
              }}
            >
              Install sign rider.
            </h3>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.08em",
                color: STEEL_600,
                lineHeight: 1.5,
              }}
            >
              Cherry Creek, CO · 80205
              <br />
              Today 14:00–17:00 · $45
            </div>
            <p
              style={{
                fontFamily: SERIF,
                fontSize: 14,
                lineHeight: 1.55,
                color: STEEL_700,
                margin: 0,
                fontVariationSettings: '"opsz" 14',
              }}
            >
              Standard rider on a corner lot in RiNo. Bring a 6 ft ladder.
              Photographic confirmation on completion.
            </p>
            <div
              style={{
                marginTop: "auto",
                paddingTop: 16,
                borderTop: `1px solid ${RULE}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: SANS,
                  fontSize: 13,
                  fontWeight: 500,
                  color: INK,
                }}
              >
                <InitialsDisc initials="SK" size={24} fontSize={10} />
                Sarah K.
              </span>
              <VerifiedRow label="Verified client" />
            </div>
          </div>
        </article>

        {/* ─── Card 2 · Application ─── */}
        <article
          style={{
            border: `1px solid ${STEEL_300}`,
            backgroundColor: PAPER,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderBottom: `1px solid ${RULE}`,
              fontFamily: MONO,
              fontSize: 9,
              fontWeight: 500,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: STEEL_500,
            }}
          >
            02 · Application
          </div>
          <div
            style={{
              padding: "clamp(24px, 2.6vw, 32px)",
              display: "flex",
              flexDirection: "column",
              flex: 1,
              gap: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <InitialsDisc initials="JM" size={48} fontSize={16} />
              <div>
                <div
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: 22,
                    lineHeight: 1.1,
                    color: INK,
                    fontVariationSettings: '"opsz" 36',
                  }}
                >
                  James M.
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontFamily: MONO,
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: STEEL_500,
                  }}
                >
                  Denver · 2.4 mi away
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 16,
                fontFamily: SANS,
                fontSize: 14,
                color: INK,
                fontWeight: 400,
              }}
            >
              <span style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 400, color: INK }}>
                4.96
              </span>
              <span style={{ color: STEEL_600 }}>· 142 tasks completed</span>
            </div>
            <p
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: 15,
                lineHeight: 1.55,
                color: STEEL_700,
                margin: 0,
                fontVariationSettings: '"opsz" 14',
              }}
            >
              &ldquo;Five years in real estate operations. Punctual, courteous,
              photo-thorough.&rdquo;
            </p>
            <div
              style={{
                marginTop: "auto",
                paddingTop: 16,
                borderTop: `1px solid ${RULE}`,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <VerifiedRow label="ID-verified" />
              <VerifiedRow label="Background-checked" />
            </div>
          </div>
        </article>

        {/* ─── Card 3 · Completion ─── */}
        <article
          style={{
            border: `1px solid ${STEEL_300}`,
            backgroundColor: PAPER,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderBottom: `1px solid ${RULE}`,
              fontFamily: MONO,
              fontSize: 9,
              fontWeight: 500,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: STEEL_500,
            }}
          >
            03 · Completion
          </div>
          <div
            style={{
              padding: "clamp(24px, 2.6vw, 32px)",
              display: "flex",
              flexDirection: "column",
              flex: 1,
              gap: 16,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 6,
              }}
            >
              <PhotoSlot />
              <PhotoSlot />
              <PhotoSlot />
            </div>
            <div>
              <div
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: "clamp(20px, 1.8vw, 24px)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.012em",
                  color: INK,
                  marginBottom: 6,
                  fontVariationSettings: '"opsz" 36',
                }}
              >
                Confirmed.
              </div>
              <div
                style={{
                  fontFamily: SANS,
                  fontSize: 13,
                  color: STEEL_600,
                  lineHeight: 1.55,
                }}
              >
                Sarah K. confirmed the work and released payment.
              </div>
            </div>
            <div
              style={{
                marginTop: "auto",
                paddingTop: 16,
                borderTop: `1px solid ${RULE}`,
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                columnGap: 12,
                alignItems: "baseline",
                fontFamily: SANS,
                fontSize: 13,
                color: INK,
              }}
            >
              <span
                style={{
                  color: STEEL_500,
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                Released
              </span>
              <span>$45 through Stripe escrow</span>
            </div>
          </div>
        </article>
      </div>

      {/* ─── Trust ─── horizontal three-up under the cards */}
      <section
        style={{
          marginBottom: showCta ? "clamp(64px, 8vw, 96px)" : 0,
          paddingTop: 28,
          borderTop: `1px solid ${RULE}`,
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "clamp(20px, 3vw, 48px)",
        }}
        className="mp-trust"
      >
        {(isClient
          ? [
              ["Both sides verified", "Clients and Renners are ID-checked and background-checked before any booking."],
              ["Stripe escrow", "Funds held until you confirm the work, or 48 hours pass."],
              ["On the record", "Completion photos and a written confirmation arrive with every task."],
            ]
          : [
              ["Real-estate work", "Tasks come from agents, brokers, and property managers — the people who keep listings moving."],
              ["Both sides verified", "The clients who book you are ID-checked and background-checked, the same as you."],
              ["A real reputation", "Repeat clients find their way back to the Renners they trust."],
            ]
        ).map(([label, body]) => (
          <div key={label}>
            <div
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: 20,
                color: STEEL_700,
                marginBottom: 10,
                fontVariationSettings: '"opsz" 36',
              }}
            >
              {label}.
            </div>
            <div
              style={{
                fontFamily: SERIF,
                fontSize: 15,
                lineHeight: 1.55,
                color: INK,
                fontVariationSettings: '"opsz" 14',
              }}
            >
              {body}
            </div>
          </div>
        ))}
      </section>

      {/* ─── CTA ─── single-line heading + button */}
      {showCta && (
        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
            flexWrap: "wrap",
            paddingTop: "clamp(48px, 6vw, 80px)",
            borderTop: `1px solid ${RULE}`,
          }}
        >
          <h2
            style={{
              fontFamily: SANS,
              fontWeight: 400,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: INK,
              margin: 0,
              maxWidth: "20ch",
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
        @media (max-width: 880px) {
          .mp-cards {
            grid-template-columns: 1fr !important;
            gap: clamp(16px, 3vw, 24px) !important;
          }
          .mp-trust {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
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
