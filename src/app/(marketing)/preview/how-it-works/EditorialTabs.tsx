"use client";

import Link from "next/link";
import { useState } from "react";

type Step = { number: string; title: React.ReactNode; body: React.ReactNode };

const CLIENT_STEPS: Step[] = [
  {
    number: "01",
    title: "Post a task.",
    body: (
      <>
        Describe what you need — sign installation, lockbox swap, property
        visuals, guest check-in, courier run, or anything real estate. Set
        the location, time window, and price.
      </>
    ),
  },
  {
    number: "02",
    title: "A vetted Renner applies.",
    body: (
      <>
        Background-checked Renners in your area see your task and apply.
        Review their profile, ratings, and experience. Pick the right fit.
      </>
    ),
  },
  {
    number: "03",
    title: (
      <>
        It gets <Italic>done.</Italic>
      </>
    ),
    body: (
      <>
        Your Renner handles it. You get confirmation with completion
        photos. Pay securely through the platform. That&rsquo;s it.
      </>
    ),
  },
];

const RENNER_STEPS: Step[] = [
  {
    number: "01",
    title: "Create your profile.",
    body: (
      <>
        Sign up, verify your identity, and pass a background check. Add
        your categories — signs, lockbox, courier, visuals, guest access,
        showings, and more. Set your service area.
      </>
    ),
  },
  {
    number: "02",
    title: "Browse and apply.",
    body: (
      <>
        See tasks posted by agents, brokers, property managers, leasing
        agents, and landlords in your area. Apply to the ones that fit
        your schedule and skills.
      </>
    ),
  },
  {
    number: "03",
    title: (
      <>
        Get it <Italic>done.</Italic>
      </>
    ),
    body: (
      <>
        Complete the task, upload confirmation photos, and get paid
        securely through the platform. Build your reputation with ratings
        and reviews.
      </>
    ),
  },
];

const CLIENT_BENEFITS = [
  "Every Renner is background-checked.",
  "Secure payments through the platform.",
  "Rate and review after every task.",
];

const RENNER_BENEFITS = [
  "Set your own schedule.",
  "Work in your area.",
  "Get paid for every completed task.",
  "Build a reputation that earns repeat clients.",
];

const SERIF =
  "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS =
  "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0d0f12";
const SLATE = "#2a2f36";
const STEEL = "#647589";
const FOG = "#7d8da0";
const RULE = "#eaedf0";
const RULE_STRONG = "#dce0e5";

function Italic({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontStyle: "italic",
        fontWeight: 300,
        color: STEEL,
      }}
    >
      {children}
    </span>
  );
}

export function EditorialTabs({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const benefits = isClient ? CLIENT_BENEFITS : RENNER_BENEFITS;
  const ctaHeading: React.ReactNode = isClient ? (
    <>
      Ready to get something <Italic>done?</Italic>
    </>
  ) : (
    <>
      Ready to <Italic>run?</Italic>
    </>
  );
  const ctaButton = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      {/* ─── Tab switcher ─── */}
      <div
        style={{
          display: "flex",
          gap: 32,
          borderBottom: `1px solid ${RULE_STRONG}`,
          paddingBottom: 0,
          marginBottom: 56,
        }}
        role="tablist"
        aria-label="Audience"
      >
        <TabButton
          label="For Clients"
          active={isClient}
          onClick={() => setTab("client")}
        />
        <TabButton
          label="For Renners"
          active={!isClient}
          onClick={() => setTab("renner")}
        />
      </div>

      {/* ─── Page heading ─── */}
      <div style={{ marginBottom: 64 }}>
        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(36px, 5vw, 56px)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: INK,
            margin: 0,
            fontVariationSettings: '"opsz" 72',
          }}
        >
          How Renner <Italic>works</Italic>
        </h1>
      </div>

      {/* ─── Steps ─── */}
      <SectionRule label="In brief · three steps" />

      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {steps.map((step, idx) => (
          <li
            key={step.number}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(80px, 96px) 1fr",
              gap: 32,
              padding: "40px 0",
              borderBottom:
                idx === steps.length - 1
                  ? "none"
                  : `1px solid ${RULE}`,
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.16em",
                color: STEEL,
                paddingTop: 8,
              }}
            >
              {step.number}
            </div>
            <div>
              <h3
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: 24,
                  lineHeight: 1.2,
                  letterSpacing: "-0.018em",
                  color: INK,
                  margin: 0,
                  marginBottom: 14,
                  fontVariationSettings: '"opsz" 36',
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: SLATE,
                  margin: 0,
                  maxWidth: 620,
                  fontVariationSettings: '"opsz" 14',
                }}
              >
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* ─── Benefits ─── */}
      <div style={{ marginTop: 80, marginBottom: showCta ? 80 : 0 }}>
        <SectionRule
          label={isClient ? "Why Renner" : "What you get"}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(80px, 96px) 1fr",
            gap: 32,
          }}
        >
          <div aria-hidden />
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {benefits.map((b, i) => (
              <li
                key={b}
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: 1.5,
                  color: INK,
                  padding: "16px 0",
                  borderBottom:
                    i === benefits.length - 1
                      ? "none"
                      : `1px solid ${RULE}`,
                  fontVariationSettings: '"opsz" 14',
                }}
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ─── CTA ─── */}
      {showCta && (
        <div
          style={{
            paddingTop: 48,
            borderTop: `1px solid ${RULE_STRONG}`,
            display: "grid",
            gridTemplateColumns: "minmax(80px, 96px) 1fr auto",
            gap: 32,
            alignItems: "center",
          }}
        >
          <div aria-hidden />
          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: 28,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: INK,
              margin: 0,
              fontVariationSettings: '"opsz" 36',
            }}
          >
            {ctaHeading}
          </h2>
          <Link
            href={ctaButton.href}
            className="btn-dark"
            style={{
              width: "auto",
              padding: "12px 24px",
              fontSize: 14,
              letterSpacing: "0.01em",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            {ctaButton.label}
          </Link>
        </div>
      )}
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
        padding: "16px 0",
        marginBottom: -1,
        fontFamily: MONO,
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: active ? INK : FOG,
        borderBottom: active ? `2px solid ${INK}` : "2px solid transparent",
        cursor: "pointer",
        transition: "color 150ms ease, border-color 150ms ease",
      }}
    >
      {label}
    </button>
  );
}

export function SectionRule({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        marginBottom: 8,
      }}
    >
      <span
        style={{
          fontFamily: MONO,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: FOG,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <span
        aria-hidden
        style={{ flex: 1, height: 1, backgroundColor: RULE }}
      />
    </div>
  );
}
