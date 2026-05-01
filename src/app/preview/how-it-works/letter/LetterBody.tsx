"use client";

// Letter — written as a personal letter from Renner. One narrow
// column, generous serif, illustrations placed where the prose
// references them. The wordmark signs the bottom. Speaks the
// same way to a luxury broker and a host: like a person.

import Link from "next/link";
import { useState } from "react";
import { Card } from "../_illustrations";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0d0f12";
const STEEL_700 = "#4d5b6a";
const STEEL_500 = "#7d8da0";
const STEEL_300 = "#cad1d8";
const RULE = "#eaedf0";
const PAPER = "#fbfbfc";

export function LetterBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <div style={{ maxWidth: 660, margin: "0 auto" }}>
      {/* Date stamp + audience switch */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 24, paddingBottom: "clamp(24px, 3vw, 32px)", borderBottom: `1px solid ${RULE}`, marginBottom: "clamp(40px, 5vw, 56px)", flexWrap: "wrap" }}>
        <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500 }}>
          Letter № 01 · Spring 2026
        </span>
        <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", gap: 14, fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16 }}>
          <Tab label="To clients" active={isClient} onClick={() => setTab("client")} />
          <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
          <Tab label="To Renners" active={!isClient} onClick={() => setTab("renner")} />
        </div>
      </div>

      {/* Salutation */}
      <p style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(28px, 3.5vw, 44px)", lineHeight: 1.2, color: INK, margin: 0, marginBottom: "clamp(28px, 3.5vw, 44px)", fontVariationSettings: '"opsz" 60' }}>
        {isClient ? "Dear neighbor," : "Dear operator,"}
      </p>

      {/* Body — letter prose */}
      <div style={{ fontFamily: SERIF, fontSize: "clamp(17px, 1.5vw, 19px)", lineHeight: 1.75, color: INK, fontVariationSettings: '"opsz" 14' }}>
        {isClient ? (
          <>
            <p style={{ margin: "0 0 1.4em 0" }}>
              Renner is a marketplace and a network for real-estate task work. You post a brief — a sign install, a lockbox swap, a guest check-in, a courier run, anything that touches a listing or a property — and a vetted Renner picks it up. Where, when, what, how much. Two minutes to write it down.
            </p>
            <div style={{ margin: "1.6em 0" }}>
              <Card kind="brief" />
            </div>
            <p style={{ margin: "1.4em 0" }}>
              The Renners who answer your brief are screened — ID-verified, Checkr-cleared — before they're allowed in. So are you. The platform is closed on both sides for a reason: the work is at someone&rsquo;s home, or someone&rsquo;s listing, and that has to mean something.
            </p>
            <p style={{ margin: "1.4em 0" }}>
              You read who applies, you book the right hand, you confirm the work when it&rsquo;s done. Funds sit in Stripe escrow until you confirm. After that, the money releases — to them, in full, no surprise charges to you. If forty-eight hours pass without a word, the system releases on your behalf.
            </p>
            <p style={{ margin: "1.4em 0 0 0" }}>
              That&rsquo;s the whole story. We hope you&rsquo;ll come post a task.
            </p>
          </>
        ) : (
          <>
            <p style={{ margin: "0 0 1.4em 0" }}>
              Renner is a marketplace and a network for the people who do real-estate work — and the people who need it done. You sign up, you verify your identity, you clear a Checkr background check. You pick the categories you run, you draw a service area on a map, you name your rate.
            </p>
            <div style={{ margin: "1.6em 0" }}>
              <Card kind="profile" />
            </div>
            <p style={{ margin: "1.4em 0" }}>
              Then briefs come in. Agents, brokers, property managers, hosts. They post what they need; you apply to what fits. You decline anything that doesn&rsquo;t. Both sides are vetted, so when you walk up to a property, the person who posted it is who they say they are.
            </p>
            <p style={{ margin: "1.4em 0" }}>
              You run the task, upload completion photos, and Stripe releases the funds. One hundred percent of the task pay is yours. Build a reputation that travels with you.
            </p>
            <p style={{ margin: "1.4em 0 0 0" }}>
              That&rsquo;s the whole story. We hope you&rsquo;ll come run with us.
            </p>
          </>
        )}
      </div>

      {/* Sign-off — the wordmark IS the signature */}
      <div style={{ marginTop: "clamp(48px, 6vw, 72px)", display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 17, color: INK, fontVariationSettings: '"opsz" 36' }}>
          Yours,
        </span>
        <span
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 200,
            fontSize: "clamp(56px, 9vw, 96px)",
            letterSpacing: "-0.025em",
            color: INK,
            lineHeight: 1,
            fontVariationSettings: '"opsz" 144',
          }}
        >
          renner
        </span>
        <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500, marginTop: 6 }}>
          Both sides screened to join
        </span>
      </div>

      {showCta && (
        <section style={{ display: "flex", justifyContent: "flex-start", marginTop: "clamp(40px, 5vw, 56px)" }}>
          <Link
            href={cta.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: SANS,
              fontSize: 14,
              fontWeight: 500,
              color: PAPER,
              backgroundColor: INK,
              border: `1px solid ${INK}`,
              borderRadius: 4,
              padding: "14px 22px",
              textDecoration: "none",
            }}
          >
            {cta.label}
            <span aria-hidden style={{ opacity: 0.7 }}>→</span>
          </Link>
        </section>
      )}
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
