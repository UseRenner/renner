"use client";

import Link from "next/link";
import { useState } from "react";
import { Mini, CLIENT_KINDS, RENNER_KINDS } from "../_illustrations";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "var(--c-text, #0d0f12)";
const STEEL_700 = "var(--c-700, #38414d)";
const STEEL_500 = "var(--c-500, #7d8da0)";
const STEEL_300 = "var(--c-300, #cad1d8)";
const PAPER = "var(--c-bg, #fbfbfc)";

const CLIENT_DEK = "What do you need taken care of?";
const RENNER_DEK = "What can you take care of?";

const CLIENT_STEPS = [
  { number: "01", title: "Post a task", body: "Set the location, time, task, and price.", proof: "Specifics" },
  { number: "02", title: "Pick a Renner", body: "Local Renners apply. Select one for your task.", proof: "Vetted" },
  { number: "03", title: "It's taken care of", body: "Receive photos and confirm completion. Payment is released.", proof: "Escrow" },
];
const RENNER_STEPS = [
  { number: "01", title: "Get verified", body: "Verify your ID, clear a background check, and set your service area.", proof: "Onboarded" },
  { number: "02", title: "Pick a task", body: "See tasks in your area. Apply to what fits your skills and schedule.", proof: "Local" },
  { number: "03", title: "Take care of it", body: "Complete the task. Send photo confirmation. Receive payment.", proof: "100% of pay" },
];

const CLIENT_TRUST = "Clients and Renners pass ID and background checks before posting or booking. Tasks that require a license go only to licensed Renners. Save Renners you like and invite them to your tasks.";
const RENNER_TRUST = "The work is real-estate tasks — sign installs, lockboxes, showings, property prep. Clients and Renners pass ID and background checks. Clients can save you as a favorite and invite you directly to their next task.";

export function BriefBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const kinds = isClient ? CLIENT_KINDS : RENNER_KINDS;
  const trust = isClient ? CLIENT_TRUST : RENNER_TRUST;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <div style={{ textAlign: "center" }}>
      <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 14, marginBottom: "clamp(40px, 5vw, 56px)", fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16 }}>
        <Tab label="Hire a Renner" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
        <Tab label="Become a Renner" active={!isClient} onClick={() => setTab("renner")} />
      </div>

      <p
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(28px, 3.5vw, 44px)",
          lineHeight: 1.3,
          letterSpacing: "-0.012em",
          color: INK,
          margin: "0 auto",
          marginBottom: "clamp(56px, 7vw, 80px)",
          maxWidth: "32ch",
          fontVariationSettings: '"opsz" 60',
        }}
      >
        {dek}
      </p>

      {/* Three centered columns — caption above, smaller illustration
          below. Mini cards keep the imagery on-page without competing
          with the trust statement that closes the brief. */}
      <div className="brief-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "clamp(24px, 3vw, 40px)", marginBottom: "clamp(72px, 9vw, 112px)" }}>
        {kinds.map((kind, i) => (
          <article key={kind} style={{ display: "flex", flexDirection: "column", gap: "clamp(20px, 2.4vw, 28px)", alignItems: "center", textAlign: "center" }}>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500, marginBottom: 10 }}>
                {steps[i].number} · {steps[i].proof}
              </div>
              <h3 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(22px, 2.4vw, 28px)", lineHeight: 1.1, letterSpacing: "-0.012em", color: INK, margin: 0, marginBottom: 8, fontVariationSettings: '"opsz" 36' }}>
                {steps[i].title}
              </h3>
              <p style={{ fontFamily: SERIF, fontSize: 15, lineHeight: 1.55, color: STEEL_700, margin: "0 auto", maxWidth: "28ch", fontVariationSettings: '"opsz" 14' }}>
                {steps[i].body}
              </p>
            </div>
            <Mini kind={kind} />
          </article>
        ))}
      </div>

      {/* Trust — a single editorial statement, mono-kickered, centered.
          Carries more weight than Center's one-liner: three sentences
          written to read as a brief, not a tagline. */}
      <section
        style={{
          paddingTop: "clamp(40px, 5vw, 56px)",
          borderTop: `1px solid ${INK}`,
          marginBottom: showCta ? "clamp(48px, 6vw, 72px)" : 0,
          maxWidth: "60ch",
          margin: "0 auto",
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500, marginBottom: "clamp(20px, 2.5vw, 28px)" }}>
          {isClient ? "Why Renner" : "What you get"}
        </div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2.2vw, 26px)", lineHeight: 1.5, letterSpacing: "-0.005em", color: INK, margin: 0, fontVariationSettings: '"opsz" 36' }}>
          {trust}
        </p>
      </section>

      {showCta && (
        <section style={{ display: "flex", justifyContent: "center", marginTop: "clamp(48px, 6vw, 72px)" }}>
          <Link href={cta.href} style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: SANS, fontSize: 14, fontWeight: 500, color: PAPER, backgroundColor: INK, border: `1px solid ${INK}`, borderRadius: 4, padding: "14px 22px", textDecoration: "none" }}>
            {cta.label}
            <span aria-hidden style={{ opacity: 0.7 }}>→</span>
          </Link>
        </section>
      )}

      <style jsx>{`
        @media (max-width: 880px) {
          .brief-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" role="tab" aria-selected={active} onClick={onClick} style={{ background: "none", border: "none", padding: 0, fontFamily: "inherit", fontStyle: "inherit", fontSize: "inherit", fontWeight: "inherit", color: active ? INK : STEEL_500, cursor: "pointer" }}>
      {label}
    </button>
  );
}
