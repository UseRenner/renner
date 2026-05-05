"use client";

import { getToneVars, type ShellTone } from "../../how-it-works/_shared";
import { HEADLINE_LEAD, HEADLINE_TAIL, SAMPLE_TASKS, SHORT_DEK } from "../_content";
import { ComplianceLine, Footer, Header, SignupForm, SignupHeading, TOKENS } from "../_pieces";

const { SERIF, MONO, INK, STEEL_700, STEEL_500, STEEL_300, PAPER } = TOKENS;

const TASKS = [SAMPLE_TASKS[0]!, SAMPLE_TASKS[5]!, SAMPLE_TASKS[2]!];

// FOLIO · TRIO — Folio's vertical descent carrying Trio's hero
// tasks. Hero, then three sample tasks descending the page with
// hairline spacers between each, then the form. Each task is
// the Trio dialect: mono kicker, italic title, location stamp.

export function BureauFolioTrioBody({ tone }: { tone: ShellTone }) {
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
        }}
      >
        <section style={{ width: "100%", maxWidth: 640, textAlign: "center" }}>
          <h1
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(40px, 5.4vw, 72px)",
              lineHeight: 0.98,
              letterSpacing: "-0.024em",
              color: INK,
              margin: 0,
              marginBottom: "clamp(20px, 2.4vw, 28px)",
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

        {TASKS.map((task) => (
          <div key={task.title} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <span aria-hidden style={{ display: "block", width: 1, height: "clamp(48px, 6vw, 72px)", marginTop: "clamp(36px, 4.5vw, 56px)", marginBottom: "clamp(36px, 4.5vw, 56px)", backgroundColor: STEEL_300 }} />
            <article style={{ width: "100%", maxWidth: 520, textAlign: "center", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 14 }}>
                <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500 }}>
                  {task.category}
                </span>
                <span aria-hidden style={{ color: STEEL_300 }}>·</span>
                <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(18px, 1.7vw, 22px)", color: INK, fontVariationSettings: '"opsz" 36' }}>
                  {task.price}
                </span>
              </div>
              <h2
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(24px, 2.6vw, 32px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.014em",
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
          </div>
        ))}

        <span aria-hidden style={{ display: "block", width: 1, height: "clamp(48px, 6vw, 72px)", marginTop: "clamp(36px, 4.5vw, 56px)", marginBottom: "clamp(36px, 4.5vw, 56px)", backgroundColor: STEEL_300 }} />

        <section style={{ width: "100%", maxWidth: 520, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <SignupHeading style={{ textAlign: "center" }} />
          <SignupForm maxWidth={520} />
          <ComplianceLine style={{ marginTop: "clamp(20px, 2.4vw, 28px)", textAlign: "center" }} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
