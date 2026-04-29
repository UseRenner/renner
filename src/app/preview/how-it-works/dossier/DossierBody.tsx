"use client";

import Link from "next/link";
import { useState } from "react";

type Article = {
  num: string;
  title: React.ReactNode;
  body: React.ReactNode;
  spec: Array<[string, string]>;
};

const CLIENT_ARTICLES: Article[] = [
  {
    num: "1",
    title: "Posting.",
    body: (
      <>
        The client posts a brief to the Renner platform. The brief specifies
        the work, the location, the time window, and the price. Posts go
        live in under two minutes; the marketplace is open to vetted
        Renners only.
      </>
    ),
    spec: [
      ["Party", "Client"],
      ["Time", "T+0"],
      ["Output", "Public brief"],
    ],
  },
  {
    num: "2",
    title: "Selection.",
    body: (
      <>
        Background-checked Renners in the area review the brief and apply
        with their tenure, ratings, and credentials. The client reviews the
        applications and books the right hand for the work.
      </>
    ),
    spec: [
      ["Party", "Client / Renner"],
      ["Vetting", "Checkr-verified"],
      ["Booking", "Single Renner"],
    ],
  },
  {
    num: "3",
    title: "Completion.",
    body: (
      <>
        The Renner runs the task and submits completion photos with a
        written confirmation. The client confirms; Stripe releases funds
        from escrow. If 48 hours pass without action, payment auto-releases.
      </>
    ),
    spec: [
      ["Party", "Renner / Client"],
      ["Evidence", "Photo · message thread"],
      ["Settlement", "Stripe escrow"],
    ],
  },
];

const RENNER_ARTICLES: Article[] = [
  {
    num: "1",
    title: "Verification.",
    body: (
      <>
        The applicant signs up, submits identity documents, and clears a
        Checkr background check. Categories, service area, and rate are
        set. Verification typically clears the same day.
      </>
    ),
    spec: [
      ["Party", "Applicant"],
      ["Vetting", "Checkr"],
      ["Output", "Active Renner"],
    ],
  },
  {
    num: "2",
    title: "Selection.",
    body: (
      <>
        The Renner reviews briefs posted by agents, brokers, and property
        managers in the area and applies to those that fit. Schedule and
        skill match are at the Renner&rsquo;s discretion.
      </>
    ),
    spec: [
      ["Party", "Renner / Client"],
      ["Discretion", "Renner"],
      ["Booking", "Mutual"],
    ],
  },
  {
    num: "3",
    title: "Completion.",
    body: (
      <>
        The Renner completes the task, uploads photos, and submits the
        brief. Funds release from Stripe escrow on confirmation. The
        Renner keeps 90% of task pay; the client&rsquo;s 10% service fee
        underwrites the platform.
      </>
    ),
    spec: [
      ["Party", "Renner"],
      ["Payout", "90% of task pay"],
      ["Settlement", "Stripe"],
    ],
  },
];

const CLIENT_SIGNATORIES: Array<[string, string]> = [
  [
    "Background screening",
    "Conducted by Checkr, Inc. Every Renner clears a screen before booking any task — licensed or not.",
  ],
  [
    "Funds custody",
    "Held in escrow by Stripe Connect. Released to the Renner only on client confirmation or after a 48-hour auto-release window.",
  ],
  [
    "Damage and dispute",
    "Reportable for 48 hours after completion. Renner support facilitates resolution using completion photos and the message thread as evidence.",
  ],
  [
    "Cancellation",
    "Full refund before the Renner starts. After start, task pay is split 50/50 regardless of party.",
  ],
];

const RENNER_SIGNATORIES: Array<[string, string]> = [
  [
    "Independence",
    "Renners are independent contractors. Renner sets neither schedule nor methods — only the marketplace, the vetting, and the rails.",
  ],
  [
    "Payout",
    "Renners keep 90% of the task pay. Funds release through Stripe at client confirmation; if 48 hours pass with no action, payment auto-releases.",
  ],
  [
    "Reputation",
    "Ratings and reviews follow you. Repeat clients book the Renners they trust through the My Renners directory.",
  ],
  [
    "Cancellation",
    "Free to cancel before starting. After start, the task pay is split 50/50 regardless of reason.",
  ],
];

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS =
  "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0d0f12";
const SLATE = "#3a414a";
const STEEL = "#5b6878";
const FOG = "#8a93a0";
const RULE = "#0d0f12";
const HAIRLINE = "rgba(13,15,18,0.14)";
const PAPER = "#ffffff";

export function DossierBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const articles = isClient ? CLIENT_ARTICLES : RENNER_ARTICLES;
  const signatories = isClient ? CLIENT_SIGNATORIES : RENNER_SIGNATORIES;
  const ctaButton = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      {/* ─── Cover block ─── document-style identification */}
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 48px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "baseline",
            gap: 24,
            paddingBottom: 16,
            borderBottom: `1px solid ${HAIRLINE}`,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: STEEL,
            }}
          >
            Operations brief · No. 01
          </div>
          <div
            role="tablist"
            aria-label="Audience"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontFamily: MONO,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
            }}
          >
            <SwitchLabel
              label="Clients"
              active={isClient}
              onClick={() => setTab("client")}
            />
            <span aria-hidden style={{ color: FOG }}>
              ·
            </span>
            <SwitchLabel
              label="Renners"
              active={!isClient}
              onClick={() => setTab("renner")}
            />
          </div>
        </div>

        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(56px, 8vw, 112px)",
            lineHeight: 0.92,
            letterSpacing: "-0.035em",
            color: INK,
            margin: 0,
            marginBottom: 32,
            maxWidth: "12ch",
            fontVariationSettings: '"opsz" 144',
          }}
        >
          How Renner works.
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 240px) minmax(0, 1fr)",
            gap: "clamp(24px, 4vw, 64px)",
            paddingBottom: 40,
            borderBottom: `1px solid ${RULE}`,
            marginBottom: 80,
          }}
          className="dossier-spec-grid"
        >
          <dl
            style={{
              margin: 0,
              display: "grid",
              rowGap: 8,
              fontFamily: MONO,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: STEEL,
            }}
          >
            {[
              ["Issued", "Apr 29, 2026"],
              ["Subject", isClient ? "Client protocol" : "Renner protocol"],
              ["Pages", "3 of 3"],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 16 }}
              >
                <dt style={{ color: FOG }}>{k}</dt>
                <dd style={{ margin: 0, color: INK }}>{v}</dd>
              </div>
            ))}
          </dl>
          <p
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(18px, 1.7vw, 22px)",
              lineHeight: 1.55,
              color: SLATE,
              margin: 0,
              maxWidth: "60ch",
              fontVariationSettings: '"opsz" 14',
            }}
          >
            {isClient ? (
              <>
                Renner is a marketplace built only for real-estate task work.
                Clients post; vetted Renners apply; the platform handles
                vetting, escrow, and the paper trail. The protocol below
                describes a single brief, end to end.
              </>
            ) : (
              <>
                Renner is a marketplace built only for real-estate task work.
                Independent operators run the briefs that agents, brokers,
                and managers post. The protocol below describes a single
                brief from a Renner&rsquo;s side, end to end.
              </>
            )}
          </p>
        </div>
      </div>

      {/* ─── Articles ─── three numbered protocol steps, vertical */}
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 48px) 80px",
        }}
      >
        {articles.map((article, idx) => (
          <article
            key={article.num}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(120px, 160px) minmax(0, 1fr)",
              gap: "clamp(24px, 4vw, 64px)",
              padding: "48px 0",
              borderTop: idx === 0 ? `1px solid ${RULE}` : `1px solid ${HAIRLINE}`,
              borderBottom:
                idx === articles.length - 1 ? `1px solid ${RULE}` : "none",
            }}
            className="dossier-article"
          >
            <div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: FOG,
                  marginBottom: 12,
                }}
              >
                Article {article.num}
              </div>
              <div
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: "clamp(72px, 9vw, 112px)",
                  lineHeight: 0.85,
                  letterSpacing: "-0.04em",
                  color: INK,
                  fontVariationSettings: '"opsz" 144',
                }}
              >
                {article.num}.
              </div>
            </div>

            <div>
              <h2
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
                {article.title}
              </h2>
              <p
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: 18,
                  lineHeight: 1.6,
                  color: SLATE,
                  margin: 0,
                  marginBottom: 24,
                  maxWidth: "60ch",
                  fontVariationSettings: '"opsz" 14',
                }}
              >
                {article.body}
              </p>
              <dl
                style={{
                  margin: 0,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: 16,
                  paddingTop: 20,
                  borderTop: `1px solid ${HAIRLINE}`,
                  fontFamily: MONO,
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                {article.spec.map(([k, v]) => (
                  <div key={k}>
                    <dt style={{ color: FOG, marginBottom: 4 }}>{k}</dt>
                    <dd style={{ margin: 0, color: INK }}>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        ))}
      </div>

      {/* ─── Signatories ─── trust elements as definition list */}
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "80px clamp(20px, 4vw, 48px) 0",
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: FOG,
            marginBottom: 32,
          }}
        >
          Signatories
        </div>
        <dl style={{ margin: 0 }}>
          {signatories.map(([k, v], idx) => (
            <div
              key={k}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(180px, 240px) 1fr",
                gap: 32,
                padding: "24px 0",
                borderTop: idx === 0 ? `1px solid ${RULE}` : `1px solid ${HAIRLINE}`,
                borderBottom:
                  idx === signatories.length - 1
                    ? `1px solid ${RULE}`
                    : "none",
                alignItems: "baseline",
              }}
              className="dossier-sig-row"
            >
              <dt
                style={{
                  fontFamily: SERIF,
                  fontWeight: 500,
                  fontSize: 18,
                  color: INK,
                  letterSpacing: "-0.005em",
                  fontVariationSettings: '"opsz" 36',
                }}
              >
                {k}
              </dt>
              <dd
                style={{
                  fontFamily: SERIF,
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: SLATE,
                  margin: 0,
                  maxWidth: "70ch",
                  fontVariationSettings: '"opsz" 14',
                }}
              >
                {v}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ─── Execution ─── precise CTA closer */}
      {showCta && (
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "96px clamp(20px, 4vw, 48px) 0",
            display: "grid",
            gridTemplateColumns: "minmax(120px, 160px) minmax(0, 1fr)",
            gap: "clamp(24px, 4vw, 64px)",
          }}
          className="dossier-execute"
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: FOG,
            }}
          >
            Execute
          </div>
          <div>
            <h2
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(36px, 5vw, 56px)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: INK,
                margin: 0,
                marginBottom: 32,
                maxWidth: "20ch",
                fontVariationSettings: '"opsz" 144',
              }}
            >
              {isClient
                ? "Open a Renner account and post the first brief."
                : "Apply, clear vetting, and start running tasks."}
            </h2>
            <Link
              href={ctaButton.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                fontFamily: SANS,
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: PAPER,
                backgroundColor: INK,
                border: `1px solid ${INK}`,
                borderRadius: 0,
                padding: "18px 32px",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition:
                  "background-color 150ms ease, color 150ms ease",
              }}
            >
              {ctaButton.label}
              <span aria-hidden style={{ opacity: 0.6 }}>
                →
              </span>
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 700px) {
          .dossier-spec-grid {
            grid-template-columns: 1fr !important;
          }
          .dossier-article {
            grid-template-columns: 1fr !important;
          }
          .dossier-sig-row {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
          .dossier-execute {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

function SwitchLabel({
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
        color: active ? "#0d0f12" : "#8a93a0",
        cursor: "pointer",
        transition: "color 150ms ease",
      }}
    >
      {label}
    </button>
  );
}
