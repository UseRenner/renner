"use client";

import { getToneVars, type ShellTone } from "../../how-it-works/_shared";
import { HEADLINE_LEAD, HEADLINE_TAIL, SAMPLE_TASKS, SHORT_DEK } from "../_content";
import { ComplianceLine, Footer, Header, SignupForm, SignupHeading, TOKENS } from "../_pieces";

const { SERIF, MONO, INK, STEEL_700, STEEL_500, STEEL_300, PAPER } = TOKENS;
const RULE = "var(--c-rule, #eaedf0)";

const TASKS = [SAMPLE_TASKS[0]!, SAMPLE_TASKS[5]!, SAMPLE_TASKS[2]!];

// PIVOT · TRIO — Pivot's bisecting spine carrying Trio's hero
// tasks. Hero row at top, three task rows alternating sides
// around the spine, signup row at the bottom. Each task sits
// fully on one side of the spine; the opposite side carries a
// small mono price stamp as an echo. The same Trio dialect
// (mono kicker, italic title, location stamp) reads through
// the architecture.

export function BureauPivotTrioBody({ tone }: { tone: ShellTone }) {
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
        }}
      >
        <div className="pivot-spine" style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
          {/* Hero row */}
          <div className="pivot-row" style={{ paddingTop: "clamp(40px, 5vw, 64px)", paddingBottom: "clamp(40px, 5vw, 64px)" }}>
            <div className="pivot-left" style={{ textAlign: "right", paddingRight: "clamp(28px, 3.5vw, 56px)" }}>
              <h1
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: "clamp(40px, 5.4vw, 80px)",
                  lineHeight: 0.96,
                  letterSpacing: "-0.024em",
                  color: INK,
                  margin: 0,
                  marginLeft: "auto",
                  maxWidth: "16ch",
                  fontVariationSettings: '"opsz" 144',
                }}
              >
                {HEADLINE_LEAD}{" "}
                <span style={{ fontStyle: "italic", fontWeight: 300, color: STEEL_700 }}>{HEADLINE_TAIL}</span>
              </h1>
            </div>
            <div className="pivot-right" style={{ textAlign: "left", paddingLeft: "clamp(28px, 3.5vw, 56px)", display: "flex", alignItems: "flex-end" }}>
              <p style={{ fontFamily: SERIF, fontSize: "clamp(17px, 1.7vw, 20px)", lineHeight: 1.55, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14', maxWidth: "32ch" }}>
                {SHORT_DEK}
              </p>
            </div>
          </div>

          {/* Three task rows alternating sides */}
          {TASKS.map((task, i) => {
            const taskOnLeft = i % 2 === 0;
            const taskSideStyle = {
              textAlign: taskOnLeft ? ("right" as const) : ("left" as const),
              paddingRight: taskOnLeft ? "clamp(28px, 3.5vw, 56px)" : 0,
              paddingLeft: taskOnLeft ? 0 : "clamp(28px, 3.5vw, 56px)",
            };
            const echoSideStyle = {
              textAlign: taskOnLeft ? ("left" as const) : ("right" as const),
              paddingLeft: taskOnLeft ? "clamp(28px, 3.5vw, 56px)" : 0,
              paddingRight: taskOnLeft ? 0 : "clamp(28px, 3.5vw, 56px)",
              alignSelf: "center",
            };
            const taskCard = (
              <div style={taskSideStyle}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: taskOnLeft ? "flex-end" : "flex-start" }}>
                  <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500 }}>
                    {task.category}
                  </span>
                  <h3
                    style={{
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: "clamp(22px, 2.4vw, 30px)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.012em",
                      color: INK,
                      margin: 0,
                      maxWidth: "20ch",
                      fontVariationSettings: '"opsz" 60',
                    }}
                  >
                    {task.title}
                  </h3>
                  <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: STEEL_500 }}>
                    {task.location}
                  </span>
                </div>
              </div>
            );
            const priceEcho = (
              <div style={echoSideStyle}>
                <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(28px, 3vw, 40px)", color: STEEL_700, fontVariationSettings: '"opsz" 60' }}>
                  {task.price}
                </span>
              </div>
            );
            return (
              <div
                key={task.title}
                className="pivot-row"
                style={{ paddingTop: "clamp(28px, 3.5vw, 44px)", paddingBottom: "clamp(28px, 3.5vw, 44px)", borderTop: `1px solid ${RULE}` }}
              >
                {taskOnLeft ? (
                  <>
                    <div className="pivot-left">{taskCard}</div>
                    <div className="pivot-right">{priceEcho}</div>
                  </>
                ) : (
                  <>
                    <div className="pivot-left">{priceEcho}</div>
                    <div className="pivot-right">{taskCard}</div>
                  </>
                )}
              </div>
            );
          })}

          {/* Signup row */}
          <div className="pivot-row" style={{ paddingTop: "clamp(36px, 4.5vw, 56px)", paddingBottom: "clamp(40px, 5vw, 64px)", borderTop: `1px solid ${RULE}` }}>
            <div className="pivot-left" style={{ textAlign: "right", paddingRight: "clamp(28px, 3.5vw, 56px)" }}>
              <SignupHeading style={{ marginBottom: 0, whiteSpace: "nowrap", fontSize: "clamp(18px, 1.7vw, 22px)" }} />
            </div>
            <div className="pivot-right" style={{ textAlign: "left", paddingLeft: "clamp(28px, 3.5vw, 56px)" }}>
              <SignupForm maxWidth={520} />
              <ComplianceLine style={{ marginTop: "clamp(20px, 2.4vw, 28px)" }} />
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style jsx>{`
        .pivot-spine::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          background: ${INK};
          pointer-events: none;
        }
        .pivot-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: start;
        }
        @media (max-width: 720px) {
          .pivot-spine::before {
            left: 0;
          }
          .pivot-row {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .pivot-row :global(.pivot-left),
          .pivot-row :global(.pivot-right) {
            text-align: left !important;
            padding-left: 20px !important;
            padding-right: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
