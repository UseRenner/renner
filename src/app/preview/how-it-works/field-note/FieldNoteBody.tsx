"use client";

import Link from "next/link";
import { useState } from "react";

type Step = {
  numeral: string;
  title: React.ReactNode;
  body: React.ReactNode;
};

const CLIENT_STEPS: Step[] = [
  {
    numeral: "I",
    title: "File the brief.",
    body: (
      <>
        Describe the work — sign rider, lockbox swap, a twelve-photo
        walkthrough, a guest check-in. Set the address, the window, and the
        price. Posts go live in under two minutes.
      </>
    ),
  },
  {
    numeral: "II",
    title: "Pick a vetted Renner.",
    body: (
      <>
        Background-checked Renners in your zip apply with their tenure,
        ratings, and bio. Read what they&rsquo;ve done. Book the right hand
        for the work.
      </>
    ),
  },
  {
    numeral: "III",
    title: (
      <>
        It gets <Em>done.</Em>
      </>
    ),
    body: (
      <>
        Your Renner closes the brief with completion photos and a written
        confirmation. You confirm; Stripe releases the funds. The brief
        archives, the rating posts, the next one is up.
      </>
    ),
  },
];

const RENNER_STEPS: Step[] = [
  {
    numeral: "I",
    title: "Get verified.",
    body: (
      <>
        Sign up, confirm your identity, clear a Checkr background check.
        Pick the categories you run — signs, lockbox, courier, visuals,
        guest access, showings. Set your service area.
      </>
    ),
  },
  {
    numeral: "II",
    title: "Read the briefs.",
    body: (
      <>
        Tasks come in from agents, brokers, property managers, and
        landlords nearby. Apply to what fits your schedule and skills.
        Decline anything that doesn&rsquo;t.
      </>
    ),
  },
  {
    numeral: "III",
    title: (
      <>
        Get it <Em>done.</Em>
      </>
    ),
    body: (
      <>
        Run the task. Upload completion photos. Funds release through
        Stripe at confirmation; you keep ninety percent. Repeat clients
        find their way back to the Renners they trust.
      </>
    ),
  },
];

const CLIENT_PULLQUOTE = "Built only for real estate.";
const RENNER_PULLQUOTE = "Built only for the people who run it.";

const CLIENT_PROOF: Array<[string, string]> = [
  ["VETTING", "Every Renner clears a Checkr background check before booking any task."],
  ["ESCROW", "Funds are held by Stripe until the task is confirmed or 48 hours pass."],
  ["RECORD", "Completion photos and the message thread stay on the brief."],
];

const RENNER_PROOF: Array<[string, string]> = [
  ["INDEPENDENCE", "Set your own schedule. Pick the work that fits. No assignments."],
  ["LOCAL", "You only see tasks from agents, brokers, and managers in your area."],
  ["PAY", "Renners keep ninety percent of task pay. Stripe releases at confirmation."],
];

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS =
  "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#1a1a1a";
const STEEL = "#647589";
const MUTED = "#9b9486";
const OXBLOOD = "#7a2c2c";
const RULE = "#1a1a1a";
const HAIRLINE = "rgba(26,26,26,0.16)";
const IVORY = "#f6f3ed";

function Em({ children }: { children: React.ReactNode }) {
  return (
    <em
      style={{
        fontStyle: "italic",
        fontWeight: 300,
        color: STEEL,
      }}
    >
      {children}
    </em>
  );
}

export function FieldNoteBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const proof = isClient ? CLIENT_PROOF : RENNER_PROOF;
  const pull = isClient ? CLIENT_PULLQUOTE : RENNER_PULLQUOTE;
  const ctaHeading: React.ReactNode = isClient ? (
    <>
      Ready to file the <Em>first brief?</Em>
    </>
  ) : (
    <>
      Ready to <Em>run?</Em>
    </>
  );
  const ctaButton = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      {/* ─── Audience switch ─── editorial section rule */}
      <SectionRule
        label={
          <span style={{ display: "inline-flex", alignItems: "center", gap: 16 }}>
            <SwitchLabel
              label="For Clients"
              active={isClient}
              onClick={() => setTab("client")}
            />
            <span aria-hidden style={{ color: MUTED }}>
              ·
            </span>
            <SwitchLabel
              label="For Renners"
              active={!isClient}
              onClick={() => setTab("renner")}
            />
          </span>
        }
      />

      {/* ─── Masthead headline ─── */}
      <h1
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(64px, 11vw, 156px)",
          lineHeight: 0.88,
          letterSpacing: "-0.04em",
          color: INK,
          margin: "16px auto 32px",
          textAlign: "center",
          maxWidth: "11ch",
          fontVariationSettings: '"opsz" 144',
        }}
      >
        How Renner <Em>works</Em>
      </h1>

      <div
        style={{
          textAlign: "center",
          fontFamily: MONO,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: OXBLOOD,
          marginBottom: 56,
        }}
      >
        A field journal for real estate
      </div>

      {/* ─── Lede ─── center column, large reading serif */}
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto 80px",
          padding: "0 8px",
        }}
      >
        <p
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(20px, 2.2vw, 26px)",
            lineHeight: 1.45,
            color: INK,
            margin: 0,
            textAlign: "left",
            fontVariationSettings: '"opsz" 14',
          }}
        >
          <DropCap>{isClient ? "R" : "T"}</DropCap>
          {isClient ? (
            <>
              eal estate moves at the speed of the next listing. Renner is the
              network that keeps it moving — a marketplace of
              background-checked operators running short, location-bound tasks
              for agents, brokers, and property managers across the country.{" "}
              <Em>You post the brief.</Em> A vetted Renner applies. The work
              gets done — confirmed by photo, paid through escrow.
            </>
          ) : (
            <>
              he Renner network is a national roster of background-checked
              operators running short real-estate tasks for the agents,
              brokers, and managers who post them. <Em>You set the schedule.</Em>{" "}
              You pick the work. The platform handles vetting, payment, and
              the paper trail.
            </>
          )}
        </p>
      </div>

      {/* ─── Three steps ─── editorial three-column with marginalia */}
      <SectionRule
        label={
          <span
            style={{
              fontFamily: SANS,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: INK,
            }}
          >
            The brief, in three movements
          </span>
        }
      />

      <div
        className="fn-steps"
        style={{ maxWidth: 1100, margin: "0 auto", padding: "0 8px 80px" }}
      >
        {steps.map((step, idx) => (
          <article
            key={step.numeral}
            className="fn-step"
            style={{
              borderRight:
                idx === steps.length - 1
                  ? "none"
                  : `1px solid ${HAIRLINE}`,
              padding: "0 clamp(20px, 3vw, 40px)",
            }}
          >
            <div
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: 56,
                lineHeight: 1,
                color: OXBLOOD,
                marginBottom: 24,
                fontVariationSettings: '"opsz" 144',
              }}
            >
              {step.numeral}.
            </div>
            <h3
              style={{
                fontFamily: SERIF,
                fontWeight: 500,
                fontSize: 24,
                lineHeight: 1.2,
                letterSpacing: "-0.012em",
                color: INK,
                margin: "0 0 16px",
                fontVariationSettings: '"opsz" 36',
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontFamily: SERIF,
                fontSize: 17,
                lineHeight: 1.6,
                color: INK,
                margin: 0,
                fontVariationSettings: '"opsz" 14',
              }}
            >
              {step.body}
            </p>
          </article>
        ))}
      </div>

      {/* ─── Pull quote ─── */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "64px 32px 96px",
          borderTop: `1px solid ${RULE}`,
          borderBottom: `1px solid ${RULE}`,
        }}
      >
        <p
          style={{
            fontFamily: SERIF,
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(36px, 5.5vw, 64px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: INK,
            margin: 0,
            textAlign: "center",
            fontVariationSettings: '"opsz" 144',
          }}
        >
          &ldquo;{pull}&rdquo;
        </p>
      </div>

      {/* ─── The record ─── proof points as definition list */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "80px 32px 0",
        }}
      >
        <SectionRule
          label={
            <span
              style={{
                fontFamily: SANS,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: INK,
              }}
            >
              {isClient ? "On the record" : "What you get"}
            </span>
          }
          inset
        />
        <dl style={{ margin: 0 }}>
          {proof.map(([label, body], idx) => (
            <div
              key={label}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(140px, 200px) 1fr",
                gap: 32,
                padding: "28px 0",
                borderBottom:
                  idx === proof.length - 1
                    ? `1px solid ${RULE}`
                    : `1px solid ${HAIRLINE}`,
                alignItems: "baseline",
              }}
              className="fn-proof-row"
            >
              <dt
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  color: OXBLOOD,
                }}
              >
                {label}
              </dt>
              <dd
                style={{
                  fontFamily: SERIF,
                  fontSize: 18,
                  lineHeight: 1.55,
                  color: INK,
                  margin: 0,
                  maxWidth: "60ch",
                  fontVariationSettings: '"opsz" 14',
                }}
              >
                {body}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ─── CTA ─── editorial closer */}
      {showCta && (
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "96px 32px 0",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 32,
            flexWrap: "wrap",
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
              fontVariationSettings: '"opsz" 144',
            }}
          >
            {ctaHeading}
          </h2>
          <Link
            href={ctaButton.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: SANS,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: OXBLOOD,
              backgroundColor: "transparent",
              border: `1px solid ${OXBLOOD}`,
              borderRadius: 0,
              padding: "16px 28px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition:
                "background-color 150ms ease, color 150ms ease",
            }}
            className="fn-cta"
          >
            {ctaButton.label}
            <span aria-hidden>→</span>
          </Link>
        </div>
      )}

      <style jsx>{`
        .fn-steps {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          column-gap: 0;
          row-gap: 56px;
        }
        @media (max-width: 880px) {
          .fn-steps {
            grid-template-columns: 1fr;
          }
          .fn-step {
            border-right: none !important;
            border-bottom: 1px solid ${HAIRLINE};
            padding: 0 0 40px !important;
          }
          .fn-step:last-child {
            border-bottom: none;
            padding-bottom: 0 !important;
          }
        }
        @media (max-width: 640px) {
          .fn-proof-row {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
        :global(.fn-cta:hover) {
          background-color: ${OXBLOOD};
          color: ${IVORY};
        }
      `}</style>
    </>
  );
}

function SectionRule({
  label,
  inset = false,
}: {
  label: React.ReactNode;
  inset?: boolean;
}) {
  return (
    <div
      style={{
        maxWidth: inset ? undefined : 1100,
        margin: inset ? "0 auto 32px" : "0 auto 48px",
        padding: inset ? 0 : "0 32px",
        display: "flex",
        alignItems: "center",
        gap: 20,
      }}
    >
      <span style={{ flex: 1, height: 1, backgroundColor: RULE }} />
      <span style={{ whiteSpace: "nowrap" }}>{label}</span>
      <span style={{ flex: 1, height: 1, backgroundColor: RULE }} />
    </div>
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
        fontFamily: SANS,
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.32em",
        textTransform: "uppercase",
        color: active ? INK : MUTED,
        cursor: "pointer",
        transition: "color 150ms ease",
      }}
    >
      {label}
    </button>
  );
}

function DropCap({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden
      style={{
        fontFamily: SERIF,
        fontWeight: 400,
        fontSize: "calc(1em * 3.4)",
        lineHeight: 0.85,
        float: "left",
        marginRight: "0.12em",
        marginTop: "0.08em",
        marginBottom: "-0.05em",
        color: INK,
        letterSpacing: "-0.04em",
        fontVariationSettings: '"opsz" 144',
      }}
    >
      {children}
    </span>
  );
}
