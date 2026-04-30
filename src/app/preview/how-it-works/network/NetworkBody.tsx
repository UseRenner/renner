"use client";

// Network — sans-led variant. Source Sans carries the H1 statement,
// the dek, and every UI label; Source Serif appears only as italic-300
// accents on the closing emphasis word, on operator names inside the
// roster cards, and on the rating numerals. This gives the page a
// modern product surface (LinkedIn-meets-Stripe-docs) while preserving
// the editorial register through the typographic accents. Both parties
// are ID-verified and background-checked; Renners keep 100% of pay.

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
const STEEL_400 = "#a7b2be";
const STEEL_300 = "#cad1d8";
const RULE = "#eaedf0";
const BONE = "#f6f7f9";
const PAPER = "#fbfbfc";

const CLIENT_DEK =
  "A vetted network of real-estate operators. Both parties — clients and Renners — are ID-verified and background-checked before posting or booking.";

const RENNER_DEK =
  "A network for the people who keep real estate moving — and the people who want to. The agents, brokers, and managers who post tasks are ID-verified and background-checked, the same as you.";

type Operator = {
  initials: string;
  name: string;
  location: string;
  rating: string;
  tasks: number;
  tags: string[];
  licensed?: boolean;
};

const OPERATORS: Operator[] = [
  {
    initials: "SK",
    name: "Sarah K.",
    location: "Cherry Creek, CO",
    rating: "4.97",
    tasks: 53,
    tags: ["Signs", "Lockbox"],
  },
  {
    initials: "JM",
    name: "James M.",
    location: "Denver, CO",
    rating: "4.96",
    tasks: 142,
    tags: ["Signs", "Lockbox", "Courier"],
  },
  {
    initials: "AR",
    name: "Aisha R.",
    location: "SoHo, NY",
    rating: "4.92",
    tasks: 88,
    tags: ["Courier", "Documents"],
  },
  {
    initials: "MT",
    name: "Marcus T.",
    location: "Lincoln Park, IL",
    rating: "4.95",
    tasks: 67,
    tags: ["Showings", "Lockbox"],
    licensed: true,
  },
  {
    initials: "CL",
    name: "Chen L.",
    location: "West Hollywood, CA",
    rating: "4.99",
    tasks: 124,
    tags: ["Visuals", "Walkthrough"],
  },
  {
    initials: "PN",
    name: "Priya N.",
    location: "Capitol Hill, DC",
    rating: "4.93",
    tasks: 41,
    tags: ["Guest access", "Property prep"],
  },
];

function Em({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: SERIF,
        fontStyle: "italic",
        fontWeight: 300,
        color: STEEL_600,
      }}
    >
      {children}
    </span>
  );
}

function InitialsDisc({
  initials,
  size = 40,
  fontSize = 14,
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
        backgroundColor: BONE,
        border: `1px solid ${STEEL_300}`,
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

function VerifiedDot({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: MONO,
        fontSize: 9,
        fontWeight: 500,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: STEEL_600,
      }}
    >
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor: INK,
        }}
      />
      {label}
    </span>
  );
}

export function NetworkBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const ctaButton = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  // Statement clauses — sans-led, with the closing emphasis word set
  // in italic-300 serif. The single-line italic punch is the editorial
  // accent that keeps a sans-led page from reading purely SaaS.
  const clauses: React.ReactNode[] = isClient
    ? [
        <>Post a <Em>task.</Em></>,
        <>Pick a <Em>vetted Renner.</Em></>,
        <>Get it <Em>done.</Em></>,
      ]
    : [
        <>Get <Em>verified.</Em></>,
        <>Pick a <Em>task.</Em></>,
        <>Get it <Em>done.</Em></>,
      ];

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

      {/* ─── Statement + dek ─── sans-led with italic-serif accents */}
      <div
        className="net-lede"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
          gap: "clamp(40px, 6vw, 96px)",
          alignItems: "end",
          marginBottom: "clamp(64px, 8vw, 96px)",
        }}
      >
        <h1
          style={{
            fontFamily: SANS,
            fontWeight: 400,
            fontSize: "clamp(36px, 5.4vw, 64px)",
            lineHeight: 1.05,
            letterSpacing: "-0.018em",
            color: INK,
            margin: 0,
            maxWidth: "22ch",
          }}
        >
          {clauses.map((c, i) => (
            <span key={i} style={{ display: "block" }}>
              {c}
            </span>
          ))}
        </h1>
        <p
          style={{
            fontFamily: SANS,
            fontWeight: 400,
            fontSize: "clamp(15px, 1.3vw, 17px)",
            lineHeight: 1.6,
            color: STEEL_700,
            margin: 0,
            maxWidth: "44ch",
          }}
        >
          {dek}
        </p>
      </div>

      {/* ─── Section label ─── above the operator grid */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          paddingBottom: 16,
          marginBottom: 24,
          borderBottom: `1px solid ${STEEL_300}`,
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: STEEL_600,
          }}
        >
          On the network
        </div>
        <div
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 15,
            color: STEEL_600,
            fontVariationSettings: '"opsz" 14',
          }}
        >
          Illustrative · names and figures are examples
        </div>
      </div>

      {/* ─── Operator grid ─── 3 × 2 on desktop, stacks on mobile */}
      <div
        className="net-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "clamp(12px, 1.4vw, 20px)",
          marginBottom: "clamp(64px, 8vw, 96px)",
        }}
      >
        {OPERATORS.map((op) => (
          <article
            key={op.name}
            style={{
              border: `1px solid ${STEEL_300}`,
              backgroundColor: PAPER,
              padding: "clamp(20px, 2.4vw, 28px)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              minHeight: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <InitialsDisc initials={op.initials} size={44} fontSize={14} />
              <div style={{ minWidth: 0 }}>
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
                  {op.name}
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontFamily: SANS,
                    fontSize: 13,
                    color: STEEL_600,
                    lineHeight: 1.4,
                  }}
                >
                  {op.location}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 8,
                fontFamily: SANS,
                fontSize: 13,
                color: STEEL_600,
              }}
            >
              <span
                style={{
                  fontFamily: SERIF,
                  fontSize: 22,
                  fontWeight: 400,
                  color: INK,
                  fontVariationSettings: '"opsz" 36',
                }}
              >
                {op.rating}
              </span>
              <span>· {op.tasks} tasks completed</span>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
              }}
            >
              {op.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: SANS,
                    fontSize: 11,
                    color: STEEL_700,
                    backgroundColor: BONE,
                    border: `1px solid ${RULE}`,
                    padding: "4px 10px",
                    borderRadius: 999,
                  }}
                >
                  {tag}
                </span>
              ))}
              {op.licensed && (
                <span
                  style={{
                    fontFamily: SANS,
                    fontSize: 11,
                    color: INK,
                    backgroundColor: PAPER,
                    border: `1px solid ${INK}`,
                    padding: "4px 10px",
                    borderRadius: 999,
                  }}
                >
                  Licensed
                </span>
              )}
            </div>

            <div
              style={{
                marginTop: "auto",
                paddingTop: 14,
                borderTop: `1px solid ${RULE}`,
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
              }}
            >
              <VerifiedDot label="ID" />
              <VerifiedDot label="Background" />
            </div>
          </article>
        ))}
      </div>

      {/* ─── Trust ─── three statements that lean editorial */}
      <section
        style={{
          marginBottom: showCta ? "clamp(56px, 7vw, 88px)" : 0,
          paddingTop: 28,
          borderTop: `1px solid ${RULE}`,
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "clamp(20px, 3vw, 48px)",
        }}
        className="net-trust"
      >
        {(isClient
          ? [
              ["Both sides verified", "Clients and Renners are ID-checked and background-checked before they can post or book."],
              ["Stripe escrow", "Funds are held by Stripe until the work is confirmed or 48 hours pass."],
              ["On the record", "Completion photos and a written confirmation arrive with every task."],
            ]
          : [
              ["Real-estate work", "Run tasks for the agents, brokers, and property managers who keep listings moving."],
              ["Verified clients", "The agents, brokers, and managers who book you are ID-checked and background-checked."],
              ["A real reputation", "Build a name in an industry that remembers. Repeat clients find their way back."],
            ]
        ).map(([label, body]) => (
          <div key={label}>
            <div
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: 22,
                color: STEEL_700,
                marginBottom: 10,
                fontVariationSettings: '"opsz" 36',
              }}
            >
              {label}.
            </div>
            <div
              style={{
                fontFamily: SANS,
                fontSize: 15,
                lineHeight: 1.55,
                color: INK,
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
              fontSize: "clamp(26px, 3.2vw, 40px)",
              lineHeight: 1.15,
              letterSpacing: "-0.018em",
              color: INK,
              margin: 0,
              maxWidth: "20ch",
            }}
          >
            {isClient ? (
              <>Get something <Em>done.</Em></>
            ) : (
              <>Start <Em>running.</Em></>
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
        @media (max-width: 980px) {
          .net-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 720px) {
          .net-lede {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            align-items: start !important;
          }
          .net-grid {
            grid-template-columns: 1fr !important;
          }
          .net-trust {
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
