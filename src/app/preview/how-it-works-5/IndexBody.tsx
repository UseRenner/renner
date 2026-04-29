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

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS =
  "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0d0f12";
const SLATE = "#2a2f36";
const STEEL = "#647589";
const FOG = "#7d8da0";
const MIST = "#cad1d8";
const PAPER = "#fbfbfc";
const RULE = "#eaedf0";

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

export function IndexBody({ showCta }: { showCta: boolean }) {
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
      {/* ─── Page identifier row ─── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(160px, 220px) 1fr auto",
          gap: "clamp(24px, 4vw, 56px)",
          alignItems: "baseline",
          marginBottom: 64,
          paddingBottom: 24,
          borderBottom: `1px solid ${INK}`,
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: FOG,
          }}
        >
          §01 — Procedure
        </div>
        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(36px, 4.5vw, 56px)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: INK,
            margin: 0,
            fontVariationSettings: '"opsz" 72',
          }}
        >
          How Renner <Italic>works</Italic>
        </h1>
        <div
          role="tablist"
          aria-label="Audience"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: MONO,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <IndexTab
            label="Client"
            active={isClient}
            onClick={() => setTab("client")}
          />
          <span aria-hidden style={{ color: MIST }}>
            /
          </span>
          <IndexTab
            label="Renner"
            active={!isClient}
            onClick={() => setTab("renner")}
          />
        </div>
      </div>

      {/* ─── Steps table ─── */}
      <Table>
        {steps.map((step, idx) => (
          <TableRow key={step.number} idx={idx} total={steps.length}>
            <Cell width="80px">
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  color: FOG,
                }}
              >
                {step.number}
              </span>
            </Cell>
            <Cell width="minmax(200px, 280px)">
              <h3
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: 22,
                  lineHeight: 1.2,
                  letterSpacing: "-0.012em",
                  color: INK,
                  margin: 0,
                  fontVariationSettings: '"opsz" 36',
                }}
              >
                {step.title}
              </h3>
            </Cell>
            <Cell>
              <p
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: SLATE,
                  margin: 0,
                  fontVariationSettings: '"opsz" 14',
                }}
              >
                {step.body}
              </p>
            </Cell>
          </TableRow>
        ))}
      </Table>

      {/* ─── Benefits section ─── */}
      <div style={{ marginTop: 96 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(160px, 220px) 1fr",
            gap: "clamp(24px, 4vw, 56px)",
            alignItems: "baseline",
            marginBottom: 32,
            paddingBottom: 16,
            borderBottom: `1px solid ${INK}`,
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: FOG,
            }}
          >
            §02 — {isClient ? "Why Renner" : "What you get"}
          </div>
          <div aria-hidden />
        </div>
        <Table>
          {benefits.map((b, idx) => (
            <TableRow key={b} idx={idx} total={benefits.length}>
              <Cell width="80px">
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    color: FOG,
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </Cell>
              <Cell>
                <p
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: 22,
                    lineHeight: 1.4,
                    letterSpacing: "-0.012em",
                    color: INK,
                    margin: 0,
                    fontVariationSettings: '"opsz" 36',
                  }}
                >
                  {b}
                </p>
              </Cell>
            </TableRow>
          ))}
        </Table>
      </div>

      {/* ─── CTA — standalone block ─── */}
      {showCta && (
        <div style={{ marginTop: 96 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(160px, 220px) 1fr auto",
              gap: "clamp(24px, 4vw, 56px)",
              alignItems: "baseline",
              paddingTop: 32,
              paddingBottom: 32,
              borderTop: `1px solid ${INK}`,
              borderBottom: `1px solid ${INK}`,
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: FOG,
              }}
            >
              §03 — Begin
            </div>
            <h2
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(28px, 3vw, 36px)",
                lineHeight: 1.15,
                letterSpacing: "-0.022em",
                color: INK,
                margin: 0,
                fontVariationSettings: '"opsz" 72',
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
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.01em",
                color: PAPER,
                backgroundColor: INK,
                border: `1px solid ${INK}`,
                borderRadius: 4,
                padding: "13px 22px",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              {ctaButton.label}
              <span aria-hidden style={{ opacity: 0.7 }}>
                →
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function Table({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
}

function TableRow({
  idx,
  total,
  children,
}: {
  idx: number;
  total: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="idx-row"
      style={{
        display: "grid",
        gridTemplateColumns: "80px minmax(200px, 280px) 1fr",
        gap: "clamp(20px, 3vw, 48px)",
        padding: "32px 0",
        borderBottom: `1px solid ${RULE}`,
        alignItems: "baseline",
      }}
    >
      {children}
      <style jsx>{`
        @media (max-width: 760px) {
          .idx-row {
            grid-template-columns: 56px 1fr !important;
            grid-template-rows: auto auto;
          }
          .idx-row > :nth-child(1) {
            grid-row: 1;
            grid-column: 1;
          }
          .idx-row > :nth-child(2) {
            grid-row: 1;
            grid-column: 2;
          }
          .idx-row > :nth-child(3) {
            grid-row: 2;
            grid-column: 2;
            margin-top: 12px;
          }
        }
      `}</style>
    </div>
  );
}

function Cell({
  width,
  children,
}: {
  width?: string;
  children: React.ReactNode;
}) {
  return <div style={{ minWidth: 0 }}>{children}</div>;
}

function IndexTab({
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
        color: active ? INK : FOG,
        cursor: "pointer",
        transition: "color 150ms ease",
      }}
    >
      {label}
    </button>
  );
}
