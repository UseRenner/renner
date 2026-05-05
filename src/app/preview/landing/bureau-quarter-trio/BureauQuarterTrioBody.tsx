"use client";

import { getToneVars, type ShellTone } from "../../how-it-works/_shared";
import { HEADLINE_LEAD, HEADLINE_TAIL, SAMPLE_TASKS, SHORT_DEK } from "../_content";
import { ComplianceLine, Footer, Header, SignupForm, SignupHeading, TOKENS } from "../_pieces";

const { SERIF, MONO, INK, STEEL_700, STEEL_500, STEEL_300, PAPER } = TOKENS;
const BONE = "var(--ill-bg, #f6f7f9)";

const TASKS = [SAMPLE_TASKS[0]!, SAMPLE_TASKS[5]!, SAMPLE_TASKS[2]!];

// QUARTER · TRIO — same 2×2 INK crosshair as Quarter, but the
// BL quadrant carries a Renner's task feed instead of the
// categories list: three live tasks (mono kicker, italic
// title, location stamp) stacked as the reader-side view of
// the marketplace. Hero (TL) and dek on chalk (TR) frame the
// feed; the signup form sits in BR. The page reads as Renner's
// product surface — what a Renner sees, with the form as the
// way in.

export function BureauQuarterTrioBody({ tone }: { tone: ShellTone }) {
  return (
    <div style={{ ...getToneVars(tone), backgroundColor: PAPER, color: INK, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main
        style={{
          flex: 1,
          paddingTop: "clamp(40px, 5vw, 64px)",
          paddingBottom: "clamp(40px, 5vw, 64px)",
          paddingLeft: "clamp(24px, 4vw, 64px)",
          paddingRight: "clamp(24px, 4vw, 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="quarter-frame"
          style={{
            width: "100%",
            maxWidth: 1280,
            display: "grid",
            gridTemplateColumns: "1fr 1px 1fr",
            gridTemplateRows: "1fr 1px 1fr",
            border: `1px solid ${INK}`,
            minHeight: "clamp(560px, 64vw, 760px)",
          }}
        >
          {/* TL — headline */}
          <section style={{ padding: "clamp(28px, 4vw, 56px)", display: "flex", alignItems: "center" }}>
            <h1
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(32px, 4vw, 64px)",
                lineHeight: 0.96,
                letterSpacing: "-0.022em",
                color: INK,
                margin: 0,
                maxWidth: "12ch",
                fontVariationSettings: '"opsz" 144',
              }}
            >
              {HEADLINE_LEAD}{" "}
              <span style={{ fontStyle: "italic", fontWeight: 300, color: STEEL_700 }}>{HEADLINE_TAIL}</span>
            </h1>
          </section>

          <div aria-hidden style={{ backgroundColor: INK }} className="quarter-vrule" />

          {/* TR — dek on chalk */}
          <section style={{ padding: "clamp(28px, 4vw, 56px)", display: "flex", alignItems: "center", backgroundColor: BONE }}>
            <p style={{ fontFamily: SERIF, fontWeight: 375, fontSize: "clamp(22px, 2.4vw, 28px)", lineHeight: 1.45, color: STEEL_700, margin: 0, maxWidth: "28ch", fontVariationSettings: '"opsz" 36' }}>
              {SHORT_DEK}
            </p>
          </section>

          {/* HR */}
          <div aria-hidden style={{ backgroundColor: INK, gridColumn: "1 / -1" }} />

          {/* BL — Renner's task feed */}
          <section style={{ padding: "clamp(28px, 4vw, 56px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column" }}>
              {TASKS.map((task, i) => (
                <li
                  key={task.title}
                  style={{
                    paddingTop: i === 0 ? 0 : "clamp(16px, 2vw, 22px)",
                    paddingBottom: i === TASKS.length - 1 ? 0 : "clamp(16px, 2vw, 22px)",
                    borderTop: i === 0 ? "none" : `1px solid ${STEEL_300}`,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500 }}>
                    {task.category}
                  </span>
                  <h3
                    style={{
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: "clamp(20px, 2vw, 24px)",
                      lineHeight: 1.15,
                      letterSpacing: "-0.01em",
                      color: INK,
                      margin: 0,
                      fontVariationSettings: '"opsz" 36',
                    }}
                  >
                    {task.title}
                  </h3>
                  <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: STEEL_500 }}>
                    {task.location}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <div aria-hidden style={{ backgroundColor: INK }} className="quarter-vrule" />

          {/* BR — signup */}
          <section style={{ padding: "clamp(28px, 4vw, 56px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <SignupHeading style={{ fontStyle: "normal", fontWeight: 375, color: STEEL_700 }} />
            <SignupForm maxWidth={460} />
            <ComplianceLine style={{ marginTop: "clamp(20px, 2.4vw, 28px)", whiteSpace: "normal" }} />
          </section>
        </div>
      </main>
      <Footer />

      <style jsx>{`
        @media (max-width: 900px) {
          .quarter-frame {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .quarter-frame > .quarter-vrule {
            display: none;
          }
          .quarter-frame > section {
            border-bottom: 1px solid ${INK};
          }
          .quarter-frame > section:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </div>
  );
}
