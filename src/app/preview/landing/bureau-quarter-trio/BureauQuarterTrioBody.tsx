"use client";

import { getToneVars, type ShellTone } from "../../how-it-works/_shared";
import { HEADLINE_LEAD, HEADLINE_TAIL, SAMPLE_TASKS, SHORT_DEK } from "../_content";
import { ComplianceLine, Footer, Header, SignupForm, SignupHeading, TOKENS } from "../_pieces";

const { SERIF, MONO, INK, STEEL_700, STEEL_500, STEEL_300, PAPER } = TOKENS;

const TASKS = [SAMPLE_TASKS[0]!, SAMPLE_TASKS[5]!, SAMPLE_TASKS[2]!];

// QUARTER · TRIO — Quarter's INK crosshair carrying Trio's hero
// tasks. Hero (headline + dek) sits as a full-width band above
// the frame. Inside the 2×2 grid, three quadrants each hold a
// sample task (Trio dialect: mono kicker, italic title, location
// stamp, price), and the fourth quadrant holds the signup form.
// The form becomes the fourth task — what you do to take care
// of the others.

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
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(40px, 5vw, 64px)",
        }}
      >
        {/* Hero band above the frame */}
        <section style={{ width: "100%", maxWidth: 1280 }}>
          <h1
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(40px, 5.4vw, 80px)",
              lineHeight: 0.96,
              letterSpacing: "-0.024em",
              color: INK,
              margin: 0,
              marginBottom: "clamp(20px, 2.4vw, 28px)",
              maxWidth: "16ch",
              fontVariationSettings: '"opsz" 144',
            }}
          >
            {HEADLINE_LEAD}{" "}
            <span style={{ fontStyle: "italic", fontWeight: 300, color: STEEL_700 }}>{HEADLINE_TAIL}</span>
          </h1>
          <p style={{ fontFamily: SERIF, fontSize: "clamp(17px, 1.7vw, 20px)", lineHeight: 1.55, color: STEEL_700, margin: 0, whiteSpace: "nowrap", fontVariationSettings: '"opsz" 14' }}>
            {SHORT_DEK}
          </p>
        </section>

        {/* 2 × 2 frame: three tasks + form */}
        <div
          className="quarter-frame"
          style={{
            width: "100%",
            maxWidth: 1280,
            display: "grid",
            gridTemplateColumns: "1fr 1px 1fr",
            gridTemplateRows: "auto 1px auto",
            border: `1px solid ${INK}`,
          }}
        >
          {/* TL — task 1 */}
          <TaskCell task={TASKS[0]!} />

          <div aria-hidden style={{ backgroundColor: INK }} className="quarter-vrule" />

          {/* TR — task 2 */}
          <TaskCell task={TASKS[1]!} />

          {/* HR */}
          <div aria-hidden style={{ backgroundColor: INK, gridColumn: "1 / -1" }} />

          {/* BL — task 3 */}
          <TaskCell task={TASKS[2]!} />

          <div aria-hidden style={{ backgroundColor: INK }} className="quarter-vrule" />

          {/* BR — signup form */}
          <section style={{ padding: "clamp(28px, 4vw, 56px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <SignupHeading />
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
          .quarter-frame > section,
          .quarter-frame > article {
            border-bottom: 1px solid ${INK};
          }
          .quarter-frame > section:last-child,
          .quarter-frame > article:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </div>
  );
}

function TaskCell({ task }: { task: { category: string; title: string; location: string; price: string } }) {
  return (
    <article
      style={{
        padding: "clamp(28px, 4vw, 56px)",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(14px, 1.8vw, 22px)",
        justifyContent: "center",
        minHeight: "clamp(180px, 22vw, 260px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16 }}>
        <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500 }}>
          {task.category}
        </span>
        <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2vw, 24px)", color: INK, fontVariationSettings: '"opsz" 36' }}>
          {task.price}
        </span>
      </div>
      <h2
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(22px, 2.4vw, 30px)",
          lineHeight: 1.1,
          letterSpacing: "-0.012em",
          color: INK,
          margin: 0,
          fontVariationSettings: '"opsz" 60',
        }}
      >
        {task.title}
      </h2>
      <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: STEEL_500 }}>
        {task.location}
      </span>
    </article>
  );
}
