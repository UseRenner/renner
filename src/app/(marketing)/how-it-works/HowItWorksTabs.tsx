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

function Italic({ children }: { children: React.ReactNode }) {
  return <span className="headline-em">{children}</span>;
}

export function HowItWorksTabs({
  showCta,
}: {
  showCta: boolean;
}) {
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
      <div
        className="flex"
        style={{ gap: "32px", marginBottom: "32px" }}
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

      <h1 className="page-title" style={{ marginBottom: "40px" }}>
        How Renner <Italic>works</Italic>
      </h1>

      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          marginBottom: "56px",
        }}
      >
        {steps.map((step) => (
          <StepRow key={step.number} step={step} />
        ))}
      </ol>

      <div
        style={{
          borderTop: "1px solid #eaedf0",
          paddingTop: "32px",
          marginBottom: showCta ? "48px" : "0",
        }}
      >
        <div
          className="micro-label"
          style={{ marginBottom: "16px" }}
        >
          {isClient ? "Why Renner" : "What you get"}
        </div>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {benefits.map((b) => (
            <li
              key={b}
              style={{
                fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
                fontSize: "15px",
                color: "#0d0f12",
                lineHeight: 1.55,
              }}
            >
              {b}
            </li>
          ))}
        </ul>
      </div>

      {showCta && (
        <div
          style={{
            paddingTop: "32px",
            borderTop: "1px solid #eaedf0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: "26px",
              color: "#0d0f12",
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            {ctaHeading}
          </h2>
          <Link
            href={ctaButton.href}
            className="btn-dark"
            style={{
              width: "auto",
              padding: "13px 28px",
              textDecoration: "none",
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
        padding: "4px 0",
        fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
        fontSize: "15px",
        fontWeight: active ? 600 : 500,
        color: active ? "#0d0f12" : "#647589",
        borderBottom: active
          ? "2px solid #0d0f12"
          : "2px solid transparent",
        cursor: "pointer",
        transition: "color 150ms ease, border-color 150ms ease",
      }}
    >
      {label}
    </button>
  );
}

function StepRow({ step }: { step: Step }) {
  return (
    <li
      style={{
        position: "relative",
        paddingLeft: "0",
      }}
    >
      <div
        aria-hidden
        className="font-display-tight"
        style={{
          fontSize: "88px",
          lineHeight: 0.85,
          color: "rgba(13, 15, 18, 0.05)",
          marginBottom: "8px",
          letterSpacing: "-0.04em",
        }}
      >
        {step.number}
      </div>
      <h3
        className="font-display"
        style={{
          fontSize: "21px",
          color: "#0d0f12",
          marginBottom: "8px",
          lineHeight: 1.2,
        }}
      >
        {step.title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
          fontSize: "15px",
          color: "#4d5b6a",
          lineHeight: 1.6,
          maxWidth: "640px",
          margin: 0,
        }}
      >
        {step.body}
      </p>
    </li>
  );
}
